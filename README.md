# MarineBioGroup Website - Static Export

A minimal, guaranteed-working version of the MarineBioGroup website using Next.js static export.

## Features

- Next.js 13.5.6 (stable, proven version)
- Static export (no server required)
- Zero external dependencies beyond React/Next.js
- No complex UI libraries or conflicting packages
- Pure CSS styling with Marine theme
- Responsive design
- Contact form with basic JavaScript

## Railway Deployment

This version is designed to eliminate all possible dependency conflicts:

1. Uses proven stable versions of Next.js and React
2. No package-lock.json (Railway generates fresh)
3. Static export eliminates server requirements
4. Zero external services or APIs required

## Build Commands

```bash
npm install    # Installs only 7 core packages
npm run build  # Creates static export in /out folder
```

## What's Included

- **Home Page**: Hero section, features, technology overview, contact
- **Marine Theme**: Blue gradient color scheme throughout
- **Responsive**: Works on mobile and desktop
- **Contact Form**: Basic form with JavaScript alert
- **Navigation**: Smooth scroll navigation
- **Footer**: Company information and contact details

## Guaranteed Working

This version removes all sources of dependency conflicts:
- No Framer Motion
- No Lucide React
- No Tailwind CSS
- No complex build chains
- No external fonts or images
- No environment variables required

The website will build and deploy successfully on Railway with these minimal dependencies.