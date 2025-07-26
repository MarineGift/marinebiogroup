# MarineBioGroup - Marine Nano-Fiber Technology Platform

## 🌊 Overview

MarineBioGroup is a cutting-edge web platform showcasing revolutionary marine nano-fiber technology for sustainable beauty and lifestyle products. Built with modern React/TypeScript architecture and Supabase backend.

## ✨ Features

- **Modern Stack**: React 18, TypeScript, Tailwind CSS, Drizzle ORM
- **Admin Dashboard**: Complete content management system
- **Multi-language**: English, Korean, Japanese, Spanish support
- **Responsive Design**: Mobile-first responsive layout
- **Database**: Supabase PostgreSQL with memory storage fallback
- **SEO Optimized**: Meta tags, Open Graph, sitemap

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Supabase account
- GitHub account

### 1. Clone Repository
```bash
git clone https://github.com/[USERNAME]/marinebiogroup.git
cd marinebiogroup
npm install
```

### 2. Setup Supabase Database
1. Create new project at [Supabase Dashboard](https://supabase.com/dashboard/projects)
2. Get your database URL from Project Settings → Database → Connection string
3. Create `.env` file:
```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]/postgres?sslmode=require
```

### 3. Deploy Database Schema
```bash
npm run db:push
```

### 4. Run Development Server
```bash
npm run dev
```

## 📁 Project Structure

```
├── client/src/           # React frontend
│   ├── components/       # Reusable components
│   ├── pages/           # Page components
│   └── hooks/           # Custom hooks
├── server/              # Express backend
│   ├── routes.ts        # API routes
│   └── storage.ts       # Database layer
├── shared/              # Shared types and schemas
└── dist/               # Production build
```

## 🔐 Admin Access

- **URL**: `/admin`
- **Username**: `admin`  
- **Password**: `1111`

Manage all website content including:
- Newsletter subscriptions
- Contact form submissions
- Blog posts and news
- Image gallery
- Product information

## 🌐 Deployment Options

### Option 1: Netlify (Recommended)
```bash
# Build project
npm run build

# Deploy to Netlify
npx netlify-cli deploy --prod --dir=dist/public

# Set environment variables in Netlify dashboard
```

### Option 2: Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Add DATABASE_URL environment variable
```

### Option 3: GitHub Pages + Backend Service
- Frontend: Deploy `dist/public` to GitHub Pages
- Backend: Deploy `dist/index.js` to Railway/Render

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run db:push` - Deploy database schema
- `npm run lint` - Run ESLint

### Environment Variables
```env
DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]/postgres
NODE_ENV=production
```

## 🎯 Key Pages

- **Home** (`/`) - Company introduction and hero section
- **About** (`/about`) - Company background and mission
- **Technology** (`/technology`) - Marine nano-fiber technology
- **Products** (`/products`) - Product showcase
- **Market** (`/market`) - Market analysis
- **Investors** (`/investors`) - Investment information
- **Contact** (`/contact`) - Contact form
- **Blog** (`/blog`) - Company blog and updates
- **Gallery** (`/gallery`) - Image gallery
- **News** (`/news`) - Latest news and announcements

## 📊 Database Schema

- **users** - Admin user accounts
- **contacts** - Contact form submissions
- **newsletters** - Email subscriptions
- **blog_posts** - Blog content
- **news** - News articles
- **gallery** - Image gallery items
- **products** - Product information
- **carousel** - Homepage carousel slides
- **admin_sessions** - Admin authentication sessions

## 🔒 Security Features

- Admin authentication with session management
- Input validation with Zod schemas
- SQL injection prevention with Drizzle ORM
- CORS protection
- Environment variable security

## 🌍 Multi-language Support

Supports 4 languages with easy content management:
- English (eng)
- Korean (kor) 
- Japanese (jpn)
- Spanish (esp)

## 📱 Responsive Design

Optimized for all device sizes:
- Mobile phones (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1440px+)

## 🎨 UI Components

Built with shadcn/ui and Radix primitives:
- Forms with validation
- Data tables with pagination
- Modal dialogs
- Toast notifications
- Loading states
- Error boundaries

## 📈 Performance

- Optimized bundle size
- Lazy loading components
- Image optimization
- Database query optimization
- Memory storage fallback

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- GitHub Issues: [Create an issue](https://github.com/[USERNAME]/marinebiogroup/issues)
- Email: support@marinebiogroup.com

---

**MarineBioGroup** - Pioneering sustainable marine technology for a better future.# Deploy Trigger
