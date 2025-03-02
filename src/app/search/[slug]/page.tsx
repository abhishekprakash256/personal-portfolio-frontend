/*
The search page for displaying the search reusult in card format
also display a page if any result is not avaialble as well 

*/

//'use client' ; 
import {ButtonBar , CardLists, AboutPic, CardsPaignation , NavBar, Footer,ArticleImage, SpaceBlock, SocialMediaLinks, Para, MarkDown, HeadingBar,CustomBody, More } from "front-end-component-kit";
import 'bootstrap/dist/css/bootstrap.min.css';
import {CardData, ArticleData, SectionData } from "../../types"; // Import types
import NotFound from "./NotFound";



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


  async function getSearchData(slug: string): Promise<CardData[]> {
    const res = await fetch(`http://127.0.0.1:5000/search/${slug}`, {
        cache: "no-store",
    });

    if (!res.ok) {   
        throw new Error("Failed to fetch search data");
    }

    const data = await res.json();

    if (!data || data.length === 0) {
        return [];  // Ensure an empty array is returned for no results
    }

    return data;
}



// Helper function to capitalize the first letter
const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  

  export default async function SearchPage({ params }: { params: { slug: string } }) {
    const { slug } = params; 
    let searchPageData: CardData[];

    try {
        searchPageData = await getSearchData(slug);
    } catch (error) {
        return (
            <div>
                <NavBar />
                <CustomBody>
                   
                    <NotFound />
                    
                </CustomBody>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <NavBar />
            <CustomBody>
                <HeadingBar title="Results" />

                {searchPageData.length === 0 ? (
                    <div>
                      <NotFound />
                    </div>
                ) : (
                    
                    <CardsPaignation cardData={searchPageData} />
                )}

                <SocialMediaLinks 
                    github_link="https://github.com/abhishekprakash256"
                    linkedin_link="https://www.linkedin.com/in/abhishek256/"
                    twitter_link=""
                    leetcode_link="https://leetcode.com/abhishekprakash256/"
                    gitlab_link="https://gitlab.com/abhishekprakash256"
                    kaggle_link="https://www.kaggle.com/abhishek256"
                    medium_link=""
                />

                <ButtonBar button_text="Download Resume" link="Resume.pdf" />
                <SpaceBlock />
            </CustomBody>
            <Footer />
        </div>
    );
}

