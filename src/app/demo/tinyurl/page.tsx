 /*
The testiing page for the url fetch requets using frtehc api 
*/


'use client';   // the use of client is with react componenent
import 'bootstrap/dist/css/bootstrap.min.css' ;
import { NavBar, HeadingBar, CustomBody, ButtonBar , SpaceBlock, Footer } from "front-end-component-kit";
import { Container, Row, Col, Button, Form } from "react-bootstrap" ;
//import "./tinyurl.css";
//import "./styles.css";



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

    <Container>

    <Row className='text-center'>

    <Col>

    </Col>

    <Col >

      <Form onSubmit={handleGenerateTinyUrl}>
        <input
          type="text"
          name="url"
          className="me-2 custom-border form-control custom-placeholder"
          aria-label="Search"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="Enter a long URL"
        />
       
      </Form>


    
      </Col>

      <Col>

      </Col>

      </Row >

      </Container>

      <Container>

      <Row className='rounded background-color-body mt-3 p-2'>
      <Col className="text-center">

      <Button type="submit" className="button-custom-color m-1" onClick={handleGenerateTinyUrl}>Generate Tiny URL</Button>


      </Col>

      </Row>
      {tinyUrl && <h1>Tiny URL: {tinyUrl}</h1>}

      </Container>



      <SpaceBlock></SpaceBlock> 

      </CustomBody>

      <Footer></Footer>
    </div>
  );
}






