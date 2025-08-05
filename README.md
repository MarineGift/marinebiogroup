# MarineBioGroup Website

Next.js 15 기반의 현대적인 MarineBioGroup 웹사이트입니다. 해양 나노 섬유 기술을 전문으로 하는 기업을 위한 완전한 웹 솔루션입니다.

## 🌊 주요 기능

- **Next.js 15.4.5** App Router 구조
- **TypeScript** 완전 지원
- **Tailwind CSS** 해양 테마 디자인
- **Supabase** 데이터베이스 통합 준비
- **Railway** 배포 최적화
- **반응형** 모바일 친화적 디자인
- **관리자 대시보드** (admin/1111)

## 📁 프로젝트 구조

```
marinebiogroup-nextjs-clean/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── page.tsx        # 홈페이지
│   │   ├── about/          # 회사 소개
│   │   ├── technology/     # 기술 소개
│   │   ├── products/       # 제품 소개
│   │   ├── contact/        # 연락처
│   │   ├── admin/login/    # 관리자 로그인
│   │   └── api/            # API 라우트
│   ├── components/         # 재사용 컴포넌트
│   │   └── ui/            # UI 컴포넌트
│   ├── lib/               # 유틸리티 함수
│   └── hooks/             # 커스텀 훅
├── public/                # 정적 파일
└── package.json          # 의존성 관리
```

## 🚀 시작하기

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 시작
```bash
npm run dev
```

### 3. 브라우저에서 확인
```
http://localhost:3000
```

## 🔧 주요 페이지

- **홈페이지** (`/`) - 메인 랜딩 페이지
- **회사 소개** (`/about`) - 팀, 미션, 연혁
- **기술** (`/technology`) - 나노 섬유 기술 소개
- **제품** (`/products`) - 제품 카탈로그
- **연락처** (`/contact`) - 문의 양식
- **관리자** (`/admin/login`) - 관리자 로그인

## 🎨 디자인 시스템

### 컬러 팔레트
- **Primary**: Marine Blue (#0ea5e9)
- **Secondary**: Deep Ocean (#0369a1)
- **Accent**: Light Blue (#38bdf8)

### 컴포넌트
- **Button**: 다양한 스타일의 버튼
- **Card**: 콘텐츠 카드
- **Toast**: 알림 메시지

## 🔐 관리자 시스템

### 로그인 정보
- **사용자명**: admin
- **비밀번호**: 1111

### 관리 기능
- 콘텐츠 관리
- 연락처 관리
- 제품 관리

## 🌐 배포

### Railway 배포
```bash
npm run build
npm run start
```

### Vercel 배포
```bash
vercel --prod
```

### Netlify 배포
```bash
npm run build
# dist 폴더를 Netlify에 업로드
```

## 📦 의존성

### 주요 의존성
- `next`: 15.4.5
- `react`: 18.3.1
- `typescript`: 5.8.3
- `tailwindcss`: 3.4.17
- `framer-motion`: 11.11.17

### UI 라이브러리
- `@radix-ui/*`: 접근성 우선 UI 컴포넌트
- `lucide-react`: 아이콘 라이브러리
- `class-variance-authority`: 클래스 변형 관리

## 🔄 개발 스크립트

```bash
npm run dev      # 개발 서버 시작
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 시작
npm run lint     # 코드 린팅
```

## 📱 반응형 디자인

- **Mobile**: 320px+
- **Tablet**: 768px+
- **Desktop**: 1024px+
- **Large**: 1280px+

## 🎯 SEO 최적화

- 메타 태그 완전 설정
- Open Graph 태그
- 구조화된 데이터
- 시맨틱 HTML

## 🤝 기여 방법

1. 이 저장소를 포크합니다
2. 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 지원

문의사항이 있으시면 다음으로 연락해주세요:
- 이메일: info@marinebiogroup.com
- 웹사이트: https://marinebiogroup.com

---

**MarineBioGroup** - 지속 가능한 미래를 위한 혁신적인 해양 나노 섬유 기술