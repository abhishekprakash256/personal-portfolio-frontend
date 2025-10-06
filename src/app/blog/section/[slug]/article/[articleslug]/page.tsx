/*
The page is used to render article  
*/

import { 
  ButtonBar, AboutPic, CardsPaignation, NavBar, Footer, ArticleImage, 
  SpaceBlock, SocialMediaLinks, Para, MarkDown, HeadingBar, CustomBody, More 
} from "front-end-component-kit";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CardData, ArticleData, SectionData } from "../../../../../types"; 

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

//const test_img_link : string =  "section/project/chat-app/chat-app-icon.png"



// Fetch Article Data
async function getArticleData(slug: string, articleslug: string): Promise<ArticleData | null> {
  const url = `https://meabhi.me//blog-service/api/v1/section/${slug}/article/${articleslug}`;

  //http://127.0.0.1:5001/blog/section/${slug}/article/${articleslug}

  console.log("Fetching article data from:", url);

  try {
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      console.error("API Error:", res.status, res.statusText);
      throw new Error(`Failed to fetch article data: ${res.status}`);
    }

    const json = await res.json();

    // ✅ Only return the `data` part
    return json.data || null;
  } catch (error) {
    console.error("Error fetching article data:", error);
    return null;
  }
}

// Fetch Pagination Data 
async function getPaginationData(): Promise<CardData[]> {
  const url = "https://meabhi.me/blog-service/api/v1/section/explore";

  //http://127.0.0.1:5001/blog/section/explore
  

  console.log("Fetching pagination data from:", url);

  try {
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      console.error("API Error:", res.status, res.statusText);
      throw new Error("Failed to fetch pagination data");
    }

    const json = await res.json();

    // ✅ Only return the `data` part
    return json.data || [];
  } catch (error) {
    console.error("Error fetching pagination data:", error);
    return [];
  }
}



// Main Article Component
export default async function Article({ params }: { params: Promise<{ slug: string, articleslug: string }> }) {
  // Await the params as it is now a Promise
  const { slug, articleslug } = await params;

  // Fetch the article and pagination data
  const articleData = await getArticleData(slug, articleslug);
  const paginationData = await getPaginationData();

  if (!articleData) {
    console.error("No article data found, rendering fallback UI");
    return <div>Article Not Found</div>;
  }

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
        {article_data.map((section: SectionData, index: number) => (
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
        <CardsPaignation cardData={paginationData} />
        
        {/* <img src = {`/images/${test_img_link}`} /> */} 

          <SocialMediaLinks 
          github_link = {socialLinks[0] }
          linkedin_link= {socialLinks[1]}
          twitter_link=""
          leetcode_link={socialLinks[3]}
          gitlab_link={socialLinks[4]}  
          kaggle_link={socialLinks[5]}
          medium_link=""
          />

        <ButtonBar button_text="Download Resume" link={resume_link} />
        <SpaceBlock />
      </CustomBody>

      <Footer />
    </div>
  );
}