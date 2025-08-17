This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

### Prerequisites for Vercel Deployment

1. **Database Setup**: Ensure you have a PostgreSQL database accessible from Vercel
2. **Environment Variables**: Set the following environment variables in Vercel:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `DIRECT_URL`: Direct database connection (same as DATABASE_URL)
   - `KINDE_CLIENT_ID`: Your Kinde authentication client ID
   - `KINDE_CLIENT_SECRET`: Your Kinde authentication client secret
   - `KINDE_ISSUER_URL`: Your Kinde issuer URL
   - `KINDE_SITE_URL`: Your Vercel deployment URL
   - `KINDE_POST_LOGIN_REDIRECT_URL`: `/dashboard`
   - `KINDE_POST_LOGOUT_REDIRECT_URL`: `/`

### Build Process

The project automatically runs `prisma generate` during build to ensure Prisma Client is up-to-date on Vercel.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
