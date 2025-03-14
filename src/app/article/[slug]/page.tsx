/*
article page to render the article posts not should be used further the section article page should be used 
*/
//'use client' ; 
import {ButtonBar , CardLists, AboutPic, CardsPaignation , NavBar, Footer,ArticleImage, SpaceBlock, SocialMediaLinks, Para, MarkDown, HeadingBar,CustomBody, More } from "front-end-component-kit";
import 'bootstrap/dist/css/bootstrap.min.css';
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

const resume_link : string = "Resume.pdf";




// make all as props to insert the data here dynamically in the function 

async function getArticleData( slug: string) {

    const res = await fetch(`http://127.0.0.1:5001/section/tech/article/${slug}`, {
    cache: "no-store", // Prevent caching in production
  });

  if (!res.ok) {
    throw new Error("Failed to fetch article data");
  }

  return res.json() as Promise<ArticleData>;
}


async function getPaginationData(): Promise<CardData[]> {
  const res = await fetch("http://127.0.0.1:5001/section/explore", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch pagination data");
  }

  return res.json();
}

export default async function Article({ params }: { params: { slug: string}  }) {
  const { slug } = await params ; 
  const articleData = await getArticleData(slug);
  const paginationData = await getPaginationData();
  //const router = useRouter();

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
      <NavBar/>

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
          twitter_link= {twitter_url}
          leetcode_link={leetcode_url}
          gitlab_link={gitlab_url}
          kaggle_link={kaggle_url}
          medium_link= {medium_url}
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
