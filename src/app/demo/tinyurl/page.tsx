/*
The file for the Tiny URL page genration 
*/


'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar, HeadingBar, CustomBody, SpaceBlock, Footer } from "front-end-component-kit";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import QRCode from "react-qr-code";
import { useState } from 'react';
import { easeInOut,  motion, AnimatePresence } from 'framer-motion';






async function submitTinyUrl(url: string) {
  try {

    // use http://localhost:5050/tu/submit for dev
    //use https://meabhi.me/tu/submit for prod
    const response = await fetch('https://meabhi.me/tu/api/v1/url/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    if (!response.ok) throw new Error('Failed to generate tiny URL');
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
  const [inputForm , setInputForm] = useState(true) ;
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [showResetButton, setShowResetButton] = useState(false);
  const [copyButtonDisabled, setCopyButtonDisabled] = useState(false);
  const [showAlert, setShowAlert] = useState(false);


  const smoothTransition = {
    duration: 0.5,
    ease: easeInOut,
  };


  const handleGenerateTinyUrl = async (e: any) => {
    e.preventDefault();
    if (!inputUrl || !/^https?:\/\//i.test(inputUrl)) {
      setError('Please enter a valid URL starting with http:// or https://');
      setTimeout(() => setError(""), 3000);
      return;
    }
    const result = await submitTinyUrl(inputUrl);
    if (result) {
      setTinyUrl(result);
      setInputUrl('');
      setShowResetButton(true);
      setCopyButtonDisabled(true);
      setInputForm(false);
      setSubmitButtonDisabled(false);
      setError('');
    }
  };

  const resetForm = () => {
    setInputUrl('');
    setTinyUrl('');
    setError('');
    setShowResetButton(false);
    setInputForm(true);
    setSubmitButtonDisabled(true);
    setCopyButtonDisabled(false);
    setShowAlert(false);
  };

  const copyUrl = () => {
    if (tinyUrl) {
      navigator.clipboard.writeText(tinyUrl).then(() => {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      });
    }
  };

  return (
    <div>
      <NavBar />
      <CustomBody>
        <HeadingBar title={"Enter URL to generate tinyurl"} />
        <SpaceBlock />

        <Row className='text-center'>   
          <Col></Col>
          <Col xs={12} md={4}>

          <AnimatePresence>
          { inputForm && (
            <Form onSubmit={handleGenerateTinyUrl}>
              <input
                type="text"
                name="url"
                className="me-2 custom-border form-control custom-placeholder"
                aria-label="Search"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="Enter the long URL"
              />
            </Form>

            )}
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
          {submitButtonDisabled && (
            <Row className='rounded background-color-body mt-3 p-2'>
              <Col className="text-center">
                <Button type="submit" className="button-custom-color m-1" onClick={handleGenerateTinyUrl}>
                  Generate Tiny URL
                </Button>
              </Col>
            </Row>
          )}
        </Container>

        <AnimatePresence>
          {tinyUrl && (
            <motion.div
              key="qr"
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={smoothTransition}
            >
              <HeadingBar title={tinyUrl} />
              <SpaceBlock />
              <QRCode
                title=''
                value={tinyUrl}
                size={200}
                style={{
                  border: "2px solid black",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  padding: "10px",
                  backgroundColor: "white",
                  borderRadius: "8px"
                }}
              />
            </motion.div>
          )} 


        </AnimatePresence>

        <Container>
          <AnimatePresence>
            {copyButtonDisabled && (
              <motion.div
                key="copy"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={smoothTransition}
              >
                <Row className='rounded background-color-body mt-3 p-2'>
                  <Col className="text-center">
                    <Button type="submit" className="button-custom-color m-1" onClick={copyUrl}>
                      Copy URL
                    </Button>
                  </Col>
                </Row>
              </motion.div>
            )}
          </AnimatePresence>


        </Container>

        <AnimatePresence>
          {showAlert && (
            <motion.div
              key="alert"
              className="mx-0 my-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={smoothTransition}
            >
              <HeadingBar title={"URL copied to clipboard!"} />
            </motion.div>
          )}
        </AnimatePresence>



        <AnimatePresence>
          {showResetButton && (
            <motion.div
              key="reset"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={smoothTransition}
            >
              <Container>
                <Row className='rounded background-color-body mt-3 p-2'>
                  <Col className="text-center">
                    <Button type="submit" className="button-custom-color m-1" onClick={resetForm}>
                      Create Another URL
                    </Button>
                  </Col>
                </Row>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>


        

        <SpaceBlock />
      </CustomBody>
      <Footer />
    </div>
  );
}
