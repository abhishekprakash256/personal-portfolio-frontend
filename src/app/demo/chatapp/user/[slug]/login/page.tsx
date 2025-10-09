"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar, HeadingBar, CustomBody, SpaceBlock, Footer } from "front-end-component-kit";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { easeInOut,  motion, AnimatePresence } from 'framer-motion';
import { use } from "react";
import { useRouter } from "next/navigation";
import "../login/styles.css"




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
    
    // dev http://localhost:8050/chat-service/api/v1/users/login   Linux 
    // dev  http://127.0.0.1:8050/chat-service/api/v1/users/login   Mac 
    // prod  http://meabhi.me/chat-service/api/v1/users/login
    const response = await fetch("https://api.meabhi.me/chat-service/v1/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ UserName: sender, hash: chatID }),
    });

    console.log(chatID , sender)

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





export default function ChatServerLogin({ params }: { params: Promise<{ slug: string }> }) {
  const [sender, setSender] = useState("");
  const [error, setError] = useState("");
  const [chatUrl, setChatUrl] = useState("");

  const resolvedParams = use(params); //unwrap the promise
  const { slug } = resolvedParams;
  const router = useRouter();
  
  
  const smoothTransition = {
    duration: 0.5,
    ease: easeInOut,
  };



  // ---------- Handle Login ----------
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const smoothTransition = {
    duration: 0.5,
    ease: easeInOut,
  };


    // Validate input
    const { valid, error: validationError, username } = validateUser(sender);
    if (!valid) {
      setError(validationError || "Invalid username");
       //  Auto-clear error after 3 seconds
      setTimeout(() => setError(""), 3000);
      return;
    }

    // Call API
    const result = await loginUser(slug, username!);
    if (!result) {
      setError("Failed to login user. Please try again.");
      setTimeout(() => setError(""), 3000);
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

    // Redirect to chat page
    router.push(`/demo/chatapp/user/${result.hash}/chat`);
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
                
               
                
              </Form>
            </AnimatePresence>
            <AnimatePresence>
              {error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={smoothTransition}
                >
                  <SpaceBlock />
                  <p className="text-danger bold">{error}</p>
                </motion.div>
              )}
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
                <p className="text-success">Login Succesfull </p>
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