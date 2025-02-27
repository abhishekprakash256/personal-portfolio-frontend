export interface ArticleData {
    article_name: string;
    section_name: string;
    id_number: number;
    aticle_data: SectionData[];
    github_url: string;
    linkedin_url: string;
    twitter_url: string;
    leetcode_url: string;
    gitlab_url: string;
    kaggle_url: string;
    medium_url: string;
    demo_link: string;
    more_link: string;
  }
  
  export interface SectionData {
    title: string;
    image_src: string;
    article_para: string;
    markdown_data: string;
  }
  
 export interface CardData {
    card_title: string;
    card_para: string;
    img_src: string; // The path to the image
    card_url: string; // URL the card links to
  }


 export interface CardsPaignationData {
    cardData: CardData[];
  };
  