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
  const [error, setError] = useState('');

  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  // State to manage the visibility of the reset button
  const [showResetButton, setShowResetButton] = useState(false);

  const [copyButtonDisabled, setCopyButtonDisabled] = useState(false);

  const [showAlert, setShowAlert] = useState(false);



  const handleGenerateTinyUrl = async (e : any) => {
    e.preventDefault();

    // validate the input URL for HTTP or HTTPS
    if (!inputUrl || !/^https?:\/\//i.test(inputUrl)) {
      //alert('Please enter a valid URL starting with http:// or https://');
      setError('Please enter a valid URL starting with http:// or https://');
      return;
    }

    const result = await submitTinyUrl(inputUrl);
    if (result) {
      setTinyUrl(result);
      setInputUrl('');  // Clear the input field after successful submission
      setShowResetButton(true);  // Show the reset button
      setCopyButtonDisabled(true);  // Disable the copy button
      setSubmitButtonDisabled(false);  // Disable the submit button
      setError('');  // Clear any previous error
      
    }
  };

  // Function to reset the form
  // and clear the tiny URL
  // and error message
  const resetForm = () => {
    setInputUrl('');
    setTinyUrl('');
    setError('');
    setShowResetButton(false);  // Hide the reset button
    setSubmitButtonDisabled(true);  // Enable the submit button
    setCopyButtonDisabled(false);  // Enable the copy button
    setShowAlert(false);  // Hide the alert
  };

const copyUrl = () => {
  if (tinyUrl) {
    navigator.clipboard.writeText(tinyUrl)
      .then(() => {
        setShowAlert(true);
        //setTimeout(() => setShowAlert(false), 2000); // Auto-hide after 2s
      });
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


       {error && <p className="text-danger bold">{error}</p>}

    
      </Col>

      <Col>

      </Col>

      </Row >

      </Container>

      <Container>


      {submitButtonDisabled && (
      <Row className='rounded background-color-body mt-3 p-2'>
      <Col className="text-center">

      <Button type="submit" className="button-custom-color m-1" onClick={handleGenerateTinyUrl}>Generate Tiny URL</Button>

    
      </Col>

      </Row>

      )}

      </Container>


      {tinyUrl 

      && (

       <HeadingBar title={tinyUrl} />
      
      
      )}

      <Container>


    { copyButtonDisabled && (
      <Row className='rounded background-color-body mt-3 p-2'>
      <Col className="text-center">

    
      <Button type="submit" className="button-custom-color m-1" onClick={copyUrl}>Copy URL</Button> 
      
    
      </Col>

      </Row> 
    )}

    </Container>

      {showAlert && (
    <div className="mx-0 my-2">
      <HeadingBar title={"URL copied to clipboard!"} />
    </div>

    )}



      <Container>
     { showResetButton && (
      <Row className='rounded background-color-body mt-3 p-2'>
      <Col className="text-center">

    
      <Button type="submit" className="button-custom-color m-1" onClick={resetForm}>Create Another URL</Button> 
      
    
      </Col>

      </Row> 
    )}
    

      </Container>



      <SpaceBlock></SpaceBlock> 

      </CustomBody>

      <Footer></Footer>
    </div>
  );
}






