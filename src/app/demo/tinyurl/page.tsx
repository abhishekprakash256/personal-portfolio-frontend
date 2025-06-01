 /*
The testiing page for the url fetch requets using frtehc api 
*/


'use client';   // the use of client is with react componenent
import { NavBar, HeadingBar, CustomBody, ButtonBar , SpaceBlock, Footer } from "front-end-component-kit";
import { Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';



import { useState } from 'react'

// 🔹 Decoupled function for submitting URL to backend
async function submitTinyUrl(url : string) {
  try {
    const response = await fetch('http://localhost:5050/tu/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate tiny URL');
    }

    const data = await response.json();
    return data.tinyurl;

  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}



export default function TinyUrlGenerator() {
  const [inputUrl, setInputUrl] = useState('');
  const [tinyUrl, setTinyUrl] = useState('');

  const handleGenerateTinyUrl = async (e : any) => {
    e.preventDefault();
    const result = await submitTinyUrl(inputUrl);
    if (result) {
      setTinyUrl(result);
    }
  };

  return (
    
    <div>
    <NavBar></NavBar>

    <CustomBody>

    <HeadingBar title={"Enter the url to generate tinyurl"}/>

    <SpaceBlock></SpaceBlock> 

    <Row className='text-center'>

    <Col>

    </Col>

    <Col >

      <form onSubmit={handleGenerateTinyUrl}>
        <input
          type="text"
          name="url"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="Enter a long URL"
        />
       
      </form>

      <SpaceBlock></SpaceBlock> 

      <button type="submit">Generate Tiny URL</button>
      {tinyUrl && <h1>Tiny URL: {tinyUrl}</h1>}

      </Col>

      <Col>

      </Col>

      </Row>



      <SpaceBlock></SpaceBlock> 

      </CustomBody>

      <Footer></Footer>
    </div>
  );
}






