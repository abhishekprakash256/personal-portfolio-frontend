import { AboutPic, CardsPaignation , NavBar, Footer,ArticleImage, SpaceBlock, SocialMediaLinks, Para, MarkDown, HeadingBar,CustomBody, More } from "front-end-component-kit";

import {CardLists} from "front-end-component-kit";



import 'bootstrap/dist/css/bootstrap.min.css';


const more_link : string = "www.google.com";
const profile_pic : string = "./images/profile-pic.jpg";
const description : string = "I am Abhishek Prakash (Abhi), a professional with over two years of industry experience and a master's degree in computer science from <a href='https://www.fsu.edu' target='_blank' style='color: #CEB888; text-decoration: none;' onmouseover='this.style.color = \"#782F40\"' onmouseout='this.style.color=\"#CEB888\"'>Florida State University</a>. My expertise lies in various programming languages, with a strong emphasis on Python. I specialize in machine learning, automation, software development, and the design and deployment of cloud infrastructure as code. I am proficient in popular machine learning and deep learning frameworks such as PyTorch, TensorFlow, scikit-learn, and pandas. My comprehensive background in computer science, including an in-depth understanding of data structures and algorithms, underpins my professional journey. Throughout my career, I have been actively involved in a wide range of software projects, from developing small-scale tools to orchestrating large-scale production systems. My experience extends to website development, including front-end, back-end, and database integration, ensuring the robustness and efficiency of solutions through unit testing, data visualization, and data engineering.In addition to my core skills, I have specialized in Machine Learning Operations (MLOps), managing CI/CD pipelines and Docker images to ensure the seamless integration and deployment of machine learning models. I am adept at using automation tools like Ansible and Terraform, streamlining and automating MLOps processes to enhance the overall efficiency and reliability of machine learning workflows.";
const mark_down_data : string  = " ## Heading\n The classic example that we can understand dynamic programming with is the Fibonacci series, which can be solved both recursively and using dynamic programming.\n ### Recursive Approach \n ```python \ndef fibbo(nums):\n      if nums <= 1:\n        return 1\n      return fibbo(n-1) + fibbo(n-2)\n ```\n\n### Dynamic Programming with Memoization\n ```python\ndef fibonacci(n, memo={}):\n       if n in memo:\n         return memo[n]\n       if n <= 1:\n         return n\n       else:\n          memo[n] = fibonacci(n-1, memo) + fibonacci(n-2, memo)\n       return memo[n]\n ```\n\n### Dynamic Programming with Tabulation\n ```python\ndef fibonacci(n):\n        if n <= 1:\n            return n\n   \n        fib_table = [0] * (n + 1)\n        fib_table[1] = 1\n\n        for i in range(2, n + 1):\n           fib_table[i] = fib_table[i - 1] + fib_table[i - 2]\n\n        return fib_table[n]\n"
const socialLinks = [
  "https://github.com/abhishekprakash256",
  "https://www.linkedin.com/in/abhishek256/",
  "https://twitter.com/yourprofile",
  "https://leetcode.com/abhishekprakash256/",
  "https://gitlab.com/abhishekprakash256",
  "https://www.kaggle.com/abhishek256",
  "https://medium.com/@yourprofile",
];






export default function about() {
return (
  
<div>

<NavBar></NavBar>

<CustomBody>

<HeadingBar title={"Section Page"}/> 


      <ArticleImage image_link={profile_pic} />

      <Para description={description} />

      <MarkDown mark_down_data={mark_down_data} />


<SocialMediaLinks 
github_link = {socialLinks[0]}
linkedin_link= {socialLinks[1]}
twitter_link=""
leetcode_link={socialLinks[3]}
gitlab_link={socialLinks[4]}
kaggle_link={socialLinks[5]}
medium_link="" />  { /*SocialMediaLinks component to display social media links */ }




<SpaceBlock></SpaceBlock>  { /*SpaceBlock component to create a space between the social media links and the footer */ }

</CustomBody>

<Footer></Footer>

</div>
);
}