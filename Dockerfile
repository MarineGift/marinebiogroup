cat > Dockerfile << 'EOF'
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
EOF

# 3. .dockerignore 생성
cat > .dockerignore << 'EOF'
node_modules
.next
.git
*.md
.env.local
EOF