#!/bin/bash

# GitHub 저장소 설정 스크립트
# 사용법: ./github-setup.sh [username] [repository-name]

USERNAME=${1:-"MarineGift"}
REPO_NAME=${2:-"marinebiogroup-website"}

echo "🚀 GitHub 저장소 설정을 시작합니다..."
echo "Username: $USERNAME"
echo "Repository: $REPO_NAME"

# Git 초기화 (이미 초기화되어 있다면 건너뛰기)
if [ ! -d ".git" ]; then
  echo "📦 Git 저장소를 초기화합니다..."
  git init
fi

# 현재 파일들을 스테이징
echo "📁 파일들을 추가합니다..."
git add .

# 초기 커밋
echo "💾 초기 커밋을 생성합니다..."
git commit -m "Initial commit: MarineBioGroup website with drag-and-drop upload feature

Features:
- Full-stack React + Express application
- Drag-and-drop image upload system
- Multi-language support foundation
- Admin management system
- Supabase database integration
- Netlify deployment ready"

# 메인 브랜치 설정
echo "🌟 메인 브랜치를 설정합니다..."
git branch -M main

# 원격 저장소 추가
echo "🔗 원격 저장소를 연결합니다..."
git remote add origin https://github.com/$USERNAME/$REPO_NAME.git

echo "✅ 설정 완료!"
echo ""
echo "다음 단계:"
echo "1. GitHub에서 새 저장소 '$REPO_NAME'를 생성하세요"
echo "2. 다음 명령어로 업로드하세요:"
echo "   git push -u origin main"
echo ""
echo "Netlify 배포를 위한 환경 변수:"
echo "- DATABASE_URL: [Supabase 데이터베이스 URL]"
echo "- SITE_NAME: marinebiogroup"
echo "- COMPANY_NAME: MarineBioGroup"
echo "- DOMAIN_NAME: marinebiogroup.com"