/*
The chat app page for the user

flow --> 

the chat page checks the session storage data 3 data --> chatID , sender and reciver

if the data is found 
check the data with the backend server 
    -> if the data is correct connect to the ws server 
    -> establish the connection

if the data not found or data is wrong 
return to the login page 


gegnerate the UUID for the session 
when the connection wll happen always check the value first then make the value and put it




*/

/*
The chat app page for the user

flow --> 

the chat page checks the session storage data 3 data --> chatID , sender and reciver

if the data is found 
check the data with the backend server 
    -> if the data is correct connect to the ws server 
    -> establish the connection

if the data not found or data is wrong 
return to the login page 


gegnerate the UUID for the session 
when the connection wll happen always check the value first then make the value and put it




*/

"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar, HeadingBar, CustomBody, SpaceBlock, Footer } from "front-end-component-kit";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useEffect, useState , useRef  } from "react";
import { easeInOut,  motion, AnimatePresence } from 'framer-motion';
import { use } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import useWebSocket from 'react-use-websocket';  // the use of new websocket
import "../chat/styles.css"




interface Message {
  messageid: number | null;
  chatid : string;
  sender: string;
  receiver: string;
  message: string;
  time: string;
}


// Read the session storage values 
function useChatSession() {
  const [chatData, setChatData] = useState({
    sender: "",
    receiver: "",
    chatID: "",
    sessionID: "",  // generate the session id 
    loaded : false,  // the flag to track the load state of the sesion storage
  });

  useEffect(() => {
    const sender = sessionStorage.getItem("sender") || "";
    const receiver = sessionStorage.getItem("receiver") || "";
    const chatID = sessionStorage.getItem("chatID") || "";
    let sessionID = sessionStorage.getItem("sessionID");
    
     // Generate a new sessionID only if it doesn't exist
    if (!sessionID) {
      sessionID = uuidv4();
      sessionStorage.setItem("sessionID", sessionID);
    }

    setChatData({ sender, receiver, chatID , sessionID, loaded: true});
  }, []);

  return chatData;
}


// ---------------------------
// Custom hook: WebSocket
// ---------------------------
function useChatWebSocket(
  chatID: string,
  sender: string,
  sessionID: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
) {
  const wsRef = useRef<WebSocket | null>(null);
  const heartbeatInterval = useRef<NodeJS.Timeout | null>(null);
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!chatID || !sender || !sessionID) return;

    const connect = () => {
      wsRef.current?.close();

      wsRef.current = new WebSocket(
        `wss://api.meabhi.me/chat-server/v1/ws/chat?chatID=${chatID}&sessionID=${sessionID}&user=${sender}`
      );

      wsRef.current.onopen = () => {
        console.log("WebSocket connected");

        heartbeatInterval.current = setInterval(() => {
          if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({ type: "ping", sessionID }));
          }
        }, 15000);
      };

      wsRef.current.onmessage = (event) => {
        try {
          const data: Message & { type?: string } = JSON.parse(event.data);

          console.log(data) ; // testing 
          if (data.type === "pong") return; // ignore heartbeat

          console.log("Incoming message:", data);  // Testing the incoming message 

          setMessages((prev) => [...prev, data]);
          
        } catch (err) {
          console.error("WebSocket parse error:", err);
        }
      };

      wsRef.current.onerror = (err) => {
        console.error("WebSocket error:", err);
        wsRef.current?.close();
      };

      wsRef.current.onclose = (e) => {
        console.warn("WebSocket closed:", e.reason);
        heartbeatInterval.current && clearInterval(heartbeatInterval.current);
        reconnectTimeout.current = setTimeout(connect, 3000);
      };
    };

    connect();

    return () => {
      heartbeatInterval.current && clearInterval(heartbeatInterval.current);
      reconnectTimeout.current && clearTimeout(reconnectTimeout.current);
      wsRef.current?.close();
    };
  }, [chatID, sender, sessionID]);

  return wsRef;
}




