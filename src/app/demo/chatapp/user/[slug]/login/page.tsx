"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar, HeadingBar, CustomBody, SpaceBlock, Footer } from "front-end-component-kit";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { use } from "react";

type Message = {
  hash: string;
  sender: string;
  receiver: string;
  message: string;
};


// ---------- Types ----------
type LoginResponse = {
  hash: string;
  sender: string;
  receiver: string;
};



// ---------- Validation ----------
function validateUser(sender: string): { valid: boolean; error?: string; username?: string } {
  const specialCharRegex = /^[a-zA-Z0-9_]+$/;
  const username = sender.trim().toLowerCase();

  if (username.length === 0) {
    return { valid: false, error: "Username cannot be empty." };
  }

  if (!specialCharRegex.test(username)) {
    return { valid: false, error: "Username can only contain letters, numbers, and underscores." };
  }

  return { valid: true, username };
}

// ---------- API Call ----------
async function loginUser(chatID: string, sender: string): Promise<LoginResponse | null> {
  try {
    
    // dev http://localhost:8080/chat-server/user/login    Linux 
    // dev  http://127.0.0.1:8080/chat-server/user/login   Mac 
    // prod  http://meabhi.me/chat-server/user/login
    const response = await fetch("http://localhost:8080/chat-server/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ UserName: sender, hash: chatID }),
    });

    if (!response.ok) throw new Error("Failed to login user");

    const data = await response.json();

    return {
      hash: data.data.hash,
      sender: data.data.sender,
      receiver: data.data.receiver,
    };
  } catch (error) {
    console.error(" Error:", error);
    return null;
  }
}



function handlelogin() {

  // should return true if succesfull
  // set the sender value in browser 
  // set the receiver value in browser 
  // set the chatid in the browser as well 

}


export default function ChatServerLogin({ params }: { params: Promise<{ slug: string }> }) {
  const [sender, setSender] = useState("");
  const [error, setError] = useState("");
  const [chatUrl, setChatUrl] = useState("");

  const resolvedParams = use(params); //unwrap the promise
  const { slug } = resolvedParams;


  // ---------- Handle Login ----------
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    const { valid, error: validationError, username } = validateUser(sender);
    if (!valid) {
      setError(validationError || "Invalid username");
      return;
    }

    // Call API
    const result = await loginUser(slug, username!);
    if (!result) {
      setError("Failed to login user. Please try again.");
      return;
    }

    // Save data to browser sessionStorage
    sessionStorage.setItem("chatHash", result.hash);
    sessionStorage.setItem("sender", result.sender.toLowerCase());
    sessionStorage.setItem("receiver", result.receiver.toLowerCase());

    // Update UI state
    setChatUrl(result.hash);
    setSender("");
    setError("");

    console.log(" Login successful:", result);
  };

  return (
    <div>
      <NavBar />
      <CustomBody>
        <HeadingBar title="Enter User Name to Login User" />

        <Row className="text-center">
          <Col></Col>
          <Col xs={12} md={4}>
            <AnimatePresence>
              <Form onSubmit={handleLogin}>
                <SpaceBlock />
                <input
                  type="text"
                  name="sender"
                  className="me-2 custom-border form-control custom-placeholder"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  placeholder="Enter the user name"
                />
                {error && <p className="text-danger mt-2">{error}</p>}
              </Form>
            </AnimatePresence>
          </Col>
          <Col></Col>
        </Row>

        <Container>
          <Row className="rounded background-color-body mt-3 p-2">
            <Col className="text-center">
              <Button type="submit" className="button-custom-color m-1" onClick={handleLogin}>
                Login User
              </Button>
            </Col>
          </Row>

          {chatUrl && (
            <Row className="text-center mt-3">
              <Col>
                <p className="text-success">Chat session started with hash: {chatUrl}</p>
              </Col>
            </Row>
          )}

          <SpaceBlock />
        </Container>
      </CustomBody>

      <Footer />
    </div>
  );
}