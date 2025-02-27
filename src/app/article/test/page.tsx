

import {ButtonBar , CardLists, AboutPic, CardsPaignation , NavBar, Footer,ArticleImage, SpaceBlock, SocialMediaLinks, Para, MarkDown, HeadingBar,CustomBody, More } from "front-end-component-kit";
import 'bootstrap/dist/css/bootstrap.min.css';
import {CardData, ArticleData, SectionData } from "../../types"; // Import types

import { GetServerSideProps } from "next";


const socialLinks = [
  "https://github.com/abhishekprakash256",
  "https://www.linkedin.com/in/abhishek256/",
  "",
  "https://leetcode.com/abhishekprakash256/",
  "https://gitlab.com/abhishekprakash256",
  "https://www.kaggle.com/abhishek256",
  "",
];

const resume_link : string = "../../public/Resume.pdf"



//data mocking
const mockArticleData : ArticleData  = 
  
{
      "article_name": "patching-unpatching",
      "section_name":"project", 
       "id_number" : 1,

      "article_data": [
          
          {"title": "Patching Unpatching Open Source tool", "image_src": "../images/federated-learning-flow.png", "article_para": "", "markdown_data": ""},
          {"title": "Project Description", "image_src": "", "article_para": "", "markdown_data": ""},
          {"title": "", "image_src": "", "article_para": "Patching and Unpatching are a set of tools that are used for image processing. The patching tool is used to cut small square sections of the input image known as patches. The unpatching tool takes those patches and combines them back together to make the final image.", "markdown_data": ""},
          {"title": "", "image_src": "", "article_para": "", "markdown_data": "### Patching Tool"},
          {"title": "", "image_src": "", "article_para": "Patching is the initial step in the image processing pipeline, responsible for dividing the input image into smaller, manageable sections called patches. These patches are typically square-shaped and can vary in size based on user-defined parameters such as patch size and padding.", "markdown_data": ""},
          {"title": "", "image_src": "", "article_para": "", "markdown_data": "**Key Features:**\n1. **Segmentation:** The patching tool effectively segments the input image, breaking it down into discrete patches. This segmentation enables localized analysis and processing, facilitating tasks such as feature extraction and object detection.\n2. **Padding Options:** To ensure consistency and accuracy during patch extraction, the patching tool offers padding options such as reflective padding. This padding technique extends the borders of the image by replicating pixel values, thereby maintaining continuity across patch boundaries.\n3. **Support for Multiple Image Types:** Whether dealing with grayscale (single-channel) or color (three-channel) images, the patching tool accommodates diverse image types. This flexibility extends its utility across various applications, from medical imaging to satellite imagery analysis.\n4. **Parameter Customization:** Users have the flexibility to customize parameters such as patch size and padding width to suit specific requirements. Fine-tuning these parameters enables optimization for different image characteristics and processing objectives."},
          {"title": "", "image_src": "", "article_para": "", "markdown_data": "### Unpatching Tool"},
          {"title": "", "image_src": "../images/image_1.png", "article_para": "", "markdown_data": ""},
          {"title": "", "image_src": "", "article_para": "Following patching, the Unpatching tool plays a crucial role in reconstructing the original or modified image from the segmented patches. It operates in conjunction with Patching, leveraging the extracted patch information to generate a cohesive image representation.", "markdown_data": ""},
          {"title": "", "image_src": "", "article_para": "", "markdown_data": "**Key Features:** \n1. **Reconstruction:** The primary function of the Unpatching tool is to reconstruct the original image from the segmented patches. By combining these patches in a systematic manner, it restores the spatial integrity and continuity of the image.\n2. **Scalability:** The Unpatching tool offers scalability, allowing for both image enlargement and reduction. This capability is particularly useful in applications requiring image upscaling or downscaling while preserving visual fidelity.\n3. **Parameter Consistency:** To ensure consistency with the patching process, the Unpatching tool maintains compatibility with parameters such as patch size and padding width. This consistency facilitates seamless integration into the overall image processing workflow.\n4. **Enhanced Flexibility:** Beyond basic reconstruction, the Unpatching tool supports advanced functionalities such as blown upscale. This feature enables the user to specify the degree of enlargement or scaling applied to the reconstructed image, enhancing flexibility and control."},
          {"title": "", "image_src": "", "article_para": "", "markdown_data": "### Integration and Workflow"},
          {"title": "", "image_src": "", "article_para": "The seamless integration of Patching and Unpatching forms a comprehensive image processing workflow. Following patch extraction, the resulting patches can undergo various analyses or modifications before being fed into the Unpatching tool for reconstruction. This integrated approach streamlines the processing pipeline, offering efficiency, flexibility, and robustness.", "markdown_data": ""},
          {"title": "", "image_src": "", "article_para": "In summary, Patching and Unpatching represent indispensable components of modern image processing frameworks. Their ability to segment, analyze, and reconstruct images empowers researchers, engineers, and practitioners across diverse domains, driving innovation and advancement in computer vision and image analysis.", "markdown_data": ""}
  
          
  
      ],

      "github_url" : "https://github.com/abhishekprakash256",
       "linkedin_url" : "https://www.linkedin.com/in/abhishek256/",
        "twitter_url" : "",
       "leetcode_url" : "https://leetcode.com/abhishekprakash256/",
        "gitlab_url" : "https://gitlab.com/abhishekprakash256",
        "kaggle_url" : "https://www.kaggle.com/abhishek256",
        "medium_url" : "",
    
      "demo_link":"www.google.com",

      "more_link": "/project"
  
} 


