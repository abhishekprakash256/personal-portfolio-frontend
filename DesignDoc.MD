design clarity --- 


Frontend Continer (Nextjs)
 - Forntend-component-kit (vite + react)

 	- Common - 
	 	- Navbar 
	 	- ArticleImage
	 	- Markdown
	 	- Heading 
	 	- Para
	 	- More 
	 	- Social links
	 	- Cards Lists
	 	- Input Box (for chat and tiny url )


 - hardcoded pages
	 - Home 
	 - About 
	 - Contact

 - dynamic pages
	 - section
	 - blogs
 
 - demo
	 - Tiny Url 
		 - generation 

	 - Chat page
		 - Registration 
		 - Login 
		 - Chatting


Pages container (Flask)
- Section pages (dynamic)
	- handled by Flask

- Blog pages 
	- Handled by Flask 


Backend Chat container  (nestjs)
- Handles the websocket 
- message fetching 
- login and Auth 


Tiny Url container (flask)
- url redirection 
- generate and fetcing 


Redis Container 
Mongo Container 
PgresSql Container (if needed)



resuable compnents 

mongo helper kit 
redis helper kit 
hash generation kit 
pgsql-ts-helper






/ (Root Directory)
├── /nextjs-app                     # Your Next.js application
│   ├── /src                        # Source code directory
│   │   ├── /app                    # App folder (introduced in Next.js 13 for layouts, routing, etc.)
│   │   │   ├── /page.tsx           # Main layout and page container (home, about, etc.)
│   │   │   ├── /layout.tsx         # Layout for the entire app (or specific page groups)
│   │   │   └── /error.tsx          # Error handling component
│   │   ├── /pages                  # Contains the pages (Home, About, Contact, etc.)
│   │   │   ├── /about.tsx          # Hardcoded About page
│   │   │   ├── /index.tsx          # Home Page
│   │   │   ├── /section/[section].tsx  # Dynamic Section Pages
│   │   │   ├── /blogs/[page].tsx   # Dynamic Blog Pages (with pagination)
│   │   │   ├── /chat               # Chat Page Folder
│   │   │   │   ├── /index.tsx      # Chat Registration, Login, and Chatting
│   │   │   │   ├── /registration.tsx   # Chat Registration Page
│   │   │   │   ├── /login.tsx      # Chat Login Page
│   │   │   │   └── /chatting.tsx   # Chatting Page
│   │   │   ├── /tiny-url           # Tiny URL Page Folder
│   │   │   │   └── /index.tsx      # Tiny URL Generation Page
│   │   ├── /styles                 # Styles for your app
│   │   │   ├── /globals.css        # Global styles (fonts, resets, etc.)
│   │   │   ├── /home.css           # Specific styles for Home Page
│   │   │   ├── /chat.css           # Specific styles for Chat page
│   │   │   └── /tinyurl.css        # Specific styles for Tiny URL page
│   │   ├── /utils                  # Utility functions (e.g., API calls)
│   │   │   ├── /api.ts             # API utility functions (e.g., for fetching data)
│   │   │   └── /helpers.ts         # Helper functions (e.g., date formatting)
│   │   ├── /types                  # TypeScript types (e.g., interface definitions)
│   │   └── /components             # Reusable components (Navbar, Cards, etc.)
│   │       ├── /Navbar.tsx
│   │       ├── /Card.tsx
│   │       └── /SocialLinks.tsx
├── /public                         # Public assets directory
│   ├── /images                     # Store images (e.g., logos, backgrounds)
│   ├── /fonts                      # Store font files
│   └── /static                     # Static assets (e.g., robots.txt, favicon.ico)
├── next.config.js                  # Next.js configuration file
├── tsconfig.json                   # TypeScript configuration file
├── package.json                    # Next.js app dependencies (includes frontend-component-kit)
└── .gitignore                      # Git ignore file
├── /node_modules                   # Node modules (includes frontend-component-kit)
└── package.json                    # Root package.json for managing dependencies
└── .gitignore                      # Git ignore file







mongo database schema -- 


for blog pages shoudl be used in cards and section as well -- 

section is Tech 

[{
	
	heading_one : "somethings",   //card heading
	article_image_one : "link",   // card image
	article_desc_one : "desc",     //card desc
	markdwon_one : "data"


	project_link : "link"          //explore link
	social_media_link : {links}
	demo_link : "link"

}]





section pages will fetch data from the database sections and render in data 

with the info and paignataion 

for static pages it will be hard coded 


Api calls -- 

article/tech/name_article 
article/project/name_article

section/tech 
section/project
section/life


for article page 

pass all the article data 

and the cards data will be fetch random from the particluar section pool no harcoding fetch random

