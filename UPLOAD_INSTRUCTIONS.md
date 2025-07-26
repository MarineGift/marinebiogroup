# 📁 GitHub 파일 업로드 완전 가이드

## 현재 상황
- Replit에서 Git 명령어 제한
- 수동으로 GitHub에 파일 업로드 필요
- Netlify가 GitHub 저장소를 모니터링하여 자동 배포

## 🎯 방법 1: GitHub 웹 인터페이스 사용 (권장)

### 1단계: 중요 파일들 확인
다음 파일들이 업로드되어야 합니다:
```
📁 client/ (전체 폴더)
📁 server/ (전체 폴더)  
📁 shared/ (전체 폴더)
📁 .github/ (GitHub Actions 설정)
📁 netlify/ (Netlify Functions)
📁 images/ (이미지 폴더)
📄 package.json
📄 package-lock.json
📄 netlify.toml
📄 vite.config.ts
📄 tailwind.config.ts
📄 tsconfig.json
📄 drizzle.config.ts
📄 components.json
📄 postcss.config.js
📄 .gitignore
📄 README.md
```

### 2단계: GitHub에서 파일 업로드
1. **GitHub 저장소 페이지 이동**
   - https://github.com/YOUR_USERNAME/marinebiogroup-website

2. **파일 업로드**
   - "Add file" → "Upload files" 클릭
   - 또는 파일을 드래그 앤 드롭

3. **중요 폴더별 업로드**
   - `client/` 폴더 전체 업로드
   - `server/` 폴더 전체 업로드
   - 기타 필수 파일들 업로드

## 🎯 방법 2: Replit에서 다운로드 후 업로드

### 1단계: Replit에서 파일 다운로드
1. Replit 파일 탐색기에서 각 폴더/파일 우클릭
2. "Download" 선택
3. 로컬 컴퓨터에 저장

### 2단계: GitHub에 업로드
1. GitHub 저장소에서 "Add file" → "Upload files"
2. 다운로드한 파일들을 드래그 앤 드롭
3. 폴더 구조 유지하며 업로드

## 🎯 방법 3: Replit GitHub Integration (만약 가능하다면)

### Replit에서 GitHub 연결
1. Replit 프로젝트에서 "Version Control" 탭
2. "Connect to GitHub" 옵션 찾기
3. GitHub 저장소와 연결
4. "Push to GitHub" 실행

## ⚠️ 업로드 시 주의사항

### 제외할 파일들
```
❌ node_modules/ (용량이 크고 불필요)
❌ .git/ (충돌 가능성)
❌ dist/ (빌드 결과물, 자동 생성됨)
❌ .replit (Replit 전용 설정)
❌ .cache/ (캐시 폴더)
❌ .local/ (로컬 설정)
❌ .upm/ (Replit 패키지 관리)
```

### 반드시 포함할 파일들
```
✅ package.json (의존성 정보)
✅ package-lock.json (정확한 버전)
✅ netlify.toml (Netlify 설정)
✅ .github/workflows/ (GitHub Actions)
✅ client/ src/ (React 앱)
✅ server/ (Express 서버)
✅ shared/ (공통 스키마)
```

## 📋 업로드 후 확인사항

### 1. GitHub 저장소 확인
- 모든 중요 파일이 업로드되었는지 확인
- 폴더 구조가 올바른지 확인
- README.md가 제대로 표시되는지 확인

### 2. Netlify 자동 배포 확인
1. Netlify 대시보드 이동
2. 연결된 프로젝트에서 "Deploys" 탭 확인
3. GitHub 업로드 후 자동 빌드 시작 여부 확인
4. 빌드 로그에서 오류 없이 완료되는지 확인

### 3. 배포된 웹사이트 테스트
1. Netlify에서 제공하는 URL 접속
2. 메인 페이지 로딩 확인
3. 모든 네비게이션 동작 확인
4. 관리자 기능 테스트:
   - `/admin-login` 접속
   - 로그인: `admin` / `1111`
   - 드래그 앤 드롭 업로드 테스트

## 🔧 문제 해결

### 업로드 실패 시
- 파일 크기 제한 확인 (GitHub: 100MB 미만)
- 브라우저 새로고침 후 재시도
- 큰 폴더는 나누어서 업로드

### 빌드 실패 시
- Netlify 빌드 로그 확인
- package.json 파일이 올바르게 업로드되었는지 확인
- 환경 변수가 모두 설정되었는지 확인

### 자동 배포 안 되는 경우
- GitHub 저장소와 Netlify 연결 상태 확인
- "main" 브랜치에 파일이 업로드되었는지 확인
- Netlify에서 수동으로 "Trigger deploy" 실행

## ✅ 성공 지표

1. **GitHub**: 모든 파일 업로드 완료
2. **Netlify**: 자동 빌드 성공
3. **웹사이트**: 정상적으로 접속 가능
4. **기능**: 드래그 앤 드롭 업로드 동작

완료되면 완전한 프로덕션 웹사이트가 준비됩니다!