const mockPaginationData : CardData[] = [
  {
    card_title: "Card Title 1",
    card_para: "System design is a multidisciplinary field that encompasses various aspects of designing distributed systems. ",
    img_src: "../images/cards.jpg",  /* the image file is in the public folder */
    card_url: "https://example.com/card1", 
  },

  {
    card_title: "Card Title 2",
    card_para: "System design is a multidisciplinary field that encompasses various aspects of designing distributed systems.",
    img_src: "../images/federated-learning-flow.png", /* the image file is in the public folder */
    card_url: "https://example.com/card2",
  },
  {
    card_title: "Card Title 3",
    card_para: "System design is a multidisciplinary field that encompasses various aspects of designing distributed systems.",
    img_src: "../images/image_1.png",  /* the image file is in the public folder */
    card_url: "https://example.com/card3",
  },

  {
    card_title: "Card Title 1",
    card_para: "System design is a multidisciplinary field that encompasses various aspects of designing distributed systems. ",
    img_src: "../images/cards.jpg",  /* the image file is in the public folder */
    card_url: "https://example.com/card1", 
  },
  {
    card_title: "Card Title 2",
    card_para: "System design is a multidisciplinary field that encompasses various aspects of designing distributed systems.",
    img_src: "../images/federated-learning-flow.png", /* the image file is in the public folder */
    card_url: "https://example.com/card2",
  },
  {
    card_title: "Card Title 3",
    card_para: "System design is a multidisciplinary field that encompasses various aspects of designing distributed systems.",
    img_src: "../images/image_1.png",  /* the image file is in the public folder */
    card_url: "https://example.com/card3",
  },
  {
    card_title: "Card Title 1",
    card_para: "System design is a multidisciplinary field that encompasses various aspects of designing distributed systems. ",
    img_src: "../images/chat-app-icon.png",  /* the image file is in the public folder */
    card_url: "https://example.com/card1", 
  },
  {
    card_title: "Card Title 2",
    card_para: "System design is a multidisciplinary field that encompasses various aspects of designing distributed systems.",
    img_src: "../images/federated-learning-flow.png", /* the image file is in the public folder */
    card_url: "https://example.com/card2",
  },
  {
    card_title: "Card Title 3",
    card_para: "System design is a multidisciplinary field that encompasses various aspects of designing distributed systems.",
    img_src: "../images/image_1.png",  /* the image file is in the public folder */
    card_url: "https://example.com/card3",
  },
  {
    card_title: "Card Title 1",
    card_para: "System design is a multidisciplinary field that encompasses various aspects of designing distributed systems. ",
    img_src: "../images/cards.jpg",  /* the image file is in the public folder */
    card_url: "https://example.com/card1", 
  },
  {
    card_title: "Card Title 2",
    card_para: "System design is a multidisciplinary field that encompasses various aspects of designing distributed systems.",
    img_src: "../images/federated-learning-flow.png", /* the image file is in the public folder */
    card_url: "https://example.com/card2",
  },
  {
    card_title: "Card Title 3",
    card_para: "System design is a multidisciplinary field that encompasses various aspects of designing distributed systems.",
    img_src: "../images/image_1.png",  /* the image file is in the public folder */
    card_url: "https://example.com/card3",
  }

];
 


export default function Article() {
  const articleData = mockArticleData; // Simulate data fetching
  const paginationData = mockPaginationData;

  const {
    article_data,
    github_url,
    linkedin_url,
    twitter_url,
    leetcode_url,
    gitlab_url,
    kaggle_url,
    medium_url,
    demo_link,
    more_link,
    
  } = articleData;


  return (
    <div>
      <NavBar />

      <CustomBody>
        {article_data.map((section, index) => (
          <div key={index}>
            {section.title && <HeadingBar title={section.title} />}
            {section.image_src && <ArticleImage image_link={section.image_src} />}
            {section.article_para && <Para description={section.article_para} />}
            {section.markdown_data && <MarkDown mark_down_data={section.markdown_data} />}
          </div>
        ))}

        <SocialMediaLinks
          github_link={github_url}
          linkedin_link={linkedin_url}
          twitter_link={twitter_url}
          leetcode_link={leetcode_url}
          gitlab_link={gitlab_url}
          kaggle_link={kaggle_url}
          medium_link={medium_url}
        />

        <ButtonBar button_text="Demo" link={demo_link} />
        <More more_link={more_link} />

        <HeadingBar title="Explore More" />

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
      </CustomBody>

      <Footer />
    </div>
  );
}