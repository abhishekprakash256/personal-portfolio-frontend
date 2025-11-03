/*
The testing of the websocket for the go server 
using the react use websocket 

can be accesed by /demo/chatapp
*/

"use client";



import "bootstrap/dist/css/bootstrap.min.css";
import { NavBar, HeadingBar, CustomBody, SpaceBlock, Footer } from "front-end-component-kit";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import useWebSocket from 'react-use-websocket';
import React from 'react';


/*
information for the connection to websocket 

url - ws://localhost:8050/chat-server/v1/ws/chat?chatID=${chatID}&sessionID=${sessionID}&user=${sender}
ChatID = "qQyvvJ9s"
SessionID = "b14d0fe2-7dc7-4544-afd2-d292f48db712"
sender = "bob"
recipient = "ben"



*/


// The message interface
interface Message {
    messageid: number | null;
    sender: string;
    receiver: string;
    message: string;
    time: string;
    }


interface SendMessage {
  chatID : string ;
  sender: string;
  receiver : string ;
  message: string;
}


export default function TestChatService() {

    const sessionID = "b14d0fe2-7dc7-4544-afd2-d292f48db712" ;
    const chatID = "qQyvvJ9s" ;
    const sender = "ben" ;
    // recipient = "bob" ; 
    const receiver = "bob"
    const [text, setText] = React.useState("");



    const socketUrl = `ws://localhost:8050/chat-server/v1/ws/chat?chatID=${chatID}&sessionID=${sessionID}&user=${sender}`;

    const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
    } = useWebSocket<Message>(socketUrl, {
      
      
    onOpen: () => console.log('client is connected to server'),

   
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => true,
    });


    // Log any message received
    React.useEffect(() => {
        if (lastJsonMessage !== null) {
        console.log('Received Object:', lastJsonMessage);
        console.log('Message' , lastJsonMessage.message) ;
        console.log('Sender' , lastJsonMessage.sender) ;
        console.log('Recipient' , lastJsonMessage.receiver) ;
        console.log('Time' , lastJsonMessage.time) ;
        }
    }, [lastJsonMessage]);


    // Function to send JSON message
    const handleSendMessage = () => {
      if (!text.trim()) return;

      const msg: SendMessage = {
        chatID,
        sender,
        receiver,
        message: text,
      };

      sendJsonMessage(msg);
      console.log("Sent:", msg);

      setText(""); // clear input
    };

    return (

    <div>

      <NavBar />
      <CustomBody>

        <HeadingBar title="Testing the websokcet"></HeadingBar>

          {/* Safely display JSON message */}
        {lastJsonMessage ? (
          <div className="p-4 bg-gray-100 rounded-xl shadow">
            <p>
              <strong>Message ID:</strong> {lastJsonMessage.messageid}
            </p>
            <p>
              <strong>Sender:</strong> {lastJsonMessage.sender}
            </p>
            <p>
              <strong>Receiver:</strong> {lastJsonMessage.receiver}
            </p>
            <p>
              <strong>Message:</strong> {lastJsonMessage.message}
            </p>
            <p>
              <strong>Time:</strong> {lastJsonMessage.time}
            </p>
          </div>
        ) : (
          <p>Waiting for message...</p>
        )}

        <SpaceBlock></SpaceBlock>


        {/* Input field for sending message */}
        <div className="flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Send
          </button>
        </div>

      </CustomBody>



      </div>

    )

}

