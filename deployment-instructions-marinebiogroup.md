# MarineBioGroup Admin System Deployment Instructions

## 문제 상황
- marinebiogroup.com은 현재 정적 HTML로 배포됨
- 관리자 로그인 기능이 없어서 admin 접속 불가
- 백엔드 API 서버가 배포되지 않음

## 해결 방법

### 1. 즉시 적용 가능한 해결책 (정적 HTML)
다음 파일들을 marinebiogroup.com에 업로드:

**admin-login.html** - 관리자 로그인 페이지
- 경로: https://marinebiogroup.com/admin-login.html
- 로컬 백엔드 서버 연결 기능 포함
- 프로덕션에서는 백엔드 필요 메시지 표시

**admin-dashboard.html** - 관리자 대시보드
- 경로: https://marinebiogroup.com/admin-dashboard.html  
- 기본 통계 및 시스템 상태 표시
- 백엔드 연결 시 실시간 데이터 로드

### 2. 업로드 방법

#### GitHub 방식:
```bash
# 파일들을 GitHub repository에 추가
git add admin-login.html admin-dashboard.html
git commit -m "Add admin system for marinebiogroup.com"
git push origin marinebiogroup
```

#### 직접 업로드 방식:
1. Netlify 대시보드에서 marinebiogroup 사이트 선택
2. Site settings > Build & deploy > Deploy contexts
3. admin-login.html, admin-dashboard.html 파일 업로드

### 3. 완전한 기능을 위한 백엔드 배포 (선택사항)

현재 로컬에서 작동하는 Node.js 백엔드를 배포하려면:

#### Railway/Render 배포:
1. server/ 폴더를 별도 저장소로 분리
2. Railway 또는 Render에 배포
3. DATABASE_URL 환경변수 설정 (Supabase)
4. admin-login.html에서 API URL 업데이트

#### Supabase Functions (추천):
1. server/routes.ts를 Supabase Edge Functions로 마이그레이션
2. 완전 서버리스 아키텍처
3. 무료 사용 가능

### 4. 접속 방법

배포 후 접속:
- **관리자 로그인**: https://marinebiogroup.com/admin-login.html
- **대시보드**: https://marinebiogroup.com/admin-dashboard.html
- **계정**: admin / 1111

### 5. 현재 상태

✅ HTML 파일 생성 완료
✅ 로컬 백엔드 호환성 포함
✅ 프로덕션 환경 대응
⏳ GitHub/Netlify 업로드 필요
⏳ 백엔드 배포 (옵션)

## 우선순위

1. **즉시**: admin-login.html, admin-dashboard.html 업로드
2. **나중에**: 백엔드 API 서버 배포 (완전한 기능을 원할 때)

이 방법으로 marinebiogroup.com에서 관리자 로그인이 가능해집니다.