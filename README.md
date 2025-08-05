# MarineBioGroup Website

A modern Next.js website for MarineBioGroup, showcasing marine nano-fiber technology for sustainable beauty and lifestyle products.

## 🚀 Features

- **Next.js 14.2.5** with App Router architecture
- **TypeScript** for type safety
- **Stable Dependencies** - no dependency conflicts
- **Tailwind CSS** for responsive design
- **Framer Motion** for smooth animations
- **Admin Dashboard** with authentication
- **Contact Forms** working out of the box
- **SEO Optimized** with proper meta tags
- **English Language** website

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Authentication**: JWT tokens
- **Deployment**: Railway, Vercel, or Netlify

## 📦 Installation

1. Extract the downloaded files
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (optional):
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your credentials (if using Supabase):
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

## 🚀 Deployment

### Railway Deployment (Recommended)

1. Create account at https://railway.app
2. Connect your GitHub repository to Railway
3. Set environment variables in Railway dashboard (optional)
4. Deploy automatically on push to main branch

### Vercel Deployment

1. Connect repository to Vercel
2. Set environment variables in Vercel dashboard (optional)
3. Deploy automatically

### Netlify Deployment

1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `out` or `.next`
4. Deploy automatically

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (working without database)
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
    ├── supabase.ts        # Supabase client (optional)
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

## ✅ What Works Out of the Box

- All pages load correctly
- Contact form submissions (logged to console)
- Newsletter subscriptions (logged to console)
- Admin login system
- Responsive design
- Smooth animations
- No dependency conflicts

## 🔧 Optional Enhancements

To add database functionality:
1. Set up Supabase account
2. Add environment variables
3. The code is already prepared for Supabase integration

## 📝 License

This project is proprietary software owned by MarineBioGroup.

## 🤝 Support

For support and questions, please contact the development team.