async function handleLogout(setLogoutMessage : any , router : any) {
  // The function to logout the user
  // hit the link chat-service/v1/users/logut a post request
  /*
  ChatID string `json:"ChatID"`
	SessionID string `json:"SessionID"`
	UserName string `json:"UserName"`
  */

  /*
	Status string `json:"status"`
	Code   int    `json:"code"`
	Message string `json:"message"`
  */
  // if get succesfull json clear the session values 
  // redirect the user to homepage 

  // if get the error json 
  // show the error message logout has failed


  try {
    // Read required session values
    const chatID = sessionStorage.getItem("chatID");
    const sessionID = sessionStorage.getItem("sessionID");
    const userName = sessionStorage.getItem("sender");

    if (!chatID || !sessionID || !userName) {
      setLogoutMessage("Missing session information logout failed. Please try again.");
      setTimeout(() => setLogoutMessage(""), 3000);
      return;
    }

    // Prepare logout request body
    const body = {
      ChatID: chatID,
      SessionID: sessionID,
      UserName: userName,
    };

    // Make POST request to logout endpoint
    const response = await fetch("https://api.meabhi.me/chat-service/v1/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    // Parse response JSON
    const data = await response.json();

    if (response.ok && data.status?.toLowerCase() === "success") {
      // Logout successful — clear session
      sessionStorage.removeItem("sender");
      sessionStorage.removeItem("receiver");
      sessionStorage.removeItem("chatID");
      sessionStorage.removeItem("sessionID");

      setLogoutMessage("Logout Successful!");

      //alert("Logout successful!");
      setTimeout(() => (router.push(`/`)), 2000);
    } else {
      // Logout failed — show error message
      const message = data.message || "Logout failed due to unknown error.";
      //alert(`Logout failed: ${message}`);
      setLogoutMessage(`Logout failed: ${message}`);
      setTimeout(() => setLogoutMessage(""), 3000);
    }
  } catch (error) {
    console.error("Logout error:", error);
    //alert("An error occurred while logging out. Please try again.");
    setLogoutMessage("An error occurred while logging out failed. Please try again.");
    setTimeout(() => setLogoutMessage(""), 3000);
  }


}


// The function for the main message parsing

export default function UserChatService() {

  // the main chat function for the user chat session
  const router = useRouter();

  const { sender, receiver, chatID , sessionID , loaded} = useChatSession();

  const [messages, setMessages] = useState<Message[]>([]);

  const [lastMessageID, setLastMessageID] = useState<number | null>(null);  // handled by the websocket

  const [input, setInput] = useState("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const wsRef = useChatWebSocket(chatID, sender, sessionID, setMessages);

  const [logoutMessage, setLogoutMessage] = useState("");

  const [messageLength, setMessageLengthError] = useState("");

  // ---- at top of component ----
  const messageContainerRef = useRef<HTMLDivElement | null>(null);


  // the smooth animation
  const smoothTransition = {
    duration: 0.5,
    ease: easeInOut,
  };


  // ---------------------------
  // Scroll to bottom on new message
  // ---------------------------
  useEffect(() => {
    const container = messageContainerRef.current;
    if (!container) return;

    // Check if user is near the bottom before auto-scrolling
    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < 100;

    if (isNearBottom) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);



  // Run login check **after session data is loaded**
  useEffect(() => {
  // Wait for session load
  if (!loaded) return ;

  //console.log("Sender:", sender, "ChatID:", chatID); // testing
  // If session is invalid → redirect
  if (!sender || !chatID || !sessionID) {
  router.push("/");
  return ;
  
  }

  // Call API to verify login
  const loginCheck = async () => {

    try {

      // dev http://localhost:8080/chat-service/api/v1/users/login   Linux 
      // dev  http://127.0.0.1:8080/chat-service/api/v1/users/login  Mac 
      // prod  http://meabhi.me/chat-service/api/v1/users/login
      const response = await fetch("https://api.meabhi.me/chat-service/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ UserName: sender, ChatID: chatID }),
      });

      if (!response.ok) {
        router.push(`/demo/chatapp/user/${chatID}/login`);
      }
    } catch (error) {
      console.error("Login check error:", error);
    }
  };

    loginCheck();
  }, [loaded, sender, chatID, router]);

  // ---------------------------
  // Fetch previous messages
  // ---------------------------
  useEffect(() => {
      
    if (!chatID || !sender) return;

    const fetchMessages = async () => {
        try {

          // https://api.meabhi.me/chat-service/v1/users/chat/messages
          const res = await fetch("https://api.meabhi.me/chat-service/v1/users/chat/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              UserName: sender,
              hash: chatID,
            }),
          });

          if (!res.ok) {
            console.error("Failed to fetch messages:", res.status);
            return;
          }

          const data = await res.json();
          setMessages(data.messages || []);
        
        if (data.messages?.length) {
          const maxID = Math.max(...data.messages.map((m: any) => m.messageid || 0));
          setLastMessageID(maxID);
        }

        } catch (err) {
          console.error("Error fetching chat:", err);
        }
      };
    

    // Run the fetch message in 
    fetchMessages();
    
    // Then run every 10 seconds
    const interval = setInterval(() => {
      fetchMessages();
      console.log("Message refresh done...."); 
    }, 10000); // 10 seconds

    // Cleanup on unmount or dependency change
    return () => clearInterval(interval);

    }, [chatID, sender]);


    // ---------------------------
    // Send new message
    // ---------------------------
    const handleSend = () => {
      if (!input.trim() || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN)
        return;

      const tempID = lastMessageID && lastMessageID > 0
        ? lastMessageID + 1
        : -(Date.now() % 1000000);

      // The input length is set to 4096
      if (input.length > 4096) {

        console.log("Message too long! Please keep under 4096 characters.");
        setMessageLengthError("Failed to send. Message too long! Please keep under 4096 characters.");
        setTimeout(() => setMessageLengthError(""), 3000);
        
        return;
      }


      const msg: Message = {
        messageid: tempID,
        chatid :  chatID,
        sender,
        receiver,
        message: input.trim(),
        time: new Date().toISOString(),
      };

      console.log(msg) ; //test the sending message ------------------

      setMessages((prev) => [...prev, msg]);
      tempID > 0 && setLastMessageID(tempID);
      wsRef.current.send(JSON.stringify(msg));
      setInput("");
    };


  // Optional: show loading state before session is loaded
  if (!loaded) {
    return (
        
    <div
      style={{
        backgroundColor: "var(--background-color)",
        color: "var(--text-color)",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: "2rem" }}>Loading...</h1>
    </div>
    )
  }
  

  return (
    <div>

      <NavBar />
      <CustomBody>
        <HeadingBar
          title={`Welcome ${
            sender ? sender.charAt(0).toUpperCase() + sender.slice(1) : "User"
          }`}
        /> 
        <Container>

          {/* The new Message box*/}
          <Row
            ref={messageContainerRef}
            className="rounded background-color-body mt-3 p-2 text-center"
            style={{
              minHeight: "200px",        // minimum height
              maxHeight: "600px",        // maximum height
              overflowY: "auto",         // enable vertical scrolling
              display: "flex",
              flexDirection: "row",   // must be column for vertical layout
            }}
            >

            {messages.map((msg) => {
              const isSender = msg.sender === sender;

              return isSender ? (
                <Row key={msg.messageid} className="p-1 m-0 mt-1">
                  <Col></Col>
                  <Col></Col>
                  <Col
                    xs={4}
                    md={4}
                    className="rounded-start rounded-top message-bubble-color-sender text-color d-inline-block pt-1 pb-1"
                    style={{ width: "auto", maxWidth: "75%", alignSelf: "flex-end" }}
                  >
                    <p className="mb-0 text-end">{msg.message}</p>
                    <small className="d-block text-end" style={{ fontSize: "0.7rem" ,  opacity: 0.6 }}>
                      {new Date(msg.time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </small>
                  </Col>
                </Row>
              ) : (
                <Row key={msg.messageid} className="p-1 m-0 mt-1">
                  <Col
                    xs={6}
                    md={4}
                    className="rounded-end rounded-top message-bubble-color-reciever d-inline-block pt-1 pb-1"
                    style={{ width: "auto", maxWidth: "75%", alignSelf: "flex-end" }}
                  >
                    <p className="mb-0 text-start">{msg.message}</p>
                    <small className="d-block text-start" style={{ fontSize: "0.7rem" ,opacity: 0.6 }}>
                      {new Date(msg.time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </small>
                  </Col>
                </Row>
              );
            })}

            <div ref={messageContainerRef} />
          </Row>

          </Container>
              
          <Container>

          <Row className="rounded background-color-body mt-3 p-2 text-center ">

          <Col xs={8} md={10}>
            
          <TextareaAutosize
            minRows={1}
            maxRows={6}
            placeholder="Enter the Message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // prevent newline
             handleSend();       // send message
            }
            }}

            className="custom-border custom-placeholder w-100 p-2 mt-1 rounded message-input-box-color input-text"
            style={{ width: "auto" }}
          />
                  
          </Col>

          <Col>

            <Button type="submit" className="button-custom-color m-1 " onClick={handleSend} >
                Send 
              </Button>

          </Col>

        </Row>

 
        </Container>
            
        {/* Added for button */}
          <Container>
            <Row className="rounded background-color-body mt-3 p-2 text-center">
              <Col>
                <Button
                  type="submit"
                  className="button-custom-color me-3 m-1"
                  onClick={() => handleLogout(setLogoutMessage , router)} // pass setter
                  
                >
                  Logout
                </Button>

                <Button
                  type="submit"
                  className="button-custom-color m-1"
                  //onClick={() => handleLogout(setLogoutMessage)} // pass setter
                >
                  Endchat
                </Button>

              </Col>
            </Row>

            <AnimatePresence>
              {logoutMessage && (
                <motion.div
                  key="logoutMessage"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={smoothTransition}
                >
                  <Row className="text-center mt-3">
                    <Col>
                      <p
                        className={
                         logoutMessage.toLowerCase().includes("failed")
                            ? "text-danger bold"
                            : "text-success"
                        }
                      >
                        {logoutMessage}
                      </p>
                    </Col>
                  </Row>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>

              {messageLength && (
                <motion.div
                  key="messageLength"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={smoothTransition}
                >
                  <Row className="text-center mt-3">
                    <Col>
                      <p
                        className={
                         messageLength.toLowerCase().includes("failed")
                            ? "text-danger bold"
                            : "text-success"
                        }
                      >
                        {messageLength}
                      </p>

                    </Col>
                  </Row>
                </motion.div>
              )}
            </AnimatePresence>


          </Container>

        {/*------------*/}
        <SpaceBlock></SpaceBlock>

      </CustomBody>
      <Footer />
    </div>
  );
}
