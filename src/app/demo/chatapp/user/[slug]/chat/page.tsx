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




export default function UserChatService() {

  // the main chat function for the user chat session
  const router = useRouter();

  const { sender, receiver, chatID , sessionID , loaded} = useChatSession();

  const [messages, setMessages] = useState<Message[]>([]);

  const [lastMessageID, setLastMessageID] = useState<number | null>(null);  // handled by the websocket

  const [newMsg, setNewMsg] = useState("");

  const [input, setInput] = useState("");

  const wsRef = useRef<WebSocket | null>(null);

    
  const smoothTransition = {
    duration: 0.5,
    ease: easeInOut,
  };


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

      fetchMessages();
    }, [chatID, sender]);


      // Connect to WebSocket
  useEffect(() => {
  if (!chatID || !sender ) return;

  let ws: WebSocket | null = null;
  let heartbeatInterval: NodeJS.Timeout | null = null;
  let reconnectTimeout: NodeJS.Timeout | null = null;

  const connectWebSocket = () => {
    // Always clear first
    if (ws) ws.close();

    // For prod use wss://
    ws = new WebSocket(
      `wss://api.meabhi.me/chat-server/v1/ws/chat?chatID=${chatID}&sessionID=${sessionID}&user=${sender}`
    );

    ws.onopen = () => {
      console.log(" WebSocket connected");

      // Start heartbeat ping every 25s
      heartbeatInterval = setInterval(() => {
        if (ws?.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: "ping", sessionID }));
        }
      }, 25000);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        // Ignore pongs
        if (data.type === "pong") return;

        setMessages((prev) => [...prev, data]);
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };

    ws.onerror = (err) => {
      console.error(" WebSocket error:", err);
      ws?.close();
    };

    ws.onclose = (e) => {
      console.warn(" WebSocket closed:", e.reason);
      if (heartbeatInterval) clearInterval(heartbeatInterval);
      // Reconnect after delay
      reconnectTimeout = setTimeout(() => connectWebSocket(), 3000);
    };

    wsRef.current = ws;
  };

  connectWebSocket();

  // Cleanup
  return () => {
    if (heartbeatInterval) clearInterval(heartbeatInterval);
    if (reconnectTimeout) clearTimeout(reconnectTimeout);
    ws?.close();
  };
}, [chatID, sender, sessionID]);

   

          

      // Send message
    const handleSend = () => {
      if (
        !input.trim() ||
        !wsRef.current ||
        wsRef.current.readyState !== WebSocket.OPEN
      ) {
        return;
      }

      // If we already have real IDs from DB, increment them
      // Otherwise, use a negative ID for temporary unsaved message
      const tempID =
        lastMessageID && lastMessageID > 0
          ? lastMessageID + 1
          : -(Date.now() % 1000000); // unique negative temp ID

      const msg = {
        messageid: tempID,
        chatid: chatID,
        sender: sender,
        receiver: receiver,
        message: input.trim(),
        time: new Date().toISOString(), // add time for immediate render
      };

      // Add to local state immediately
      setMessages((prev) => [...prev, msg]);

      // If we had a real ID, bump the counter
      if (tempID > 0) {
        setLastMessageID(tempID);
      }

      // Send to server
      wsRef.current.send(JSON.stringify(msg));
      console.log("Sent message:", msg);

      // Clear input
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
                
              {/* Message render*/}

              <Row className="rounded background-color-body mt-3 p-2 text-center" 
              style={{
              height: "600px",             // fixed height (adjust as needed)
              overflowY: "auto",           // enable vertical scrolling
              display: "flex",
              flexDirection: "row",
            }} >

                {messages.map((msg) => {
                  
                  const isSender = msg.sender === sender;

                  return isSender ? (
                    // Sender message (right side)
                    <Row key={msg.messageid} className="p-1 m-0"> 
                      <Col></Col>
                      <Col></Col>
                      <Col xs={4} md={4} className="rounded-start rounded-top message-box-color input-text d-inline-block pt-1 pb-1"
                      style={{ width: "auto", maxWidth: "75%", alignSelf: "flex-end" }}>
                        <p className="mb-0">{msg.message}</p>
                        <small className=" d-block text-end" style={{ fontSize: "0.7rem" }}>
                          {new Date(msg.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </small>
                      </Col>
                    </Row>
                  ) : (
                    // Receiver message (left side)
                    <Row key={msg.messageid} className="p-1 m-0">
                      <Col xs={6} md={4} className="rounded-end rounded-top button-custom-color d-inline-block pt-1 pb-1"
                      style={{ width: "auto", maxWidth: "75%", alignSelf: "flex-end" }}>
                        <p className="mb-0 ">{msg.message}</p>
                        <small className="d-block text-start " style={{ fontSize: "0.7rem" }}>
                          {new Date(msg.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </small>
                      </Col>
                    </Row>
                  );
                })}

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
            className="custom-border custom-placeholder w-100 p-2 mt-1 rounded message-box-color input-text"
          />
                  
          </Col>

          <Col>

            <Button type="submit" className="button-custom-color m-1" onClick={handleSend} >
                Send 
              </Button>

          </Col>

        </Row>


        
        {/*  
       <Row className="rounded background-color-body text-center mt-3 p-2">
          <Col>

            <Button type="submit" className="button-custom-color m-1" >
                Logout 
              </Button>

          </Col>

            <Col>

            <Button type="submit" className="button-custom-color m-1" >
                Endchat 
              </Button>

          </Col>

       

          </Row>

           */}

           
            
        </Container>
        <SpaceBlock></SpaceBlock>

      </CustomBody>
      <Footer />
    </div>
  );
}
