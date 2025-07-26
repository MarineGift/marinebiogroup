# 무료 배포 가이드 - GitHub + Supabase + Netlify

## 개요
이 가이드는 비용 지불 없이 GitHub, Supabase, Netlify를 활용해서 멀티언어 웹사이트를 배포하는 방법을 설명합니다.

## 1단계: GitHub 저장소 설정

### GitHub 저장소 생성
1. [GitHub](https://github.com)에 로그인
2. 새 저장소 생성: `marinebiogroup-website`
3. Public 저장소로 설정 (무료 배포를 위해 필수)

### 로컬 파일을 GitHub에 업로드
```bash
# 현재 프로젝트 디렉토리에서 실행
git init
git add .
git commit -m "Initial commit: MarineBioGroup website"
git branch -M main
git remote add origin https://github.com/yourusername/marinebiogroup-website.git
git push -u origin main
```

## 2단계: Supabase 데이터베이스 설정

### Supabase 프로젝트 생성
1. [Supabase](https://supabase.com) 무료 계정 생성
2. 새 프로젝트 생성
3. 데이터베이스 URL 복사: `Settings` → `Database` → `Connection string`

### 환경 변수 설정
프로젝트에서 다음 환경 변수가 필요합니다:
- `DATABASE_URL`: Supabase 데이터베이스 연결 문자열
- `NODE_ENV`: `production`

## 3단계: Netlify 무료 배포

### Netlify 계정 연동
1. [Netlify](https://netlify.com) 무료 계정 생성
2. GitHub 계정과 연동
3. "New site from Git" 선택
4. GitHub 저장소 선택: `marinebiogroup-website`

### 빌드 설정
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Environment variables**:
  - `DATABASE_URL`: [Supabase 연결 문자열]
  - `NODE_ENV`: `production`

### 배포 설정
Netlify는 자동으로 다음을 제공합니다:
- 무료 HTTPS 인증서
- 자동 배포 (GitHub push 시)
- 커스텀 도메인 연결 가능

## 4단계: GitHub Actions 자동 배포 (선택사항)

GitHub Actions를 통한 자동 배포 파이프라인:

```yaml
# .github/workflows/deploy.yml
name: Deploy to Netlify

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build
      run: npm run build
      env:
        DATABASE_URL: ${{ secrets.DATABASE_URL }}
        NODE_ENV: production
        
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v1.2
      with:
        publish-dir: './dist'
        production-branch: main
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 5단계: 도메인 연결

### 무료 도메인 옵션
1. **Netlify 서브도메인**: `your-app-name.netlify.app` (무료)
2. **커스텀 도메인**: 
   - Freenom에서 무료 도메인 (.tk, .ml, .ga, .cf)
   - 또는 기존 도메인이 있다면 Netlify에서 DNS 설정

### DNS 설정
Netlify에서 커스텀 도메인 추가:
1. Site settings → Domain management
2. Add custom domain
3. DNS 레코드 설정 안내 따라하기

## 비용 분석

### 완전 무료 구성
- **GitHub**: Public 저장소 무료
- **Supabase**: 
  - 무료 tier: 500MB 데이터베이스
  - 50MB 파일 스토리지
  - 월 5GB 대역폭
- **Netlify**: 
  - 무료 tier: 월 100GB 대역폭
  - 월 300분 빌드 시간
  - HTTPS 인증서 포함

### 확장 시 비용
- Supabase Pro: $25/월 (8GB 데이터베이스, 100GB 스토리지)
- Netlify Pro: $19/월 (무제한 대역폭, 25개 사이트)

## 다중 사이트 지원

### 환경 변수를 통한 멀티 사이트
하나의 코드베이스로 여러 브랜드 사이트 운영:

```bash
# Site 1: MarineBioGroup
SITE_NAME=marinebiogroup
COMPANY_NAME=MarineBioGroup
DOMAIN_NAME=marinebiogroup.com

# Site 2: OceanTech
SITE_NAME=oceantech
COMPANY_NAME=OceanTech
DOMAIN_NAME=oceantech.com
```

각 사이트별로 별도 Netlify 프로젝트와 환경 변수 설정으로 운영 가능.

## 다음 단계

1. GitHub 저장소 생성 및 코드 업로드
2. Supabase 프로젝트 생성 및 데이터베이스 연결
3. Netlify 배포 설정
4. 도메인 연결 (선택사항)
5. 멀티언어 콘텐츠 추가 및 테스트

이 방법으로 완전 무료로 프로덕션 레벨의 웹사이트를 운영할 수 있습니다.