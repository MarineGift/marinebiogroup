# MarineBioGroup Website

해양 나노섬유 기술을 활용한 지속 가능한 뷰티 및 라이프스타일 제품 회사 웹사이트

## ⚠️ 다운로드 안내

**프로젝트 전체를 ZIP으로 다운로드하면 크기가 너무 큽니다 (900MB+)**

### 권장 다운로드 방법:
**필요한 파일들만 개별 다운로드하세요:**

1. **src/** 폴더 전체 (완전한 Next.js 앱)
2. **README.md** (이 파일)
3. **next.config.js**
4. **tailwind.config.js** 
5. **postcss.config.js**
6. **package.json**

### 또는 Replit에서 직접 복사:
Replit Files 패널에서 위 파일들을 새 프로젝트로 복사하세요.

## 주요 기능

- **반응형 웹사이트**: 모바일, 태블릿, 데스크톱 지원
- **해양 테마 디자인**: 바다를 모티브로 한 아름다운 UI/UX
- **연락처 폼**: nodemailer를 통한 이메일 발송 기능
- **관리자 대시보드**: 메시지 관리 시스템
- **다국어 지원**: 한국어 기본, 확장 가능
- **SEO 최적화**: 검색 엔진 최적화 구현

## 기술 스택

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Email**: Nodemailer
- **Database**: Supabase (PostgreSQL)

## 설치 및 실행

1. 의존성 설치:
```bash
npm install
```

2. 환경 변수 설정:
```bash
cp src/.env.example src/.env.local
# .env.local 파일을 열어서 실제 값으로 수정
```

3. 개발 서버 실행:
```bash
cd src
npm run dev
```

## 환경 변수 설정

### Supabase 설정
1. [Supabase](https://supabase.com)에서 프로젝트 생성
2. Settings > API에서 URL과 anon key 복사
3. `.env.local`에 설정:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 이메일 설정 (Gmail 예시)
1. Gmail에서 2단계 인증 활성화
2. 앱 비밀번호 생성 (16자리)
3. `.env.local`에 설정:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-digit-app-password
SMTP_FROM=your-email@gmail.com
```

## 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── api/contact/       # 연락처 API
│   ├── admin/             # 관리자 페이지
│   ├── about/             # 회사 소개
│   ├── technology/        # 기술 소개
│   ├── products/          # 제품 소개
│   ├── contact/           # 연락처
│   └── layout.tsx         # 레이아웃
├── components/            # React 컴포넌트
│   ├── ui/               # 기본 UI 컴포넌트
│   ├── layout/           # 레이아웃 컴포넌트
│   └── sections/         # 섹션 컴포넌트
├── lib/                  # 유틸리티 함수
│   └── email.ts          # 이메일 발송 로직
└── hooks/                # 커스텀 훅
```

## 주요 페이지

- **홈페이지** (`/`): 회사 소개 및 주요 서비스
- **회사 소개** (`/about`): 미션, 팀, 회사 히스토리
- **기술** (`/technology`): 해양 나노섬유 기술 소개
- **제품** (`/products`): 뷰티 및 라이프스타일 제품
- **연락처** (`/contact`): 문의 폼 및 회사 정보
- **관리자** (`/admin`): 메시지 관리 (로그인: admin/1111)

## 배포

### Vercel 배포
1. Vercel에 프로젝트 연결
2. 환경 변수 설정
3. `src` 폴더를 루트로 설정

### 기타 플랫폼
- Netlify, Railway 등에서도 배포 가능
- `src` 폴더가 Next.js 앱의 루트임을 확인

## 개발 가이드

### 컴포넌트 추가
- `src/components/` 폴더에 새 컴포넌트 추가
- Tailwind CSS 사용 권장

### API 라우트 추가
- `src/app/api/` 폴더에 새 API 추가
- TypeScript 사용 필수

### 스타일링
- Tailwind CSS 클래스 사용
- 해양 테마 색상: `marine-*` 클래스 활용

## 라이선스

© 2024 MarineBioGroup. All rights reserved.