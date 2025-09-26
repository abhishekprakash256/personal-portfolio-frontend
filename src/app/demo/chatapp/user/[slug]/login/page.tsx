"use client";



import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar, HeadingBar, CustomBody, SpaceBlock, Footer } from "front-end-component-kit";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import QRCode from "react-qr-code";
import { easeInOut,  motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from "react";

type Message = {
  hash: string;
  sender: string;
  receiver: string;
  message: string;
};





//  Validation function
function validateUser(Sender: string ): { valid: boolean; error?: string; u1?: string } {
  const specialCharRegex = /^[a-zA-Z0-9_]+$/;


  // Convert to lowercase
  const u1 = Sender.trim().toLowerCase();

  if (!specialCharRegex.test(u1)) {
    return { valid: false, error: "Usernames can only contain letters, numbers, and underscores." };
  }

  return { valid: true, u1};
}


async function loginUser(ChatID: string , Sender : string ) {

 try {
    // dev http://localhost:8080/chat-server/user/login    Linux 
    // dev  http://127.0.0.1:8080/chat-server/user/login   Mac 
    // prod  http://meabhi.me/chat-server/user/login   

    const response = await fetch("http://127.0.0.1:8080/chat-server/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ UserName : Sender, hash : ChatID }),
    });

  if (!response.ok) throw new Error("Failed to register users");

  const data = await response.json();
    
  return  data.data.hash  , data.data.sender , data.data.receiver

  }

  catch (error) {
    console.error("Error:", error);
    return null;
  }

}



function handlelogin() {
  

}


export default function ChatServerRegistration() {
  const [sender, setSender] = useState('');
  const [receiver, setReciever] = useState('');
  const [chatUrl, setChatUrl] = useState('');
  const [error, setError] = useState('');
  const [loginForm , setLoginForm] = useState(true) ;
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(true);
  const [showMessageSendButton, setMessageSendButton] = useState(false);
  const [showEndChatButtonDisabled, setEndChatButtonDisabled] = useState(false);
  const [showLogoutButtonDisabled, setLogoutButtonDisabled] = useState(false);
  const [showAlert, setShowAlert] = useState(false);


return (
    <div>
      <NavBar />

      <CustomBody>

        <HeadingBar title={"Enter User Name to Login User"} />

          <Row className='text-center'>   
          <Col></Col>
          <Col xs={12} md={4}>

           <AnimatePresence>
            
            <Form onSubmit={handlelogin}>

              <SpaceBlock />
              <input
                type="text"
                name="userOne"
                className="me-2 custom-border form-control custom-placeholder"
                aria-label="Search"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder="Enter the user name"
              />

            </Form>
    
          </AnimatePresence>

          </Col>
          <Col></Col>
        </Row>


          <Container>
       
            <Row className='rounded background-color-body mt-3 p-2'>
              <Col className="text-center">
                <Button type="submit" className="button-custom-color m-1" onClick={handlelogin}>
                  Login User
                </Button>
              </Col>
            </Row>
            <SpaceBlock></SpaceBlock>
          
        </Container>




            </CustomBody>
            
      <Footer />
    </div>
  );

}