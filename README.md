# Compensation Intelligence System

## Introduction

A production-grade compensation intelligence system that helps tech professionals compare salaries based on standardized levels (L3, L4, L5) instead of misleading job titles. Built for the Indian tech market.

Unlike traditional salary sites like AmbitionBox or Glassdoor that compare "Senior Engineer" across different companies, this system recognizes that the same title means different things at different companies. An L4 at Google is comparable to an L62 at Microsoft, not just by title but by actual responsibility and compensation band.

This project was built as a submission for a Full Stack Developer Internship (Track C - Compensation Intelligence System).

---

## Live URLs

| Platform | URL |
|----------|-----|
| **Live Application** | https://compensation-intelligence-system.onrender.com |
| **GitHub Repository** | https://github.com/Sravanthi-Pala/compensation-intelligence-system |

---

## Tools & Technologies Used

| Category | Technology | Purpose |
|----------|------------|---------|
| **Frontend** | Next.js 14 (App Router) | React framework for server-side rendering |
| **Styling** | Tailwind CSS | Utility-first CSS for rapid UI development |
| **Backend** | Next.js API Routes | Serverless functions for REST APIs |
| **Database** | PostgreSQL | Relational database for storing salary data |
| **ORM** | Prisma | Type-safe database client and schema management |
| **Language** | TypeScript | Static typing for better code reliability |
| **Version Control** | Git & GitHub | Code hosting and collaboration |
| **Deployment** | Render | Cloud platform for hosting the live application |

---

## Purpose of This Project

### The Problem I Identified

Most salary comparison platforms in India have a fundamental flaw. They compare people by job titles. A "Senior Software Engineer" at a small startup might earn 15 lakhs while a "Senior Software Engineer" at Google might earn 50 lakhs. Same title, completely different compensation. This makes comparisons meaningless and misleading for job seekers.

### My Solution

I built a system that normalizes compensation by **levels** instead of titles. The industry standard levels are L3 (entry level / fresher), L4 (mid level / 2-4 years experience), L5 (senior / 5-8 years experience), and L6 (staff / 8+ years experience).

When you compare by levels, you get real insights. An L4 at Google earns around 33 lakhs. An L4 at Microsoft earns around 29 lakhs. An L4 at Amazon earns around 27 lakhs. This is actionable information for negotiations and career decisions.

---

## How It Works - Process Flow

### Step 1: Data Storage

All salary information is stored in a PostgreSQL database. The database schema includes company name, role, level, location, experience years, base salary, bonus, stock, and total compensation.

When data is inserted, three things happen automatically. First, company names are normalized - Google, google, and GOOGLE all become "google". Second, total compensation is calculated as base salary plus bonus plus stock. Third, missing bonus or stock values default to zero.

### Step 2: Backend APIs

Four REST APIs handle all data operations.

The POST /api/ingest API validates incoming salary data, checks for duplicates, normalizes company names, and stores valid records in the database.

The GET /api/salaries API accepts filters for company, role, level, and location. It supports sorting by any column and pagination with ten items per page. All filtering and sorting happens on the server side for performance.

The GET /api/company/:company API returns all salaries for a specific company along with calculated metrics like median compensation and level distribution.

The GET /api/compare API takes two salary IDs and returns a side-by-side comparison including base salary, bonus, stock, total compensation, and level difference.

### Step 3: Frontend Pages

The application has four main pages that users interact with.

**Home Page** - Users can search for any company, click quick action buttons for popular companies like Google and Microsoft, or navigate to the three main features.

**Salary Table Page** - This is the core page. Users see a table with company, role, level, location, experience, and total compensation columns. They can filter by company name, role, level, and location using input fields. They can click any column header to sort ascending or descending. The table shows ten items per page with previous and next buttons for navigation. If no results match the filters, a friendly message appears with a clear filters button.

**Company Page** - When a user clicks on a company, they see detailed analytics. The median total compensation for that company appears prominently. A level distribution chart shows how many L3, L4, and L5 entries exist. Each level also shows the average compensation. Below that, a complete list of all salaries for that company is displayed.

**Compare Page** - Users can select any two salaries from dropdown menus. The system shows a side-by-side comparison table. Base salary, bonus, stock, and total compensation are displayed for both entries. The higher value in each category is highlighted in green. The level difference is clearly shown, for example "L4 vs L5 - 1 level seniority gap".

### Step 4: Deployment

The application is deployed on Render. The deployment process connects to the GitHub repository. When code is pushed to the main branch, Render automatically rebuilds and redeploys the application. Environment variables like the database connection string are configured in Render's dashboard.

---

## Features Implemented

