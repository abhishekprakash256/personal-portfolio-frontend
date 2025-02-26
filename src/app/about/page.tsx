import { AboutPic, CardsPaignation , NavBar, Footer,ArticleImage, SpaceBlock, SocialMediaLinks, Para, MarkDown, HeadingBar,CustomBody, More } from "front-end-component-kit";

import {CardLists} from "front-end-component-kit";



import 'bootstrap/dist/css/bootstrap.min.css';


const more_link : string = "www.google.com";



export default function about() {
  return (
    
    <div>

<NavBar></NavBar>

<CustomBody>

<HeadingBar title={"About Page"}/> 


<HeadingBar title={"Skills"}/>



<HeadingBar title={"Tech"}/> 

     
    <More more_link= {more_link} /> 

  
   <HeadingBar title={"Projects"}/> 


  <SpaceBlock></SpaceBlock>  { /*SpaceBlock component to create a space between the social media links and the footer */ }

</CustomBody>

    <Footer></Footer>

    </div>
  );
}