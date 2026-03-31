# RandomPot

친구/모임/술자리/게임팟에서 바로 사용할 수 있는 캐주얼 랜덤 놀이 웹서비스입니다.  
현재 상태는 **MVP 구현 및 배포 완료** 단계입니다.

## 프로젝트 소개
- 모임에서 빠르게 사용할 수 있는 랜덤 도구를 웹으로 제공
- 프론트/백엔드 분리 구조로 운영 중
- 배포 환경 기준으로 기본 UX/공유/운영 점검 항목까지 1차 반영 완료

## 주요 기능
- **룰렛**: 입력한 항목 중 하나를 랜덤으로 선택
- **벌칙 뽑기**: 벌칙 후보 중 하나를 랜덤 추첨
- **랜덤 미션**: 미션 후보 중 하나를 랜덤 선택
- **팀나누기**: 참가자를 팀 수에 맞춰 무작위 분배

## 기술 스택
- **Frontend**: Next.js, TypeScript
- **Backend**: Spring Boot, Java
- **Deployment**: Vercel, Render

## 현재 반영된 UX/운영 포인트
- 모바일 사용성 1차 개선 (입력/버튼/결과 영역 중심)
- 결과 복사 / Web Share API 기반 공유
- 페이지 링크 복사 (홈/기능 페이지)
- 입력값 sessionStorage 복원
- 최근 결과 히스토리 (추가/삭제/전체 비우기)
- 기본 메타/OG/PWA/not-found/error/robots/sitemap 반영

## 실행 방법

### 1) 백엔드 실행
```bash
./mvnw spring-boot:run
```

Windows PowerShell:
```powershell
.\mvnw.cmd spring-boot:run
```

- 기본 주소: `http://localhost:8080`

### 2) 프론트 실행
```bash
cd frontend
npm install
npm run dev
```

- 기본 주소: `http://localhost:3000`

### 3) 환경변수 (프론트)
- `NEXT_PUBLIC_SITE_URL`  
  - 사이트 기준 URL (메타/OG/robots/sitemap 기준)
  - 미설정 시 기본값: `https://randompot.vercel.app`
- `NEXT_PUBLIC_API_BASE_URL`
  - 프론트 API 호출 대상 백엔드 URL
  - 미설정 시 기본값: `http://localhost:8080`

## 배포 정보
- **프론트엔드**: Vercel (`https://randompot.vercel.app`)
- **백엔드**: Render (운영 Render 서비스 URL 기준)

## 운영 문서
- `docs/qa-checklist.md`
- `docs/deployment-notes.md`
- `docs/share-link-design-notes.md`

## 추후 후보 (현재 미구현)
- 고유 결과 공유 링크 고도화
- 히스토리 UX 추가 개선
- 모바일 UX 세부 보완
