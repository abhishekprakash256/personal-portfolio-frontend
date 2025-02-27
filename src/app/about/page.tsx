/*

The About Page for Perdosnal data
*/

import {CardLists, AboutPic, CardsPaignation , NavBar, Footer,ArticleImage, SpaceBlock, SocialMediaLinks, Para, MarkDown, HeadingBar,CustomBody, More } from "front-end-component-kit";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Col, Row} from 'react-bootstrap';
import '../styles/styles.css';

import Link from "next/link";




// all the data is hard coded for static pages

const more_link : string = "www.google.com";
const profile_pic : string = "./images/profile-pic.jpg";
const skills_data : string = "#### **Programming Languages**: Python, JavaScript, TypeScript, Shell Scripting  \n#### **Web Development**: React, Next.js, Node.js, Flask, Bootstrap, REST APIs, NGINX  \n#### **Cloud & DevOps:** AWS, Docker, GitHub Actions, GitLab CI/CD, Ansible  \n#### **Databases:** PostgreSQL, MongoDB, Redis, SQL, SQLite  \n#### **Machine Learning & AI:** PyTorch, TensorFlow, Pandas, Scikit-learn, Deep Learning, Reinforcement Learning";
const experience_data1 : string = "#### **Software Developer | Pro Playgrounds**  \n - ##### **Led development of modular, responsive UI components with HTML, CSS, and JavaScript, increasing monthly traffic by 37%.**  \n - ##### **Engineered a dynamic product filtering system, improving catalog navigation speed by 40%**.  \n - ##### **Automated end-to-end testing and deployment pipelines using GitLab CI/CD, Selenium, Ansible, and Python, optimizing backend processes and checkout experience.**";
const experience_data2: string = "#### **Full Stack Developer | Self Employed**  \n - ##### **Portfolio Migration: Upgrading to React, Next.js, and NestJS (TS) for scalability & modular architecture. Integrating PostgreSQL & MongoDB for structured & unstructured data.**  \n - ##### **Refactored monolithic architecture into a hybrid microservices model, improving scalability and maintainability.**  \n - ##### **Chat App: Built a real-time messaging app with React, Flask, MongoDB, Redis, and WebSockets.**  \n   - ##### Implemented JWT authentication, reducing unauthorized access by 30%.  \n   - ##### Designed a responsive and intuitive UI with Bootstrap, ensuring optimal performance and a seamless experience.  \n - ##### **Tiny URL Generator: Developed a URL-shortening service with React, Flask & Redis, reducing query time by 25%.**  \n   - ##### Incorporated collision avoidance and exposed a REST API for URL creation and redirection.  \n - ##### **Portfolio Website: Developed both front-end and back-end and deployed a personal portfolio site on AWS EC2, automated with CI/CD pipelines, NGINX, and Ansible, achieving 99.9% uptime.** " ;
const experience_data3 : string = "#### **Software Developer and DevOps | Cognitive Geo Interpretation Inc**  \n - ##### **Designed & implemented a GitLab CI/CD pipeline, automating AWS EC2 provisioning for a microservices architecture.**  \n - ##### **Integrated Ansible for automated configuration management, ensuring consistency and reducing developer setup time by 55%.**  \n - ##### **Increased test coverage from 63% to 78% by using Pytest & unit testing.** " ;
const experience_data4 : string = "#### **Research Assistant | Florida State University**  \n - ##### **Developed Federated Learning (Fed-Avg) models on MNIST dataset, achieving 94% accuracy using PyTorch.**  \n - ##### **Built a Double Deep Q-Learning model for edge computing, optimizing task off-loading by 30%, using PyTorch.**  \n - ##### **Developed a backend with Python Flask for efficient CRUD operations on an SQLite database, populating it with 2,000 entries and optimizing query performance by 20%.**" ;
const about_me_desc : string = "I am Abhishek Prakash (Abhi), a professional with over two years of industry experience and a master's degree in computer science from <a href='https://www.fsu.edu' target='_blank' style='color: #CEB888; text-decoration: none;' onmouseover='this.style.color = \"#782F40\"' onmouseout='this.style.color=\"#CEB888\"'>Florida State University</a>. My expertise lies in various programming languages, with a strong emphasis on Python. I specialize in machine learning, automation, software development, and the design and deployment of cloud infrastructure as code. I am proficient in popular machine learning and deep learning frameworks such as PyTorch, TensorFlow, scikit-learn, and pandas. My comprehensive background in computer science, including an in-depth understanding of data structures and algorithms, underpins my professional journey. Throughout my career, I have been actively involved in a wide range of software projects, from developing small-scale tools to orchestrating large-scale production systems. My experience extends to website development, including front-end, back-end, and database integration, ensuring the robustness and efficiency of solutions through unit testing, data visualization, and data engineering.In addition to my core skills, I have specialized in Machine Learning Operations (MLOps), managing CI/CD pipelines and Docker images to ensure the seamless integration and deployment of machine learning models. I am adept at using automation tools like Ansible and Terraform, streamlining and automating MLOps processes to enhance the overall efficiency and reliability of machine learning workflows.";
const education_data_fsu : string = "#### **Master of Science in Computer Science | Florida State University**  \n - ##### **Courses:** Deep Reinforcement Learning, Data and Computer Communication, Artificial Intelligence, Advanced Algorithms, Network System Admin, Intro to Data Science, Database management systems";
const education_data_bit : string = "#### **Bachelors of Science in Computer Science | B.I.T** \n - ##### **Courses:** Artifical Intelligence, Logic Building in Cpp, Data Base , Computer Networking , Web Technologies  "
const socialLinks = [
  "https://github.com/abhishekprakash256",
  "https://www.linkedin.com/in/abhishek256/",
  "",
  "https://leetcode.com/abhishekprakash256/",
  "https://gitlab.com/abhishekprakash256",
  "https://www.kaggle.com/abhishek256",
  "",
];

