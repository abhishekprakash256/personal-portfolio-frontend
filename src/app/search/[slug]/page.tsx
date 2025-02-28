/*
The search page for displaying the search reusult in card format
also display a page if any result is not avaialble as well 

*/


import {ButtonBar , CardLists, AboutPic, CardsPaignation , NavBar, Footer,ArticleImage, SpaceBlock, SocialMediaLinks, Para, MarkDown, HeadingBar,CustomBody, More } from "front-end-component-kit";
import 'bootstrap/dist/css/bootstrap.min.css';
import {CardData, ArticleData, SectionData } from "../../types"; // Import types


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


async function getSearchData(slug : string) : Promise<CardData[]>
{
    const res = await fetch(`http://127.0.0.1:5000/search/${slug}`, 
    {
        cache: "no-store",
    });


    if (!res.ok) 
    {   
        // render the not found page
        throw new Error("Failed to fetch search data");

    }

    return res.json(); 

}


// Helper function to capitalize the first letter
const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  

export default async function SearchPage( {params} : { params: { slug: string } }) {

    const { slug } = await params ; 

    const searchPageData = await getSearchData(slug)

    return (
      <div>
        <NavBar />
  
        <CustomBody>
  
          <HeadingBar title= "Results" />
  
          <CardsPaignation cardData={searchPageData} /> {/* paginationData is of type CardData[] */}
  
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

