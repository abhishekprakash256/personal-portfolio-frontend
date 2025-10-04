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
import { useRouter } from "next/navigation";
import "../login/styles.css"



export function useChatSession() {
  const [chatData, setChatData] = useState({
    sender: "",
    receiver: "",
    chatHash: "",
  });

  useEffect(() => {
    const sender = sessionStorage.getItem("sender") || "";
    const receiver = sessionStorage.getItem("receiver") || "";
    const chatHash = sessionStorage.getItem("chatHash") || "";
    setChatData({ sender, receiver, chatHash });
  }, []);

  return chatData;
}



export default function ChatServerChat() {

const { sender, receiver, chatHash } = useChatSession();

  return (
    <div>
      <NavBar />
      <CustomBody>
        <HeadingBar title={`Welcome ${sender ? sender.charAt(0).toUpperCase() + sender.slice(1) : "User"}`} />
      </CustomBody>
      <Footer />
    </div>
  );
}