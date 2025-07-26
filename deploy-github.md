# GitHub 배포 가이드

## 🚀 GitHub Repository에 업로드하기

### 1. GitHub Repository 생성
1. GitHub에 로그인 후 새 repository 생성
2. Repository 이름: `marinebiogroup`
3. Public으로 설정 (또는 Private)

### 2. 코드 업로드
```bash
# Git 초기화
git init

# 모든 파일 추가
git add .

# 커밋
git commit -m "Initial commit: MarineBioGroup fullstack application"

# GitHub repository 연결 (YOUR_USERNAME 교체)
git remote add origin https://github.com/YOUR_USERNAME/marinebiogroup.git

# 메인 브랜치로 푸시
git branch -M main
git push -u origin main
```

## 🗄️ Supabase 데이터베이스 설정

### 1. Supabase 프로젝트 생성
1. [Supabase 대시보드](https://supabase.com/dashboard/projects) 접속
2. "New Project" 클릭
3. 프로젝트 정보 입력:
   - Name: `marinebiogroup`
   - Database Password: 안전한 비밀번호 설정
   - Region: 가장 가까운 지역 선택

### 2. 데이터베이스 연결 정보 가져오기
1. 프로젝트 생성 완료 후 "Connect" 버튼 클릭
2. "Connection string" 탭 선택
3. "Transaction pooler" 선택
4. URI 복사 후 `[YOUR-PASSWORD]`를 실제 비밀번호로 교체

예시:
```
postgresql://postgres.abcdefghijk:realpassword@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres
```

### 3. 환경변수 설정
프로젝트 루트에 `.env` 파일 생성:
```env
DATABASE_URL=postgresql://postgres.abcdefghijk:realpassword@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres
NODE_ENV=development
```

### 4. 데이터베이스 스키마 배포
```bash
npm run db:push
```

## 🌐 배포 옵션

### Option 1: Netlify (풀스택 배포)

1. **프로젝트 빌드**
```bash
chmod +x build.sh
./build.sh
```

2. **Netlify에 배포**
```bash
npx netlify-cli deploy --prod --dir=dist/public
```

3. **환경변수 설정**
Netlify 대시보드에서 환경변수 추가:
- `DATABASE_URL`: Supabase 연결 문자열

### Option 2: GitHub Pages (프론트엔드만)

1. **프론트엔드 빌드**
```bash
npm run build:client
```

2. **GitHub Pages 설정**
- Repository Settings → Pages
- Source: "Deploy from a branch"
- Branch: `gh-pages` (또는 `main`)
- Folder: `/dist/public`

3. **백엔드 별도 배포**
`dist/index.js`를 Railway, Render 등에 별도 배포

### Option 3: Vercel

```bash
npx vercel --prod
```

환경변수 설정:
```bash
vercel env add DATABASE_URL
```

## 🔧 로컬 개발 환경

### 설치 및 실행
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### Admin 접속
- URL: `http://localhost:5000/admin`
- 계정: `admin` / `1111`

## 📊 확인사항

배포 후 다음 기능들이 정상 작동하는지 확인:

- ✅ 웹사이트 로딩 (홈페이지)
- ✅ Admin 로그인 (admin/1111)
- ✅ Newsletter 구독 기능
- ✅ Contact 폼 제출
- ✅ Blog/News/Gallery 표시
- ✅ 다국어 지원 (영어/한국어/일본어/스페인어)
- ✅ 반응형 디자인 (모바일/데스크톱)

## 🆘 문제 해결

### 데이터베이스 연결 실패
1. DATABASE_URL 환경변수 확인
2. Supabase 프로젝트 상태 확인
3. 네트워크 연결 확인

### Admin 로그인 불가
- 메모리 스토리지 백업으로 `admin/1111` 계정 항상 사용 가능
- 브라우저 캐시 삭제 후 재시도

### 빌드 오류
```bash
# 의존성 재설치
rm -rf node_modules package-lock.json
npm install

# 타입스크립트 체크
npm run check
```

---

**상태**: ✅ GitHub 업로드 및 Supabase 연결 준비 완료!