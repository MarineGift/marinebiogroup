# MarineBioGroup Website

A modern Next.js website for MarineBioGroup, showcasing marine nano-fiber technology for sustainable beauty and lifestyle products.

## 🚀 Features

- **Next.js 15.4.5** with App Router architecture
- **TypeScript** for type safety
- **Supabase** integration for database and authentication
- **Tailwind CSS** for responsive design
- **Framer Motion** for smooth animations
- **Admin Dashboard** with authentication
- **Contact Forms** with email integration
- **SEO Optimized** with proper meta tags
- **English Language** website

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Database**: Supabase PostgreSQL
- **Styling**: Tailwind CSS, Radix UI components
- **Authentication**: JWT tokens
- **Deployment**: Railway (recommended) or Vercel

## 📦 Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   JWT_SECRET=your_jwt_secret_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Database Setup

The application uses Supabase as the database:

1. Create a Supabase project at https://supabase.com
2. Set up the required tables for contact forms and admin users
3. Configure Row Level Security (RLS) policies
4. Add your Supabase credentials to the environment variables

## 🚀 Deployment

### Railway Deployment (Recommended)

1. Create account at https://railway.app
2. Connect your GitHub repository to Railway
3. Set environment variables in Railway dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `JWT_SECRET`
4. Deploy automatically on push to main branch

### Vercel Deployment

1. Connect repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── admin/             # Admin dashboard
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── products/          # Products page
│   ├── technology/        # Technology page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── layout/            # Layout components
│   ├── sections/          # Page sections
│   ├── ui/                # UI components
│   └── admin/             # Admin components
└── lib/                   # Utility functions
    ├── supabase.ts        # Supabase client
    └── utils.ts           # Helper functions
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Website Pages

- **Home**: Hero section, features, technology overview, products
- **About**: Company mission, team, timeline
- **Technology**: Process, innovation, research details
- **Products**: Product categories and descriptions
- **Contact**: Contact form and company information
- **Admin**: Authentication and dashboard (admin/1111)

## 🌐 Admin Access

Default admin credentials:
- Username: `admin`
- Password: `1111`

Change these in the admin dashboard after first login.

## 📝 License

This project is proprietary software owned by MarineBioGroup.

## 🤝 Support

For support and questions, please contact the development team.