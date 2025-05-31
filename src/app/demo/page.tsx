 /*
The testiing page for the url fetch requets using frtehc api 
*/


//'use client';   // the use of client is with react componenent
import { NavBar, HeadingBar, CustomBody } from "front-end-component-kit";
import 'bootstrap/dist/css/bootstrap.min.css';
//import { useState, useEffect } from 'react';





async function submitData()

{
    const dummy_data = { url: "https://www.google.com/" }

    try  {

        const response = await fetch("http://localhost:5050/tu/submit" , 
        {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json',
            },
            
            body: JSON.stringify(dummy_data) ,

            
        });


    if (!response.ok) {

        throw new Error(`HTTP error status", ${response.ok}`)

    }

    const responseData = await response.json();

    console.log('Success:', responseData); 

    return responseData ; 

   }

    catch(error) {

      console.error('Error:', error);
   }
}







export default async function()
{
    const data = await fetch('https://api.vercel.app/blog') ; 
    const posts = await data.json() ; 
    const data_url = await submitData() ; 
    
    return (

        <div>
      
        <h1>Tiny URL: <a href={data_url}>{data_url}</a></h1>
      <ul>
        

        {posts.map((post : any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      </div>
    )
}








