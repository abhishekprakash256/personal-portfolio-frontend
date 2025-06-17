
//'use client';
import {ButtonBar , AboutPic, CardsPaignation , NavBar, Footer,ArticleImage, SpaceBlock, SocialMediaLinks, Para, MarkDown, HeadingBar,CustomBody, More } from "front-end-component-kit";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css';
import {Button, Col, Row} from 'react-bootstrap';
//import { useRouter } from 'next/navigation';


// app/page.tsx (Main Page)
import Link from 'next/link';




const socialLinks = [
  "https://github.com/abhishekprakash256",
  "https://www.linkedin.com/in/abhishek256/",
  "https://twitter.com/yourprofile",
  "https://leetcode.com/abhishekprakash256/",
  "https://gitlab.com/abhishekprakash256",
  "https://www.kaggle.com/abhishek256",
  "https://medium.com/@yourprofile",  
];

const description : string = "I am Abhishek Prakash (Abhi), a professional with over two years of industry experience and a master's degree in computer science from <a href='https://www.fsu.edu' target='_blank' style='color: #CEB888; text-decoration: none;' onmouseover='this.style.color = \"#782F40\"' onmouseout='this.style.color=\"#CEB888\"'>Florida State University</a>. My expertise lies in various programming languages, with a strong emphasis on Python. I specialize in machine learning, automation, software development, and the design and deployment of cloud infrastructure as code. I am proficient in popular machine learning and deep learning frameworks such as PyTorch, TensorFlow, scikit-learn, and pandas. My comprehensive background in computer science, including an in-depth understanding of data structures and algorithms, underpins my professional journey. Throughout my career, I have been actively involved in a wide range of software projects, from developing small-scale tools to orchestrating large-scale production systems. My experience extends to website development, including front-end, back-end, and database integration, ensuring the robustness and efficiency of solutions through unit testing, data visualization, and data engineering.In addition to my core skills, I have specialized in Machine Learning Operations (MLOps), managing CI/CD pipelines and Docker images to ensure the seamless integration and deployment of machine learning models. I am adept at using automation tools like Ansible and Terraform, streamlining and automating MLOps processes to enhance the overall efficiency and reliability of machine learning workflows.";
const profile_pic : string = "./images/profile-pic/profile-pic.jpg";
const resume_link : string = "/files/resume.pdf";




