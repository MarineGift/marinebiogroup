#!/bin/bash
echo "🚀 Deploying MarineBioGroup Dynamic Website..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build application
echo "🔨 Building application..."
npm run build

# Push database schema
echo "🗄️  Pushing database schema..."
npm run db:push

echo "✅ Deployment complete!"
echo "🌐 Start with: npm run dev"
echo "🔐 Admin: /admin-login-direct (admin/1111)"
