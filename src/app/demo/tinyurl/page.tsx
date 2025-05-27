/*
The page is used †o render the tinyurl page, which is a simple page that redirects to the tinyurl.com website.
*/


//'use client';
import {ButtonBar ,  AboutPic, CardsPaignation , NavBar, Footer,ArticleImage, SpaceBlock, SocialMediaLinks, Para, MarkDown, HeadingBar,CustomBody, More } from "front-end-component-kit";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Col, Row} from 'react-bootstrap';
import '../../styles/styles.css';
import {CardData, ArticleData, SectionData } from "../../types"; // Import types
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

const resume_link : string = "/files/resume.pdf";



// This is an async function inside the component file, which is fine in the app directory
async function getPaginationData(): Promise<CardData[]> {
    const res = await fetch(`http://127.0.0.1:5001/blog/section/explore`, {
      cache: "no-store",
    });
  
    if (!res.ok) {
      throw new Error("Failed to fetch pagination data");
    }
  
    const json = await res.json();
  
    //  Only return the `data` field
    return json.data || [];  
}




// make the data transfer to the backend and get the url
function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const url = formData.get("url") as string;

    //console.log("Submitted URL:", url);
    // Here you can add the logic to send the URL to your backend

    fetch('http://localhost:5050/tu/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }
    )
    .then(data => {
        console.log('Success:', data);
        // Handle success, e.g., show a success message or redirect
    }
    )
    .catch((error) => {
        console.error('Error:', error);
        // Handle error, e.g., show an error message
    }
    );

}







export default async function tinyurl() {
    let paginationData: CardData[] = [];

try {
    paginationData = await getPaginationData();

} catch (error) {
    console.error("Error fetching data:", error);
}


return (
    
<div>

<NavBar></NavBar>

<CustomBody>

        <HeadingBar title={"Tinyurl sevice"}/>

        <HeadingBar title={"Enter the url to generate tinyurl"}/>


            <HeadingBar title={"Explore"}/>


                <ButtonBar button_text = "Submit" link= {resume_link} />

                <CardsPaignation cardData={paginationData} />


                <SocialMediaLinks 
                github_link = {socialLinks[0] }
                linkedin_link= {socialLinks[1]}
                twitter_link=""
                leetcode_link={socialLinks[3]}
                gitlab_link={socialLinks[4]}  
                kaggle_link={socialLinks[5]}
                medium_link=""
                />

        <ButtonBar button_text = "Download Resume" link= {resume_link} />

        <SpaceBlock></SpaceBlock>  { /*SpaceBlock component to create a space between the social media links and the footer */ }

</CustomBody>

<Footer></Footer>

</div>


  );
}