| Feature | Status | Description |
|---------|--------|-------------|
| Database Schema | ✅ Complete | PostgreSQL with Prisma, company normalization, total compensation calculation |
| POST /api/ingest | ✅ Complete | Validation, duplicate checking, error handling |
| GET /api/salaries | ✅ Complete | Filters, sorting, pagination, server-side processing |
| GET /api/company | ✅ Complete | Median compensation, level distribution, company analytics |
| GET /api/compare | ✅ Complete | Side-by-side comparison, level difference calculation |
| Home Page | ✅ Complete | Search, navigation, quick action buttons |
| Salary Table Page | ✅ Complete | Filter inputs, sortable columns, pagination controls |
| Company Page | ✅ Complete | Analytics cards, level distribution bars, salary list |
| Compare Page | ✅ Complete | Salary selectors, comparison table, visual highlights |
| Edge Cases | ✅ Complete | Missing data defaults, duplicate prevention, normalization, empty states |
| Deployment | ✅ Complete | Live on Render with automatic GitHub integration |

---

## Edge Cases Handled

During development, I identified and solved several edge cases that could break the application.

**Missing bonus or stock** - When a salary entry has no bonus or stock value, the system defaults to zero instead of throwing an error. The total compensation calculation still works correctly.

**Duplicate entries** - Before inserting a new salary, the system checks if an identical entry already exists in the database. If found, it returns a 409 conflict error instead of creating duplicate records.

**Company name variations** - Users might type "Google", "google", "GOOGLE", or " google " with spaces. The system normalizes all inputs to lowercase and trims spaces, so all variations map to the same company.

**Invalid data** - If someone submits a negative salary, an empty company name, or a level that doesn't exist, the system rejects the request with a 400 bad request error and a clear message explaining what went wrong.

**Empty filter results** - When a user applies filters that match no salaries, the table shows a friendly message saying "No salaries found matching your filters" along with a button to clear all filters.

**Compare same salary twice** - If a user selects the same salary ID in both compare dropdowns, the system shows an error message instead of comparing a salary with itself.

---

## Sample Data

The database comes pre-seeded with 25 realistic Indian tech salaries.

**Google** - L3 at 25 lakhs base with 3 years experience, L4 at 35 lakhs base with 5 years experience, L5 at 50 lakhs base with 8 years experience.

**Microsoft** - L61 at 22 lakhs base with 2 years experience, L62 at 30 lakhs base with 4 years experience.

**Amazon** - L4 at 20 lakhs base with 2 years experience, L5 at 32 lakhs base with 4 years experience.

**Flipkart** - SDE2 at 24 lakhs base with 3 years experience, SDE3 at 38 lakhs base with 6 years experience.

Additional companies include Uber, Razorpay, Swiggy, Ola, and Cred with 2-3 entries each. Locations include Bangalore, Hyderabad, Gurgaon, and Mumbai.

---

## How to Run Locally

If you want to test this project on your own machine, follow these steps.

First, clone the repository from GitHub.

Second, run npm install to install all dependencies.

Third, create a .env file and add your PostgreSQL database URL as DATABASE_URL.

Fourth, run npx prisma generate to generate the Prisma client.

Fifth, run npx prisma db push to push the database schema to your PostgreSQL database.

Sixth, run npx prisma db seed to populate the database with sample data.

Seventh, run npm run dev to start the development server on localhost port 3000.

Eighth, open your browser and go to http://localhost:3000.

---

## Conclusion

This compensation intelligence system successfully solves the problem of misleading title-based comparisons by introducing level-based standardization.

The project demonstrates end-to-end development skills including database design, API development, frontend implementation with React and Tailwind CSS, edge case handling, and production deployment.

Key achievements include building four fully functional REST APIs with validation and error handling, creating four responsive frontend pages with sorting, filtering, and pagination, handling real-world edge cases like missing data and duplicate entries, and deploying a live production application on Render.

The system is currently live and working with 25 sample salary entries across major Indian tech companies. It is ready for demonstration, testing, and potential expansion with additional features like user submissions and year-over-year trends.

This project was built as a submission for a Full Stack Developer Internship position and showcases my ability to take an ambiguous requirement, make independent technical decisions, build a complete system from scratch, and ship a working product to production.

---

## What I Learned

Building this project taught me several valuable lessons about full stack development.

First, normalization is critical. Small inconsistencies in data like different capitalizations can break search and filtering if not handled properly.

Second, median is better than average for salary data. A few extremely high salaries can skew the average, but median stays representative of typical compensation.

Third, edge cases matter as much as the happy path. Handling missing data, duplicates, and invalid inputs makes the difference between a prototype and a production system.

Fourth, deployment is not an afterthought. Building with deployment in mind from the start makes the final step much smoother.

---



