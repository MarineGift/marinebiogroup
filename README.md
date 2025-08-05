# MarineBioGroup Website

A modern Next.js website for MarineBioGroup, showcasing marine nano-fiber technology for sustainable beauty and lifestyle products.

## Railway Deployment

This project is optimized for Railway deployment with minimal dependencies to avoid any conflicts.

### Zero Problematic Dependencies

- No nodemailer or email-related packages
- No complex UI libraries with dependency chains
- Only essential, stable packages
- No package-lock.json to avoid cached dependency issues

### Quick Start

```bash
npm install
npm run dev
```

### Features

- Next.js 14.2.15 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Framer Motion for animations
- Lucide React for icons
- Marine-themed design
- Responsive layout
- Contact form (console logging)

### Deployment to Railway

1. Connect GitHub repository to Railway
2. Railway auto-detects Next.js project
3. Automatic build and deployment
4. Zero configuration required

### Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # React components
└── lib/                 # Utilities (if needed)
```

This version eliminates all dependency conflicts and is guaranteed to work on Railway.