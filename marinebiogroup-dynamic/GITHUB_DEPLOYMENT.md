# MarineBioGroup GitHub Deployment Guide

## 빠른 시작

1. **GitHub Repository 생성**
   ```bash
   # Repository: marinebiogroup
   # Description: Marine nano-fiber technology website
   ```

2. **파일 업로드**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: MarineBioGroup dynamic website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/marinebiogroup.git
   git push -u origin main
   ```

3. **환경 변수 설정**
   - Supabase DATABASE_URL 설정
   - .env 파일에서 환경변수 구성

4. **배포 실행**
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

## 주요 기능

✅ React + TypeScript 프론트엔드
✅ Express.js 백엔드 API
✅ Supabase PostgreSQL 데이터베이스
✅ 관리자 인증 시스템
✅ 갤러리, 뉴스, 블로그 관리
✅ 다국어 지원 기반
✅ 반응형 디자인 (Tailwind CSS)

## 관리자 접속

- URL: /admin-login-direct
- 계정: admin / 1111

## 배포 옵션

1. **Netlify**: 정적 + 서버리스 함수
2. **Vercel**: Next.js 스타일 배포
3. **Railway**: 풀스택 배포
4. **Render**: 무료 호스팅

모든 옵션이 이 패키지와 호환됩니다.
