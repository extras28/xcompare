#!/bin/bash

# Đảm bảo script sẽ dừng nếu có lỗi xảy ra
set -e

echo "🚀 Building Frontend..."
cd frontend
npm install --force
npm run build

echo "📦 Moving build files to backend..."
rm -rf ../backend/public
mkdir -p ../backend/public
cp -r dist/* ../backend/public/

echo "🏗️ Building Docker image..."
cd ../backend
docker build -t xcompare:latest .

echo "🐳 Stopping existing container if running..."
docker stop xcompare 2>/dev/null || true
docker rm xcompare 2>/dev/null || true

echo "🚀 Starting new container..."
docker run -d \
    --name xcompare \
    -p 1602:5000 \
    -e NODE_ENV=production \
    xcompare:latest

echo "✨ Done! Application is running at http://localhost:1602"
