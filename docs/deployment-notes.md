# RandomPot Deployment Notes (1st)

현재 배포/환경 설정 기준을 빠르게 재현하기 위한 운영 메모입니다.

## 1) 프로젝트 개요
- Frontend: Next.js + TypeScript
- Backend: Spring Boot + Java
- Frontend 배포: Vercel
- Backend 배포: Render

## 2) 현재 주요 환경값

### NEXT_PUBLIC_SITE_URL
- 사용 여부: 사용 중
- 기본 fallback: `https://randompot.vercel.app`
- 사용 위치:
  - `frontend/src/app/layout.tsx`
    - `metadataBase`
    - `alternates.canonical` (절대 URL 해석 기준)
    - `openGraph.url` (절대 URL 해석 기준)
  - `frontend/src/app/robots.ts`
    - `sitemap` URL 생성
  - `frontend/src/app/sitemap.ts`
    - 각 route 절대 URL 생성

### NEXT_PUBLIC_API_BASE_URL
- 사용 여부: 사용 중 (프론트 API 요청 베이스 URL)
- 기본 fallback: `http://localhost:8080`
- 사용 위치:
  - `frontend/src/lib/api.ts`

## 3) 배포 시 확인 포인트

### 프론트 배포 URL
- `NEXT_PUBLIC_SITE_URL`가 실제 프론트 도메인과 일치하는지 확인
- 홈 진입 및 주요 라우트(`/roulette`, `/punishment`, `/mission`, `/team`) 접근 확인

### 백엔드 API 연결
- 프론트 기능 실행 시 네트워크 요청 대상이 의도한 백엔드 URL인지 확인
- 실패 시 `NEXT_PUBLIC_API_BASE_URL` 값/오타 우선 확인

### 공유 미리보기(OG/image)
- 메타 확인:
  - `og:title`, `og:description`, `og:url`, `og:image`
  - `twitter:title`, `twitter:description`, `twitter:image`
- `og:image` 경로(`/og-image.svg`) 접근 가능 여부 확인

### robots / sitemap
- `/<site>/robots.txt` 접근 가능
- `/<site>/sitemap.xml` 접근 가능
- sitemap에 다음 경로 포함 확인:
  - `/`
  - `/roulette`
  - `/punishment`
  - `/mission`
  - `/team`

### manifest
- `/<site>/manifest.webmanifest` 접근 가능
- 앱 이름/아이콘/theme color 반영 확인

## 4) 변경 시 주의사항

### 사이트 URL 변경 시
- `NEXT_PUBLIC_SITE_URL`를 우선 갱신
- 함께 점검:
  - canonical 절대 URL
  - `og:url`
  - `robots.txt`의 sitemap URL
  - `sitemap.xml`의 각 URL

### 아이콘/OG 이미지 변경 시
- `frontend/public` 자산 경로 유지 여부 확인
  - `/favicon.svg`
  - `/icon.svg`
  - `/og-image.svg`
- `layout.tsx` metadata 연결값(`icons`, `openGraph.images`, `twitter.images`) 재확인
- 공유 디버거에서 캐시 갱신 후 미리보기 재검증

### 기능 페이지 라우트 변경 시
- 다음 파일을 함께 점검:
  - `frontend/src/app/sitemap.ts` (route 목록)
  - `frontend/src/app/not-found.tsx` (복귀 링크)
  - `frontend/src/app/page.tsx` (홈 CTA 링크)

## 5) 배포 후 최소 점검 순서
1. 홈 진입 확인
2. 기능 4개 실행 확인
3. 복사/공유 동작 확인
4. sessionStorage 입력 복원 확인
5. 최근 결과 히스토리(추가/삭제/전체 비우기) 확인
6. `not-found` / `error` 동작 확인
7. OG / robots / sitemap / manifest 최종 확인
