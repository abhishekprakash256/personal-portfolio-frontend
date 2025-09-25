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

            </CustomBody>
            
      <Footer />
    </div>
  );

}