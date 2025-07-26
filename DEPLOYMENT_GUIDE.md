# 🚀 MarineBioGroup 무료 배포 완전 가이드

## 현재 상황
- 드래그 앤 드롭 파일 업로드 기능 완성
- GitHub + Supabase + Netlify 무료 배포 파이프라인 구축 완료
- 멀티언어 지원 기반 시설 완료
- 환경 변수 기반 멀티사이트 시스템 준비

## 📋 1단계: GitHub 저장소 생성 및 업로드

### GitHub 웹사이트에서 저장소 생성
1. [GitHub](https://github.com)에 로그인
2. 우측 상단 `+` 버튼 클릭 → `New repository` 선택
3. 저장소 설정:
   - **Repository name**: `marinebiogroup-website`
   - **Description**: `Marine nano-fiber technology website with drag-and-drop upload and free deployment`
   - **Visibility**: `Public` (무료 배포를 위해 필수)
   - **Initialize this repository**: 체크하지 않음
4. `Create repository` 클릭

### 로컬 터미널에서 업로드 (Replit 셸에서 실행)
```bash
# 1. 프로젝트 폴더로 이동 (이미 여기에 있음)
pwd

# 2. Git 사용자 정보 설정 (처음 사용하는 경우)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 3. Git 저장소 초기화
git init

# 4. 모든 파일 추가
git add .

# 5. 초기 커밋 생성
git commit -m "Initial commit: MarineBioGroup website

Features:
- Drag-and-drop image upload system  
- Multi-language support foundation
- Admin management system
- Supabase database integration
- Netlify deployment ready
- Complete free deployment pipeline"

# 6. 메인 브랜치 설정
git branch -M main

# 7. 원격 저장소 연결 (YOUR_USERNAME을 실제 사용자명으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/marinebiogroup-website.git

# 8. GitHub에 업로드
git push -u origin main
```

## 📋 2단계: Supabase 데이터베이스 설정

### 무료 계정 생성 및 프로젝트 설정
1. [Supabase](https://supabase.com)에서 무료 계정 생성
2. `New project` 클릭
3. 프로젝트 설정:
   - **Name**: `marinebiogroup`
   - **Database Password**: 안전한 비밀번호 설정 (기록해두세요)
   - **Region**: `Northeast Asia (ap-northeast-1)` 선택
4. `Create new project` 클릭
5. 프로젝트 생성 완료 (1-2분 소요)

### 데이터베이스 연결 정보 복사
1. 프로젝트 대시보드에서 `Settings` → `Database` 이동
2. `Connection string` 섹션에서 `URI` 복사
3. 형식: `postgresql://postgres:[YOUR-PASSWORD]@[PROJECT-REF].supabase.co:5432/postgres`
4. `[YOUR-PASSWORD]` 부분을 실제 설정한 비밀번호로 변경

## 📋 3단계: Netlify 무료 배포

### 계정 생성 및 GitHub 연동
1. [Netlify](https://netlify.com)에서 무료 계정 생성
2. `Add new site` → `Import an existing project` 클릭
3. `Deploy with GitHub` 선택
4. GitHub 계정 연동 승인

### 저장소 선택 및 배포 설정
1. 저장소 선택: `marinebiogroup-website`
2. 배포 설정:
   - **Branch to deploy**: `main`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist/public`
3. `Show advanced` 클릭하여 환경 변수 설정

### 환경 변수 추가
다음 환경 변수들을 추가하세요:
```
DATABASE_URL: [2단계에서 복사한 Supabase URL]
NODE_ENV: production
SITE_NAME: marinebiogroup
COMPANY_NAME: MarineBioGroup
DOMAIN_NAME: marinebiogroup.com
SUPPORT_EMAIL: support@marinebiogroup.com
THEME_PRIMARY: #0066cc
THEME_SECONDARY: #00aa44
```

### 배포 실행
1. `Deploy site` 클릭
2. 빌드 과정 모니터링 (5-10분 소요)
3. 배포 완료 후 제공되는 URL 확인 (예: `amazing-site-123.netlify.app`)

## 📋 4단계: 배포 확인 및 테스트

### 웹사이트 기능 테스트
1. 제공된 Netlify URL 접속
2. 메인 페이지 로딩 확인
3. 네비게이션 메뉴 동작 확인
4. 드래그 앤 드롭 업로드 기능 테스트:
   - 어드민 로그인 (`/admin-login`): `admin` / `1111`
   - 캐러셀 관리에서 이미지 업로드 테스트
   - 갤러리 관리에서 이미지 업로드 테스트

### 자동 배포 확인
1. GitHub에서 코드 수정 후 커밋/푸시
2. Netlify에서 자동 빌드 시작 확인
3. 배포 완료 후 변경사항 반영 확인

## 📋 5단계: 커스텀 도메인 연결 (선택사항)

### 무료 도메인 옵션
- **Freenom**: `.tk`, `.ml`, `.ga`, `.cf` 도메인 무료 제공
- **기존 도메인**: 보유하고 있는 도메인 사용

### Netlify에서 도메인 설정
1. Netlify 대시보드 → `Site settings` → `Domain management`
2. `Add custom domain` 클릭
3. 도메인 입력 (예: `marinebiogroup.com`)
4. DNS 설정 안내에 따라 도메인 제공업체에서 설정:
   - **A Record**: `75.2.60.5`
   - **CNAME Record**: `www` → `your-site-name.netlify.app`
5. DNS 전파 대기 (최대 24시간)
6. HTTPS 인증서 자동 발급 확인

## 💰 비용 분석

### 완전 무료 구성
- **GitHub**: Public 저장소 무료
- **Supabase 무료 tier**:
  - 500MB 데이터베이스
  - 50MB 파일 스토리지  
  - 월 5GB 대역폭
  - 50,000 월간 활성 사용자
- **Netlify 무료 tier**:
  - 월 100GB 대역폭
  - 월 300분 빌드 시간
  - HTTPS 인증서 포함
  - 1개 동시 빌드

### 확장 시 비용 (참고용)
- **Supabase Pro**: $25/월 (8GB DB, 100GB 스토리지)
- **Netlify Pro**: $19/월 (무제한 대역폭, 3개 동시 빌드)

## 🔧 문제 해결

### Git 관련 오류
```bash
# 상태 확인
git status

# 커밋 히스토리 확인  
git log --oneline

# 원격 저장소 URL 확인
git remote -v

# 원격 저장소 변경 (필요시)
git remote set-url origin https://github.com/USERNAME/REPO.git
```

### 빌드 오류 해결
1. **Netlify 빌드 로그 확인**: 대시보드에서 실패한 배포 클릭
2. **환경 변수 재확인**: 모든 필수 변수가 설정되었는지 확인
3. **로컬 빌드 테스트**: `npm run build` 로컬에서 실행

### 데이터베이스 연결 오류
1. **DATABASE_URL 형식 확인**: PostgreSQL URI 형식이 올바른지 확인
2. **Supabase 프로젝트 상태**: 프로젝트가 정상 실행 중인지 확인
3. **네트워크 설정**: Supabase에서 모든 IP 허용 설정 확인

## ✅ 성공적인 배포 후 혜택

### 자동화된 워크플로우
- 코드 변경 시 자동 빌드 및 배포
- GitHub Actions를 통한 CI/CD 파이프라인
- 롤백 및 브랜치별 프리뷰 배포

### 멀티사이트 운영
하나의 코드베이스로 여러 브랜드 웹사이트 운영:
```bash
# 사이트별 환경 변수 설정으로 브랜딩 변경
SITE_NAME=oceantech
COMPANY_NAME=OceanTech  
DOMAIN_NAME=oceantech.com
THEME_PRIMARY=#0088cc
```

### 글로벌 CDN 및 성능
- Netlify의 글로벌 CDN을 통한 빠른 로딩
- 자동 이미지 최적화
- HTTP/2 및 Brotli 압축

## 🚀 다음 단계

1. **GitHub 저장소 생성 및 코드 업로드**
2. **Supabase 프로젝트 생성**  
3. **Netlify 배포 설정**
4. **도메인 연결 (선택)**
5. **멀티언어 콘텐츠 추가**

완료 후 완전한 프로덕션 웹사이트를 무료로 운영할 수 있습니다!