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

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
## 🔬 Phase 1 Research (Mandatory Assignment Requirement)

### Observations from Platforms

| Platform | What Works | What Fails |
|----------|------------|-------------|
| **Levels.fyi** | Level standardization, global data, transparent comparison | Limited India data |
| **6figr** | Good India coverage, stock data | Poor UI, inconsistent levels |
| **AmbitionBox** | Easy to use, company reviews | NO level-based data, just titles |
| **Glassdoor** | Large dataset | Title-based only, India data weak |

### Why Levels.fyi Works
1. **Levels > Titles** - L5 at Google = L64 at Microsoft
2. **Comparable data** - Same level across companies
3. **User trust** - Verified submissions with confidence scores

### Feature Mapping Sheet

| Feature | Levels.fyi | 6figr | AmbitionBox | Glassdoor | Build? |
|---------|------------|-------|-------------|-----------|--------|
| Level-based salaries | ✅ | ❌ | ❌ | ❌ | ✅ |
| Company comparison | ✅ | ✅ | ❌ | ✅ | ✅ |
| Stock/bonus data | ✅ | ✅ | ❌ | ❌ | ✅ |
| Confidence scoring | ✅ | ❌ | ❌ | ❌ | ✅ |
| Salary submission | ✅ | ✅ | ✅ | ✅ | ❌* |

*Not building per assignment constraints

## 🛠️ Tech Stack
- **Frontend**: Next.js 14 (App Router) + Tailwind CSS + TypeScript
- **Backend**: Next.js API routes
- **Database**: PostgreSQL + Prisma ORM
- **Deployment**: Vercel + Supabase

## ✨ Features Implemented
1. **Salary Table** - Filtering, sorting, pagination (10 per page)
2. **Company Analytics** - Median compensation, level distribution
3. **Compare** - Side-by-side salary comparison with level differences

## ⚠️ Edge Cases Handled
- Missing bonus/stock defaults to 0
- Duplicate entry detection
- Company name normalization (Google, google, GOOGLE → google)
- Invalid data rejection with 400 errors
- Empty states with friendly messages

## 🚀 Deployment
This app is deployed on Vercel with Supabase PostgreSQL.

## 📊 Sample Data
25+ Indian tech salaries including Google, Microsoft, Amazon, Flipkart, Uber, Razorpay, Swiggy, Ola, Cred

## 🔗 Links
- **Live URL**: [Add your Vercel URL here]
- **GitHub**: [Add your GitHub repo URL here]
