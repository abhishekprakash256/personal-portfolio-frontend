
//'use client';
import {ButtonBar , CardLists, AboutPic, CardsPaignation , NavBar, Footer,ArticleImage, SpaceBlock, SocialMediaLinks, Para, MarkDown, HeadingBar,CustomBody, More } from "front-end-component-kit";
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
    card_title: "Card Title 1",
    card_para: "System design is a multidisciplinary field that encompasses various aspects of designing distributed systems. ",
    img_src: "./images/cards.jpg",  /* the image file is in the public folder */
    card_url: "https://example.com/card1", 
  },
  {
    card_title: "Card Title 2",
    card_para: "System design is a multidisciplinary field that encompasses various aspects of designing distributed systems.",
    img_src: "section/project/federated-learning/federated-learning-flow.png", /* the image file is in the public folder */
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
github_link = {socialLinks[0]}
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
github_link = {socialLinks[0]}
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