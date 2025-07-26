#!/bin/bash

# GitHub 업로드 및 배포 완전 가이드
# MarineBioGroup 웹사이트 무료 배포

echo "🚀 MarineBioGroup GitHub 배포 가이드"
echo "=================================="

# 1단계: GitHub 저장소 생성
echo ""
echo "📋 1단계: GitHub 저장소 생성"
echo "1. https://github.com 에 로그인"
echo "2. 우측 상단 '+' 클릭 → 'New repository'"
echo "3. Repository name: marinebiogroup-website"
echo "4. Description: Marine nano-fiber technology website with drag-and-drop upload"
echo "5. Public 선택 (무료 배포를 위해 필수)"
echo "6. 'Create repository' 클릭"
echo ""

# 2단계: 로컬 Git 설정
echo "📋 2단계: 로컬 Git 설정"
echo "다음 명령어들을 순서대로 실행하세요:"
echo ""

# Git 사용자 정보 설정 (필요시)
echo "# Git 사용자 정보 설정 (처음 사용하는 경우)"
echo "git config --global user.name \"Your Name\""
echo "git config --global user.email \"your.email@example.com\""
echo ""

# Git 저장소 초기화
echo "# Git 저장소 초기화"
echo "git init"
echo ""

# 파일 추가
echo "# 모든 파일 추가"
echo "git add ."
echo ""

# 초기 커밋
echo "# 초기 커밋 생성"
echo "git commit -m \"Initial commit: MarineBioGroup website"
echo ""
echo "Features:"
echo "- Drag-and-drop image upload system"
echo "- Multi-language support foundation"
echo "- Admin management system"
echo "- Supabase database integration"
echo "- Netlify deployment ready"
echo "- Free deployment pipeline\""
echo ""

# 메인 브랜치 설정
echo "# 메인 브랜치 설정"
echo "git branch -M main"
echo ""

# 원격 저장소 연결
echo "# 원격 저장소 연결 (YOUR_USERNAME을 실제 GitHub 사용자명으로 변경)"
echo "git remote add origin https://github.com/YOUR_USERNAME/marinebiogroup-website.git"
echo ""

# GitHub에 업로드
echo "# GitHub에 업로드"
echo "git push -u origin main"
echo ""

# 3단계: Supabase 설정
echo "📋 3단계: Supabase 데이터베이스 설정"
echo "1. https://supabase.com 에서 무료 계정 생성"
echo "2. 'New project' 클릭"
echo "3. Project name: marinebiogroup"
echo "4. Database password 설정 (안전한 비밀번호)"
echo "5. Region: Northeast Asia (ap-northeast-1) 선택"
echo "6. 'Create new project' 클릭"
echo "7. 프로젝트 생성 완료 후 Settings → Database 이동"
echo "8. Connection string 복사 (URI 형식)"
echo "   예: postgresql://postgres:[YOUR-PASSWORD]@[PROJECT-REF].supabase.co:5432/postgres"
echo ""

# 4단계: Netlify 배포 설정
echo "📋 4단계: Netlify 무료 배포 설정"
echo "1. https://netlify.com 에서 무료 계정 생성"
echo "2. 'Add new site' → 'Import an existing project'"
echo "3. 'Deploy with GitHub' 선택"
echo "4. GitHub 계정 연동 승인"
echo "5. 저장소 선택: marinebiogroup-website"
echo "6. 배포 설정:"
echo "   - Branch to deploy: main"
echo "   - Build command: npm run build"
echo "   - Publish directory: dist/public"
echo "7. 'Show advanced' 클릭"
echo "8. 환경 변수 추가:"
echo "   - DATABASE_URL: [3단계에서 복사한 Supabase URL]"
echo "   - NODE_ENV: production"
echo "   - SITE_NAME: marinebiogroup"
echo "   - COMPANY_NAME: MarineBioGroup"
echo "   - DOMAIN_NAME: marinebiogroup.com"
echo "9. 'Deploy site' 클릭"
echo ""

# 5단계: 자동 배포 확인
echo "📋 5단계: 자동 배포 확인"
echo "1. Netlify 대시보드에서 배포 상태 확인"
echo "2. 배포 완료 후 제공되는 URL 클릭 (예: amazing-site-123.netlify.app)"
echo "3. 웹사이트가 정상적으로 로드되는지 확인"
echo "4. 이후 GitHub에 코드를 푸시할 때마다 자동 배포됨"
echo ""

# 6단계: 도메인 연결 (선택사항)
echo "📋 6단계: 커스텀 도메인 연결 (선택사항)"
echo "1. Netlify 대시보드 → Site settings → Domain management"
echo "2. 'Add custom domain' 클릭"
echo "3. 도메인 입력 (예: marinebiogroup.com)"
echo "4. DNS 설정 안내에 따라 도메인 제공업체에서 설정"
echo "5. HTTPS 인증서 자동 발급 대기 (몇 분 소요)"
echo ""

# 비용 정보
echo "💰 비용 정보"
echo "- GitHub: Public 저장소 무료"
echo "- Supabase: 무료 tier (500MB DB, 50MB 스토리지)"
echo "- Netlify: 무료 tier (100GB 대역폭/월)"
echo "- 총 비용: 완전 무료!"
echo ""

# 문제 해결
echo "🔧 문제 해결"
echo "Git 오류가 발생하는 경우:"
echo "1. git status 로 상태 확인"
echo "2. git log --oneline 으로 커밋 히스토리 확인"
echo "3. 원격 저장소 URL 확인: git remote -v"
echo ""
echo "배포 오류가 발생하는 경우:"
echo "1. Netlify 배포 로그 확인"
echo "2. 환경 변수 설정 재확인"
echo "3. package.json 스크립트 확인"
echo ""

echo "✅ 설정 완료 후 완전 무료 프로덕션 웹사이트 운영 가능!"
echo "GitHub 저장소: https://github.com/YOUR_USERNAME/marinebiogroup-website"
echo "라이브 사이트: https://your-site-name.netlify.app"