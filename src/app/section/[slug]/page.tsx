// app/section/[slug]/page.tsx
//'use client';
import { ButtonBar, CardLists, AboutPic, CardsPaignation, NavBar, Footer, ArticleImage, SpaceBlock, SocialMediaLinks, Para, MarkDown, HeadingBar, CustomBody, More } from "front-end-component-kit";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CardData } from "../../types"; // Import types
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

const resume_link: string = "Resuem.pdf";









// This is an async function inside the component file, which is fine in the app directory
async function getPaginationData(slug: string): Promise<CardData[]> {
  const res = await fetch(`http://127.0.0.1:5001/section/${slug}`, {

    
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch pagination data");
  }

  return res.json();
}

// Helper function to capitalize the first letter
const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};







export default async function SectionPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const paginationData = await getPaginationData(slug);
  //const rout = useRouter() ;

  return (
    <div>
      <NavBar  />

      <CustomBody>

        <HeadingBar title={`${capitalizeFirstLetter(slug)}`} />

        <CardsPaignation cardData={paginationData} /> {/* paginationData is of type CardData[] */}

        <SocialMediaLinks 
          github_link={socialLinks[0]}
          linkedin_link={socialLinks[1]}
          twitter_link={socialLinks[2]}
          leetcode_link={socialLinks[3]}
          gitlab_link={socialLinks[4]}
          kaggle_link={socialLinks[5]}
          medium_link={socialLinks[6]}
        />

        <ButtonBar button_text="Download Resume" link={resume_link} />

        <SpaceBlock />
      </CustomBody>

      <Footer />
    </div>
  );
}
