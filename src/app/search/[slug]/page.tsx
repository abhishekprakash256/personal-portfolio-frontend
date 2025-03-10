/*
The search page for displaying the search reusult in card format
also display a page if any result is not avaialble as well 

*/

//'use client' ; 
import { NotFound,ButtonBar , CardLists, AboutPic, CardsPaignation , NavBar, Footer,ArticleImage, SpaceBlock, SocialMediaLinks, Para, MarkDown, HeadingBar,CustomBody, More } from "front-end-component-kit";
import 'bootstrap/dist/css/bootstrap.min.css';
import {CardData, ArticleData, SectionData } from "../../types"; // Import types
//import NotFound from "./NotFound";



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

    //serarch url modified
    try {
        const res = await fetch(`http://127.0.0.1:5001/search/${slug}`, {
            cache: "no-store",
        });

        console.log("Fetch request sent:", res.status, res.statusText);

        if (!res.ok) {
            console.warn(`Server returned error: ${res.status} - ${res.statusText}`);
            return []; // Avoid throwing errors, return empty results
        }

        const text = await res.text();
        if (!text) {
            console.warn("Empty response body received.");
            return [];
        }

        return JSON.parse(text); // Safely parse JSON
    } catch (error) {
        console.error("Network or JSON parsing error:", error);
        return []; // Return empty array on failure
    }
}


// This is an async function inside the component file, which is fine in the app directory
async function getPaginationData(): Promise<CardData[]> {
  const res = await fetch(`http://127.0.0.1:5001/section/explore`, {

    
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

  

  export default async function SearchPage({ params }: { params: { slug: string } }) {
    const { slug } = await params; 
    let searchPageData: CardData[] = [];
    let paginationData : CardData[] = await getPaginationData(); 

    try {
        searchPageData = await getSearchData(slug);
    } catch (error) {
        console.error("Error fetching search data:", error);
    }

    return (
        <div>
            <NavBar />
            <CustomBody>
                

                {searchPageData.length === 0 ? (

                  <>
                    <NotFound />
                    <HeadingBar title="Explore More" />
                    < CardsPaignation cardData= {paginationData} />
                    
                    </>
                
                  ) : (

                    <>
                    <HeadingBar title="Results" />
                    <CardsPaignation cardData={searchPageData} />
                    <HeadingBar title="Explore More" />
                    < CardsPaignation cardData= {paginationData} />
                    </>
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

