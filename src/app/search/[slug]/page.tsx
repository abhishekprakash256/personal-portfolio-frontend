/*
The search page for displaying the search reusult in card format
also display a page if any result is not avaialble as well 

*/

//'use client' ; 
import { NotFound,ButtonBar , AboutPic, CardsPaignation , NavBar, Footer,ArticleImage, SpaceBlock, SocialMediaLinks, Para, MarkDown, HeadingBar,CustomBody, More } from "front-end-component-kit";
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
  
  const resume_link : string = "/files/resume.pdf";




  async function getSearchData(slug: string): Promise<CardData[]> {
    try {
        const url = new URL("http://127.0.0.1:5001/search");
        url.searchParams.append("keyword", slug);

        const res = await fetch(url.toString(), {
            cache: "no-store",
        });

        console.log("Fetch request sent:", res.status, res.statusText);

        if (!res.ok) {
            console.warn(`Server returned error: ${res.status} - ${res.statusText}`);
            return [];
        }

        const json = await res.json();

        if (!json || !json.data) {
            console.warn("No data field found in the response.");
            return [];
        }

        return json.data;
    } catch (error) {
        console.error("Network or JSON parsing error:", error);
        return [];
    }
}






// This is an async function inside the component file, which is fine in the app directory
async function getPaginationData(): Promise<CardData[]> {
  const res = await fetch(`http://127.0.0.1:5001/blog/section/explore`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch pagination data");
  }

  const json = await res.json();

  // ✅ Only return the `data` field
  return json.data || [];  
}




// Helper function to capitalize the first letter
const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  

  export default async function SearchPage({ params }: { params: Promise<{ slug: string }> }) {
    let searchPageData: CardData[] = [];
    let paginationData: CardData[] = [];

    try {
        const { slug } = await params; // Awaiting the params as it is a Promise
        paginationData = await getPaginationData();
        searchPageData = await getSearchData(slug);
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    return (
        <div>
            <NavBar />
            <CustomBody>
                {searchPageData.length === 0 ? (
                    <>
                        <NotFound />
                        <HeadingBar title="Explore More" />
                        <CardsPaignation cardData={paginationData} />
                    </>
                ) : (
                    <>
                        <HeadingBar title="Results" />
                        <CardsPaignation cardData={searchPageData} />
                        <HeadingBar title="Explore More" />
                        <CardsPaignation cardData={paginationData} />
                    </>
                )}
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
