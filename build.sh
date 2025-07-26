#!/bin/bash

echo "🚀 Building MarineBioGroup for GitHub deployment..."

# Clean previous builds
rm -rf dist/

# Build client (React frontend)
echo "📦 Building client..."
npm run build:client

# Build server (Express backend)
echo "🖥️ Building server..."
npx esbuild server/index.ts --bundle --platform=node --target=node18 --outfile=dist/index.js --external:pg-native --format=esm

echo "✅ Build completed!"
echo "📁 Frontend: dist/public/"
echo "🖥️ Backend: dist/index.js"
echo ""
echo "🌐 Ready for deployment:"
echo "  • Netlify: Deploy dist/public + serverless functions"
echo "  • GitHub Pages: Deploy dist/public (frontend only)"
echo "  • Any Node.js host: Deploy dist/index.js"