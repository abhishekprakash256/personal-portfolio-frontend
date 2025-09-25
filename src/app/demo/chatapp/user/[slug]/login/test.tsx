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



export default function ChatClient() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const wsRef = useRef<WebSocket | null>(null);

  const chatHash = "6LRcGlCjvNB"; // hardcoded for now
  const sender = "Abhi";
  const receiver = "Anny";

  useEffect(() => {
    // Connect to Go WebSocket server
    const ws = new WebSocket(
      `ws://localhost:8080/chat-server/ws?hash=${chatHash}&user=${sender}`
    );

    ws.onopen = () => {
      console.log(" Connected to WebSocket server");
    };

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        console.log("📩 Received:", msg);
        setMessages((prev) => [...prev, msg]);
      } catch {
        console.log("📩 Received raw:", event.data);
      }
    };

    ws.onclose = () => {
      console.log(" Disconnected from server");
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    wsRef.current = ws;

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

    const outMsg: Message = {
      hash: chatHash,
      sender,
      receiver,
      message: input,
    };

    wsRef.current.send(JSON.stringify(outMsg));
    setMessages((prev) => [...prev, outMsg]); // optimistic update
    setInput("");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Chat: {sender} ➝ {receiver}</h2>
      <div className="border p-2 h-64 overflow-y-auto bg-gray-50 rounded mb-2">
        {messages.map((m, i) => (
          <div key={i} className={m.sender === sender ? "text-blue-600" : "text-green-600"}>
            <b>{m.sender}:</b> {m.message}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 border rounded p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
