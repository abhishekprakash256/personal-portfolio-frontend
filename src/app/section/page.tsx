

import {ButtonBar , CardLists, AboutPic, CardsPaignation , NavBar, Footer,ArticleImage, SpaceBlock, SocialMediaLinks, Para, MarkDown, HeadingBar,CustomBody, More } from "front-end-component-kit";
import 'bootstrap/dist/css/bootstrap.min.css';
import {CardData, ArticleData, SectionData } from "../types"; // Import types



const socialLinks = [
  "https://github.com/abhishekprakash256",
  "https://www.linkedin.com/in/abhishek256/",
  "",
  "https://leetcode.com/abhishekprakash256/",
  "https://gitlab.com/abhishekprakash256",
  "https://www.kaggle.com/abhishek256",
  "",
];

const resume_link : string = "Resuem.pdf";



async function getPaginationData(): Promise<CardData[]> {
  const res = await fetch("http://localhost:5000/section/[something]", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch pagination data");
  }

  return res.json();
}



export default async function Section() {

  const paginationData = await getPaginationData();


  return (
    <div>
      <NavBar />

      <CustomBody>

        <HeadingBar title="Section Name" />

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