const Paignation_data = [
  {
    card_title: "Tiny URL",  
    card_para: "The Tiny-URL Generator is a URL shortening service developed as a web application using the Flask framework. This project aims to simplify the process of sharing long URLs by generating shorter, more manageable links. The backend leverages Redis for efficient data storage and retrieval, ensuring quick access and collision-free management of shortened URLs ",
    img_src: "https://meabhi.me/static/blog/section/project/tinyurl/tinyurl-icon.png",  /* the image file is in the public folder */
    card_url: "/blog/section/project/article/tinyurl", 
  },
  {
    card_title: "Federated Learning",
    card_para: "Federated Learning is a decentralized learning paradigm where models are trained on various devices, and their parameters are combined to create a global model. Initially introduced by Google in 2017, it allows for effective model training without transferring sensitive data from devices",
    img_src: "https://meabhi.me/static/blog/section/project/federated-learning/federated-learning-flow.png", /* the image file is in the public folder */
    card_url: "/blog/section/project/article/federated-learning",
  },
  {
    card_title: "Patching Unpatching",
    card_para: "Patching and Unpatching are a set of tools that are used for image processing. The patching tool is used to cut small square sections of the input image known as patches. The unpatching tool takes those patches and combines them back together to make the final image.",
    img_src: "https://meabhi.me/static/blog/section/project/patching-unpatching/patching.png",  /* the image file is in the public folder */
    card_url: "/blog/section/project/article/patching-unpatching",
  },

  {
    card_title: "Academic Website",
    card_para: "Static Academic website made to showcase the profile and works, made using HTML, CSS, Media Query (for the responsive optimization for mobile, tablet and different size devices). The website is consist of 8 pages that shows the different aspects from main page to contact page. Google Maps API is used to display the map. CSS flex boxes are also used for more size responsive optmizatrions",
    img_src: "https://meabhi.me/static/blog/section/project/academic-website/main_page.png",  /* the image file is in the public folder */
    card_url: "/blog/section/project/article/academic-website", 
  },
  {
    card_title: "Neural Style Transfer",
    card_para: "The neural style transfer is implemented as per paper that came in 2015 title A Neural Algorithm of Artistic Style. The paper talks about combing the two images to create a new style image by using the style and feature transfer technique from both the images and tries to minimize the loss of the generated Gaussian image by using the custom loss function that can be tweaked by using the hyper-parameter alpha and beta. The implementation is done using pytorch",
    img_src: "https://meabhi.me/static/blog/section/project/neural-transfer/image_1.png", /* the image file is in the public folder */
    card_url: "/blog/section/project/article/neural-transfer",
  },
  {
    card_title: "Card Title 3",
    card_para: "System design is a multidisciplinary field that encompasses various aspects of designing distributed systems.",
    img_src: "./images/image_1.png",  /* the image file is in the public folder */
    card_url: "https://example.com/card3",
  },
  {
    card_title: "Card Title 1",
    card_para: "System design is a multidisciplinary field that encompasses various aspects of designing distributed systems. ",
    img_src: "section/project/chat-app/chat-app-icon.png",  /* the image file is in the public folder */
    card_url: "https://example.com/card1", 
  },
  {
    card_title: "Card Title 2",
    card_para: "System design is a multidisciplinary field that encompasses various aspects of designing distributed systems.",
    img_src: "./images/federated-learning-flow.png", /* the image file is in the public folder */
    card_url: "https://example.com/card2",
  },
  {
    card_title: "Card Title 3",
    card_para: "System design is a multidisciplinary field that encompasses various aspects of designing distributed systems.",
    img_src: "./images/image_1.png",  /* the image file is in the public folder */
    card_url: "https://example.com/card3",
  },
  {
    card_title: "Card Title 1",
    card_para: "System design is a multidisciplinary field that encompasses various aspects of designing distributed systems. ",
    img_src: "./images/cards.jpg",  /* the image file is in the public folder */
    card_url: "https://example.com/card1", 
  },
  {
    card_title: "Card Title 2",
    card_para: "System design is a multidisciplinary field that encompasses various aspects of designing distributed systems.",
    img_src: "./images/federated-learning-flow.png", /* the image file is in the public folder */
    card_url: "https://example.com/card2",
  },
  {
    card_title: "Card Title 3",
    card_para: "System design is a multidisciplinary field that encompasses various aspects of designing distributed systems.",
    img_src: "./images/image_1.png",  /* the image file is in the public folder */
    card_url: "https://example.com/card3",
  },
  {
    card_title: "Card Title 1",
    card_para: "System design is a multidisciplinary field that encompasses various aspects of designing distributed systems. ",
    img_src: "section/project/chat-app/chat-app-icon.png",  /* the image file is in the public folder */
    card_url: "https://example.com/card1", 
  },
  {
    card_title: "Card Title 2",
    card_para: "System design is a multidisciplinary field that encompasses various aspects of designing distributed systems.",
    img_src: "./images/federated-learning-flow.png", /* the image file is in the public folder */
    card_url: "https://example.com/card2",
  },
  {
    card_title: "Card Title 3",
    card_para: "System design is a multidisciplinary field that encompasses various aspects of designing distributed systems.",
    img_src: "./images/image_1.png",  /* the image file is in the public folder */
    card_url: "https://example.com/card3",
  }

];

// test link  -- working
//const test_img_link : string =  "section/project/chat-app/chat-app-icon.png"



export default function Home() {
 // const router = useRouter();
  return ( 
    <div>

<NavBar ></NavBar>

<CustomBody>


<HeadingBar title={"Abhi's Microcosm"}/> 

<AboutPic image_link={profile_pic} />

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


{/* the test code
<img src = {`/images/${test_img_link}`} />  */}

<Para description={ description }/>

<HeadingBar title={"Features"}/> 

<CardsPaignation cardData={Paignation_data} />

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

<ButtonBar button_text = "Download Resume" link= {resume_link} />


<SpaceBlock></SpaceBlock>  { /*SpaceBlock component to create a space between the social media links and the footer */ }

</CustomBody>

<Footer></Footer>

</div>
);
}