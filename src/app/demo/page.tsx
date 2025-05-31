 /*
The testiing page for the url fetch requets using frtehc api 
*/


'use client';   // the use of client is with react componenent
import { NavBar, HeadingBar, CustomBody, ButtonBar } from "front-end-component-kit";
import 'bootstrap/dist/css/bootstrap.min.css';


import { useState} from 'react';




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

      return null
   }
}







export default function testurl()
{
    //const [posts, setPosts] = useState([])
    const [tinyUrl, setTinyUrl] = useState('')

  // Fetch blog posts on component mount


    // Handle tiny URL generation on button click
    const handleGenerateTinyUrl = async () => {
        const data = await submitData()
        if (data && data.tinyurl) {
          setTinyUrl(data.tinyurl)
        }
      }

    
    
    return (

        <div>

        <button onClick={handleGenerateTinyUrl}>Generate Tiny URL</button>
      {tinyUrl && <h1>Tiny URL: {tinyUrl}</h1>}

      </div>
    )
}








