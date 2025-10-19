/*
The chat app page for the user

flow --> 

the chat page checks the session storage data 3 data --> chathash , sender and reciver

if the data is found 
check the data with the backend server 
    -> if the data is correct connect to the ws server 
    -> establish the connection

if the data not found or data is wrong 
return to the login page 


*/

"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar, HeadingBar, CustomBody, SpaceBlock, Footer } from "front-end-component-kit";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { easeInOut,  motion, AnimatePresence } from 'framer-motion';
import { use } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useRouter } from "next/navigation";
import "../chat/styles.css"




// Hook to read sessionStorage
function useChatSession() {
  const [chatData, setChatData] = useState({
    sender: "",
    receiver: "",
    chatHash: "",
    loaded : false,  // the flag to track the load state of the sesion storage
  });

  useEffect(() => {
    const sender = sessionStorage.getItem("sender") || "";
    const receiver = sessionStorage.getItem("receiver") || "";
    const chatHash = sessionStorage.getItem("chatHash") || "";
    setChatData({ sender, receiver, chatHash , loaded: true});
  }, []);

  return chatData;
}




export default function ChatServerChat() {
  const router = useRouter();
  const { sender, receiver, chatHash , loaded} = useChatSession();

    
  const smoothTransition = {
    duration: 0.5,
    ease: easeInOut,
  };


  // Run login check **after session data is loaded**
  useEffect(() => {
    // Wait for session load
    if (!loaded) return ;

    //console.log("Sender:", sender, "ChatHash:", chatHash); // testing
    // If session is invalid → redirect
    if (!sender || !chatHash) {
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
          body: JSON.stringify({ UserName: sender, hash: chatHash }),
        });

        if (!response.ok) {
          router.push(`/demo/chatapp/user/${chatHash}/login`);
        }
      } catch (error) {
        console.error("Login check error:", error);
      }
    };

    loginCheck();
  }, [loaded, sender, chatHash, router]);

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

             <Row className="rounded background-color-body mt-3 p-2 text-center">

              

              <Row className="p-2 m-0">


              <Col className="rounded button-custom-color " xs={4} md={4}>
              <p className="p-2 mb-0">Reciever</p>
              </Col>


              </Row>

       
              <Row className="p-2 m-0">
              <Col className=""></Col>
              <Col className=""></Col>
              <Col className="rounded message-box-color input-text" xs={4} md={4}>
              <p className="p-1 mb-0">Sender</p>
              </Col>

              </Row>


             </Row>

            

        </Container>

        
          <Container>

          <Row className="rounded background-color-body mt-3 p-2 text-center ">

          <Col xs={8} md={10}>
            
          <TextareaAutosize
            minRows={1}
            maxRows={6}
            placeholder="Enter the Message"
            className="custom-border custom-placeholder w-100 p-2 mt-1 rounded message-box-color input-text"
          />
                  
          </Col>

          <Col>

            <Button type="submit" className="button-custom-color m-1" >
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
