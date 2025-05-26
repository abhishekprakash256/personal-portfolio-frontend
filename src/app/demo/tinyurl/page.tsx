/*
The page is used †o render the tinyurl page, which is a simple page that redirects to the tinyurl.com website.
*/


//'use client';
import {ButtonBar ,  AboutPic, CardsPaignation , NavBar, Footer,ArticleImage, SpaceBlock, SocialMediaLinks, Para, MarkDown, HeadingBar,CustomBody, More } from "front-end-component-kit";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Col, Row} from 'react-bootstrap';
import '../../styles/styles.css';
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


export default function tinyurl() {

 // const router = useRouter();

return (
    
<div>

<NavBar></NavBar>

<CustomBody>

<HeadingBar title={"Tinyurl sevice"}/>

<HeadingBar title={"Tech"}/> 


<More more_link= "/blog/section/tech" /> 

<ButtonBar button_text = "Submit" link= {resume_link} />


<ButtonBar button_text = "Download Resume" link= {resume_link} />

<SocialMediaLinks 
github_link = {socialLinks[0] }
//github_icon =  "icons/github-color.svg"
//github_icon=  {"/icons/github-color.svg" }
//linkedin_icon= {"/icons/linkedin-color.svg" }
//gitlab_icon={"/icons/gitlab-color.svg" }
//leetcode_icon="/icons/leetcode-color.svg"
//kaggle_icon="/icons/kaggle-color.svg"
//medium_icon=""
//twitter_icon=""
linkedin_link= {socialLinks[1]}
twitter_link=""
leetcode_link={socialLinks[3]}
gitlab_link={socialLinks[4]}  
kaggle_link={socialLinks[5]}
medium_link=""
/>


<SpaceBlock></SpaceBlock>  { /*SpaceBlock component to create a space between the social media links and the footer */ }

</CustomBody>

<Footer></Footer>

</div>


  );
}