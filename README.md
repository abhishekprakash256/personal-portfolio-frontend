This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


## Install dependicies

```bash
npm install
```

## Server runs in 

http://localhost:3000

## Getting Started

First, run the development server:

```bash
npm run dev  
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## To run 

- mongodb is needed either in docker or barematel (for database fetching)

- mongo access service is needed 
  runs in port 5000

- api gateway service is needed
  runs in port 5001

- static media server is needed
  runs in port 8080

- run the personal porfolio frontend in last 
- runs in port 3000



## Note 

before pushing the code for production server use build

for the build sometinme remove the cache of the app and clean build that can cause errors too 

commands --   

```bash
rm -rf .next

rm -rf node_modules
rm package-lock.json  # or yarn.lock or pnpm-lock.yaml depending on what you use
npm install


```


```bash 

npm run build 

```

## Run the prod server 

```bash
npm start
```



Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# personal-portfolio-frontend