const tech_data = [
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
  }
];

const project_data = [
  {
    card_title: "Card Title 1",
    card_para: "System design is a multidisciplinary field that encompasses various aspects of designing distributed systems. ",
    img_src: "./images/chat-app-icon.png",  /* the image file is in the public folder */
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


const life_data = [
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
    img_src: "./images/chat-app-icon.png",  /* the image file is in the public folder */
    card_url: "https://example.com/card3",
  }
];











export default function about() {

return (
    
<div>

<NavBar></NavBar>

<CustomBody>

<HeadingBar title={"About Me"}/> 

<AboutPic image_link={profile_pic}></AboutPic>

<SocialMediaLinks 
  github_link = {socialLinks[0]}
  linkedin_link= {socialLinks[1]}
  twitter_link={socialLinks[2]}
  leetcode_link={socialLinks[3]}
  gitlab_link={socialLinks[4]}
  kaggle_link={socialLinks[5]}
  medium_link= {socialLinks[6]}
/>

<Para description={ about_me_desc }/>

<HeadingBar title={"Skills"}/>

<MarkDown mark_down_data={skills_data}/>

<HeadingBar title={"Experience"}/>

<MarkDown mark_down_data={experience_data1}/>

<MarkDown mark_down_data={experience_data2}/>

<MarkDown mark_down_data={experience_data3}/>

<MarkDown mark_down_data={experience_data4}/>

<HeadingBar title={"Education"}/> 

<MarkDown mark_down_data={education_data_fsu}/>

<MarkDown mark_down_data={education_data_bit}/>

<HeadingBar title={"Tech"}/> 

<CardsPaignation cardData={tech_data} />

<More more_link= "tech" /> 

<HeadingBar title={"Projects"}/> 

<CardsPaignation cardData={project_data} />

<More more_link= "project" /> 

<HeadingBar title={"Life"}/> 

<CardsPaignation cardData={life_data} />

<More more_link= "life"/> 

<Row className="justify-content-md-center mt-2">

<Col className="text-center">

<a href="/resume.pdf" download>
  <Button className="resume-button">Download Resume</Button>
</a>

</Col>

</Row>

<SpaceBlock></SpaceBlock>  { /*SpaceBlock component to create a space between the social media links and the footer */ }

</CustomBody>

<Footer></Footer>

</div>


  );
}