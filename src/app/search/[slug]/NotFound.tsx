//'use client' ; 
import {ButtonBar , CardLists, AboutPic, CardsPaignation , NavBar, Footer,ArticleImage, SpaceBlock, SocialMediaLinks, Para, MarkDown, HeadingBar,CustomBody, More } from "front-end-component-kit";
import 'bootstrap/dist/css/bootstrap.min.css';
import {CardData, ArticleData, SectionData } from "../../types"; // Import types
import { Rowdies } from "next/font/google";
import { Row, Col } from "react-bootstrap";




//import { useRouter } from 'next/navigation';

const socialLinks = [
    "https://github.com/abhishekprakash256",
    "https://www.linkedin.com/in/abhishek256/",
    "",
    "https://leetcode.com/abhishekprakash256/",
    "https://gitlab.com/abhishekprakash256",
    "https://www.kaggle.com/abhishek256",
    "",
  ];
  
  const resume_link : string = "Resume.pdf";



  async function getPaginationData(): Promise<CardData[]> {
    const res = await fetch("http://127.0.0.1:5000/section/tech", {
      cache: "no-store",
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch pagination data");
    }
  
    return res.json();
  }




  export default async function NotFound( ) {

    const paginationData = await getPaginationData();
  
      return (
        <div>
            <Row>
                <Col className="text-center">
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                    <h1 className="text-6xl font-bold text-red-500 animate-bounce">404</h1>
                    <p className="text-lg text-gray-700 mt-4">Oops! The page you are looking for does not exist.</p>

                </div>
        </Col>
        </Row>
            <HeadingBar title={"Explore More"}/>
                    <CardsPaignation cardData={paginationData} /> {/* paginationData is of type CardData[] */}
            
                    <SocialMediaLinks 
                      github_link = {socialLinks[0]}
                      linkedin_link= {socialLinks[1]}
                      twitter_link={socialLinks[2]}
                      leetcode_link={socialLinks[3]}
                      gitlab_link={socialLinks[4]}
                      kaggle_link={socialLinks[5]}
                      medium_link= {socialLinks[6]}
                    />
            
            
                   <ButtonBar button_text = "Download Resume" link= {resume_link} />

                   <SpaceBlock />

        </div>
      );
  }
  
