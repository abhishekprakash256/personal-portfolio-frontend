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



export default function TestChatService() {

    const sessionID = "b14d0fe2-7dc7-4544-afd2-d292f48db712" ;
    const chatID = "qQyvvJ9s" ;
    const sender = "ben" ;
    const recipient = "ben" ; 



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

    return (

    <div>

      <NavBar />
      <CustomBody>

        <HeadingBar title="Testing the websokcet"></HeadingBar>

        <SpaceBlock></SpaceBlock>
      </CustomBody>



      </div>

    )

}

