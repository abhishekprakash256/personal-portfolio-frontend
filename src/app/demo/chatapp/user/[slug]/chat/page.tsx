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




export default function Page() {
  return <h1>Hello Next.js!</h1>
}