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
  setMessages: React.Dispatch<React.SetStateAction<Message[]>> ,
  setReconnect : any ,
  setNewRecievedMessage : any ,
  setTypingIdicatorIncoming : any ,
  
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

        setReconnect("") ; // set the reconnect message as connection is done
        console.log("WebSocket connected ... ");

        heartbeatInterval.current = setInterval(() => {
          if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({ type: "ping", sessionID }));
          }
        }, 15000);
      };

      wsRef.current.onmessage = (event) => {
        try {
          const data: Message & { type?: string } = JSON.parse(event.data);

          //console.log(data) ; // testing 
          if (data.type === "pong") return; // ignore heartbeat

          //console.log("Incoming message:", data);  // Testing the incoming message 

          if (data.type === "typing") {

            //set the typing indicator as true

            //console.log("The typing data is ",data) ;   // test 

            setTypingIdicatorIncoming(true) ;  // set the typing indicator

            return ;

          }

          if (data.type === "typingStop") {

            // set the typing indicator stop

            // console.log("The typing stop data is ",data) ;   // test

            setTypingIdicatorIncoming(false) ; // set the typing indicator

            return ;
          }

          setNewRecievedMessage(true) ; // set the new recieved message

          setMessages((prev) => [...prev, data]);
          
        } catch (err) {
          console.error("WebSocket parse error:", err);
        }
      };

      wsRef.current.onerror = (err) => {

        //setReconnect("Failed to connect, try reconnect") ; // set the reconnect message
        console.error("WebSocket error:", err);
        wsRef.current?.close();
      };

      wsRef.current.onclose = (e) => {
        console.warn("WebSocket closed:", e.reason);
        heartbeatInterval.current && clearInterval(heartbeatInterval.current);
        reconnectTimeout.current = setTimeout(connect, 3000);

        setReconnect("Failed to connect, try reconnect") ; // set the reconnect message
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


async function handleEndChat(setEndChatMessage : any  , router : any ,setReconnect : any) {
  // the function to end the chat for the users 
  // hit the link /chat-service/v1/users/chat/end

  /*
  type EndChatRequest struct {
    ChatID   string `json:"Hash"`
    UserName string `json:"UserName"`
  }
  */

  /*
  type SuccessResponse struct {
  Status  string `json:"status"`
  Code    int    `json:"code"`
  Message string `json:"message"`
}

  // ErrorResponse defines a standard error payload.
  type ErrorResponse struct {
    Status  string `json:"status"`
    Code    int    `json:"code"`
    Message string `json:"message"`
  }
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
      setEndChatMessage("Missing session information End Chat failed. Please try again.");
      setTimeout(() => setEndChatMessage(""), 3000);
      return;
    }

    // Prepare end chat request body
    const body = {
      Hash: chatID,  // using the Hash instead of the ChatID
      UserName: userName,
    };

    // Make POST request to end chat endpoint
    const response = await fetch("https://api.meabhi.me/chat-service/v1/users/chat/end", {
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

      setEndChatMessage("End Chat Successful!");
      setReconnect("")  //overwrite set reconnect

      //alert("Logout successful!");
      setTimeout(() => (router.push(`/`)), 1000);


    } else {

      // Logout failed — show error message
      const message = data.message || "Chat End failed due to unknown error.";
      //alert(`Logout failed: ${message}`);
      setEndChatMessage(`End Chat failed: ${message}`);
      setReconnect("")
      setTimeout(() => setEndChatMessage(""), 3000);

    }
  } catch (error) {
    console.error("Logout error:", error);
    //alert("An error occurred while logging out. Please try again.");
    setEndChatMessage("An error occurred while end chat out failed. Please try again.");
    setReconnect("")
    setTimeout(() => setEndChatMessage(""), 3000);
  }
 
}




async function handleLogout(setLogoutMessage : any , router : any , setReconnect : any) {
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
      setReconnect("")

      //alert("Logout successful!");
      setTimeout(() => (router.push(`/`)), 2000);
    } else {
      // Logout failed — show error message
      const message = data.message || "Logout failed due to unknown error.";
      //alert(`Logout failed: ${message}`);
      setLogoutMessage(`Logout failed: ${message}`);
      setReconnect("")
      setTimeout(() => setLogoutMessage(""), 3000);
    }
  } catch (error) {
    console.error("Logout error:", error);
    //alert("An error occurred while logging out. Please try again.");
    setLogoutMessage("An error occurred while logging out failed. Please try again.");
    setReconnect("")
    setTimeout(() => setLogoutMessage(""), 3000);
  }


}


// The function for the main message parsing

export default function UserChatService() {

  // the main chat function for the user chat session
  const router = useRouter();

  const { sender, receiver, chatID , sessionID , loaded} = useChatSession();

  const [reconnectMessage, setReconnect] = useState("");   // the reconnect message

  const [messages, setMessages] = useState<Message[]>([]);

  const [lastMessageID, setLastMessageID] = useState<number | null>(null);  // handled by the websocket

  const [minMessageID, setMinMessageID] = useState<number | null>(null);  // set the min messageid

  const [input, setInput] = useState("");

  const [newRecievedMessage , setNewRecievedMessage] = useState(false);  // set the new message

  const [logoutMessage, setLogoutMessage] = useState("");

  const [messageLength, setMessageLengthError] = useState("");

  const [endchatMessage , setEndChatMessage] = useState("");  // set the endchat message

  const [hasMoreMessages, setHasMoreMessages] = useState(true);  // set the state of the hasmore button

  const [showLoadMore, setShowLoadMore] = useState(false); // the loadmore button

  const [showNewMessage, setShowNewMessage] = useState(false); // the loadmore button

  const messageContainerRef = useRef<HTMLDivElement | null>(null);  // the message container 
  
  const firstLoadRef = useRef(true);  // set the first load

  const [typingIndicatorIncoming , setTypingIdicatorIncoming] = useState(false);  // the typing indicator, true set for testing

  const [isTyping, setIsTyping] = useState(false);  //set the typing state 

  const wsRef = useChatWebSocket(chatID, sender, sessionID, setMessages , setReconnect , setNewRecievedMessage , setTypingIdicatorIncoming);  // passed set reconnect

  // set the typing indicator for seding the typing message
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const typingStartDelayRef = useRef<NodeJS.Timeout | null>(null);
   
  let typingTimeout: NodeJS.Timeout | null = null; //set the time out 





  // the smooth animation
  const smoothTransition = {
    duration: 0.5,
    ease: easeInOut,
  };


  // ---------------------------
  // Scroll to bottom on new message
  // scroll to the top of the page check 
  // ---------------------------
 

  useEffect(() => {
    const container = messageContainerRef.current;
    if (!container) return;

    //check the user near top
    const isNearTop = container.scrollTop < 20;
    //console.log("In the if condn",showLoadMore);  /// testing purpose
    setShowLoadMore(isNearTop);

    // Check if user is near bottom
    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < 150;


    // set not near bottom
    setShowNewMessage(!isNearBottom);

    // make the show new message false
    if (isNearBottom) {
      setNewRecievedMessage(false);   // hide "New Message" indicator
    }

    //console.log("set the more message ",showNewMessage); // testing the print

    // On first load, scroll instantly to bottom
    if (firstLoadRef.current) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "auto", // instant, no animation
      });
      firstLoadRef.current = false;
      return;
    }

    // On new messages, only auto-scroll if user is near bottom
    //if (isNearBottom || !typingIndicatorIncoming) { // causing the issue in auto scroll on fetch
    
    if (isNearBottom ) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages , typingIndicatorIncoming]);



  // the scroll message container to new message
  const scrollToBottom = () => {
  const container = messageContainerRef.current;
  if (container) {
    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",   // smooth scrolling
    });
  }
    setNewRecievedMessage(false);  // hide new message indicator
    };



  // Run login check **after session data is loaded**
  useEffect(() => {
  // Wait for session load
  if (!loaded) return ;

  //console.log("Sender:", sender, "ChatID:", chatID); // testing
  // If session is invalid → redirect
  if (!chatID || !sessionID ) {

  router.push("/");  // change here for the login link 
  //router.push(`/demo/chatapp/user/${chatID}/login`);  // change here for the login link 
  return ;
  
  }

  if (!sender || !receiver ) {

  //router.push("/");  // change here for the login link 
  router.push(`/demo/chatapp/user/${chatID}/login`);  // change here for the login link 
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
      router.push(`/demo/chatapp/user/${chatID}/login`);
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
      const incoming = data.messages || [];

      setMessages(prev => {
        // Build lookup so no duplicates are ever added
        const map = new Map(prev.map(m => [m.messageid, m]));

        for (const msg of incoming) {
          map.set(msg.messageid, msg); // if exists = updated, if new = added
        }

        const sorted = Array.from(map.values()).sort(
          //(a, b) => a.messageid - b.messageid
          (a, b) => (a.messageid ?? Infinity) - (b.messageid ?? Infinity)

        );

        return sorted;
      });

      
      if (incoming.length ) {
        //const maxID = Math.max(...incoming.map(m => m.messageid));
        const maxID = Math.max(...incoming.map((m: { messageid: number }) => m.messageid));

        //const minID = Math.min(...incoming.map(m => m.messageid));
        const minID = Math.min(...incoming.map((m: { messageid: number }) => m.messageid));
        setLastMessageID(maxID);
        setMinMessageID(minID);
      }

      } catch (err) {
        console.error("Error fetching chat:", err);
      }
    };

  // Initial load
  fetchMessages();

  // Sync every 10 seconds

    const interval = setInterval(() => {
      fetchMessages();
      //console.log("Message refresh done");   // print even if failed 
    }, 10000); // 10 seconds


  return () => clearInterval(interval);

}, [chatID, sender]);

    

//fetch more message when clicked , edit the function
const fetchMoreMessages = async () => {
  try {
    const res = await fetch("https://api.meabhi.me/chat-service/v1/users/chat/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        UserName: sender,
        hash: chatID,
        messageid: minMessageID,  // fetch older than this
      }),
    });

    if (!res.ok) {
      console.error("Failed to fetch messages:", res.status);
      return;
    }

    const data = await res.json();
    const newMessages = data.messages || [];

    if (newMessages.length === 0) {
        setHasMoreMessages(false);
        return;
      }

    setMessages(prev => {
      const map = new Map(prev.map(m => [m.messageid, m]));

      for (const msg of newMessages) {
        map.set(msg.messageid, msg);
      }

      const sorted = Array.from(map.values()).sort(
        //(a, b) => a.messageid - b.messageid
        (a, b) => (a.messageid ?? Infinity) - (b.messageid ?? Infinity)
      );

      return sorted;
    });

    //const newMinID = Math.min(...newMessages.map(m  => m.messageid ));
    const newMinID = Math.min(...newMessages.map((m: { messageid: number }) => m.messageid));
    setMinMessageID(newMinID);

  } catch (err) {
    console.error("Error fetching chat:", err);
  }
};

    



    // -------------------------
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

      //console.log(msg) ; //test the sending message ------------------

      setMessages((prev) => [...prev, msg]);
      tempID > 0 && setLastMessageID(tempID);
      wsRef.current.send(JSON.stringify(msg));
      setInput("");
    };

  
 
    const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInput(e.target.value);

      // --- START TYPING (DELAYED) ---
      if (!isTyping) {
        // Clear previous start timer
        if (typingStartDelayRef.current) {
          clearTimeout(typingStartDelayRef.current);
        }

        // Wait 500ms before marking as typing
        typingStartDelayRef.current = setTimeout(() => {
          setIsTyping(true);
          
          //console.log("Typing started...");  // test
        }, 500);  // <--- change delay here (500ms)
      }

      // --- STOP TYPING AFTER NO INPUT ---
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
        
        //console.log("Typing stopped..."); // test
      }, 1500);  // <--- stop delay after no input
    };


  // send the typing message through websocket
  useEffect(() => {
    const payload = JSON.stringify({
      chatid: chatID,
      sender,
      receiver,
      type: isTyping ? "typing" : "typingStop",
    });

    //console.log("Sending WS message:", payload);  // <-- TEST PRINT

    wsRef.current?.send(payload);
  }, [isTyping]);




  

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

        {/*
        <HeadingBar
          title={`Welcome ${
            sender ? sender.charAt(0).toUpperCase() + sender.slice(1) : "User"
          }`}
         
        /> 
          
        */}

          
        <Container>
        <Row className="rounded background-color-body mt-3 p-2 position-relative">

          {/* Centered Heading (not affected by circle) */}
          <Col className="text-center">
            <h1 className="bio-font font-color-class heading-responsive-font m-0">
              {`Welcome ${
                sender ? sender.charAt(0).toUpperCase() + sender.slice(1) : "User"
              }`}
            </h1>
          </Col>

          {/* Absolutely Positioned Circle – DOES NOT PUSH ANYTHING */}
          <div
            className="status-circle mt-0 p-0"
            style={{
              position: "absolute",
              right: "15px",
              top: "50%",
              backgroundColor: reconnectMessage ? "red" : "green",   // CONDITIONAL COLOR   
              transform: "translateY(-50%)",
            }}
            title="Online"
          ></div>

        </Row>
      </Container>

        <Container style={{ position: "relative" }}>

          {/* The new Message box*/}
          <Row
            ref={messageContainerRef}
            className="rounded background-color-body mt-3 p-2 text-center"
            style={{
              minHeight: "200px",        // minimum height
              maxHeight: "600px",        // maximum height
              overflowY: "auto",         // enable vertical scrolling.  
              display: "flex",
              flexDirection: "row",   // must be column for vertical layout
              position: "relative",   // this for position relative for more message 
            }}
            >

            <AnimatePresence>
            {hasMoreMessages && showLoadMore && (
              <>
                <motion.div
                  key="loadMoreButton"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={smoothTransition}
                >
                  <Row>
                    <Col>
                      <Button
                        type="submit"
                        className="new-message-button shadow m-1"
                        onClick={fetchMoreMessages}
                      >
                        Load More
                      </Button>
                    </Col>
                  </Row>
                </motion.div>
              </>
            )}
          </AnimatePresence>


          {/*adding the typing indicator */}

            {messages.map((msg) => {
              const isSender = msg.sender === sender;

              return isSender ? (

                <Row key={msg.messageid} className="p-1 m-0">
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
                <Row key={msg.messageid} className="p-1 m-0">
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

            {/*start the typing idinctor */}


            { typingIndicatorIncoming && (

              <Row  className="p-1 m-0">
                  <Col
                    xs={6}
                    md={4}
                    className="rounded-end rounded-top message-bubble-color-reciever d-inline-block"
                    style={{ width: "auto", maxWidth: "75%", alignSelf: "flex-end"  }}
                  >
                    <h1 className="animate bounce mb-2" style={{ marginTop: -8, padding: 0, lineHeight: "1" }}>
                      <a 
                        className="text-decoration-none more-color" 
                        href={""} 
                        // target="_blank" // Uncomment if you want links to open in a new tab
                        rel="noopener noreferrer" // Security best practices
                      >
                        <span className="typing-dot ">.</span>
                        <span className="typing-dot ms-1">.</span>
                        <span className="typing-dot ms-1">.</span>
                      </a>
                    </h1>
                              
                     
                  </Col>
                </Row>

            ) }


            {/*Test of the typing indictor*/}    

          </Row>
            
          
            <AnimatePresence>
                {newRecievedMessage && showNewMessage && (
                  <motion.div
                    key="newMessageButton"
                    initial={{ opacity: 0, y: 20 }}     // starts lower
                    animate={{ opacity: 1, y: 0 }}      // moves into place
                    exit={{ opacity: 0, y: 20 }}        // exit animation
                    transition={smoothTransition}
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      left: 0,
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      zIndex: 1000,
                      pointerEvents: "auto",
                    }}
                  >
                    <Button className="new-message-button shadow" onClick={scrollToBottom}>
                      New Message
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
                          

          </Container>
             

        {/* message input box */}

          <Container>
            <Row className="rounded background-color-body mt-3 p-2 text-center">
              <Col>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end", // textarea grows, button stays aligned
                    width: "100%",
                  }}
                >
                  {/* TEXTAREA */}
      <TextareaAutosize
        minRows={1}
        maxRows={8}
        value={input}
        onChange={handleTyping}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        placeholder="Enter the message"
        className="custom-border custom-placeholder w-100 p-2 mt-1 mb-1 rounded message-input-box-color input-text"
        style={{
          flex: 1,
          resize: "none",
        }}
      />


                  {/* SEND BUTTON */}
                  <Button
                    type="submit"
                    className="button-custom-color ms-2 mb-1"
                    onClick={handleSend}
                    style={{ whiteSpace: "nowrap" }} // stop word-break
                  >
                    Send
                  </Button>
                </div>
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
                  onClick={() => handleLogout(setLogoutMessage , router , setReconnect)} // pass setter
                  
                >
                  Logout
                </Button>

                <Button
                  type="submit"
                  className="button-custom-color m-1"
                  onClick={() => handleEndChat( setEndChatMessage , router , setReconnect)} // pass setter
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

        
          <AnimatePresence>

              {reconnectMessage && (
                <motion.div
                  key="reconnectMessage"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={smoothTransition}
                >
                  <Row className="text-center mt-3">
                    <Col>
                      <p
                        className={
                         reconnectMessage.toLowerCase().includes("failed")
                            ? "text-danger bold"
                            : "text-success"
                        }
                      >
                        {reconnectMessage}
                      </p>

                    </Col>
                  </Row>
                </motion.div>
              )}
            </AnimatePresence>

          <AnimatePresence>

              {endchatMessage && (
                <motion.div
                  key="endchatMessage"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={smoothTransition}
                >
                  <Row className="text-center mt-3">
                    <Col>
                      <p
                        className={
                         endchatMessage.toLowerCase().includes("failed")
                            ? "text-danger bold"
                            : "text-success"
                        }
                      >
                        {endchatMessage}
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
