# 랜덤팟 현재 진행상황

## 1) 프로젝트 개요
- **프로젝트명**: 랜덤팟
- **목적**: 친구/모임/술자리/게임팟에서 쓰는 캐주얼 랜덤 놀이 웹서비스
- **현재 단계**: 최소 MVP 구현 + 안정화 + 배포 준비 완료

## 2) 현재 완료된 기능

### 룰렛
- **프론트 페이지**: `frontend/src/app/roulette/page.tsx` (`/roulette`)
- **백엔드 API**: `POST /api/v1/roulette/spin`
- **입력/출력 요약**
  - 입력: `{ title: string, items: string[] }`
  - 출력: `{ title: string, selectedItem: string, totalItems: number }`
- **성공/실패 처리**
  - 성공: 결과 카드에 selectedItem 표시
  - 실패: 프론트 에러 메시지 표시, 백엔드 4xx 반환

### 벌칙
- **프론트 페이지**: `frontend/src/app/punishment/page.tsx` (`/punishment`)
- **백엔드 API**: `POST /api/v1/punishment/draw`
- **입력/출력 요약**
  - 입력: `{ title: string, items: string[] }`
  - 출력: `{ title: string, selectedItem: string, totalItems: number }`
- **성공/실패 처리**
  - 성공: 결과 카드 표시
  - 실패: 프론트 에러 메시지, 백엔드 4xx

### 미션
- **프론트 페이지**: `frontend/src/app/mission/page.tsx` (`/mission`)
- **백엔드 API**: `POST /api/v1/mission/draw`
- **입력/출력 요약**
  - 입력: `{ title: string, items: string[] }`
  - 출력: `{ title: string, selectedItem: string, totalItems: number }`
- **성공/실패 처리**
  - 성공: 결과 카드 표시
  - 실패: 프론트 에러 메시지, 백엔드 4xx

### 팀나누기
- **프론트 페이지**: `frontend/src/app/team/page.tsx` (`/team`)
- **백엔드 API**: `POST /api/v1/team/split`
- **입력/출력 요약**
  - 입력: `{ title: string, items: string[], teamCount: number }`
  - 출력: `{ title: string, teamCount: number, teams: [{ teamName: string, members: string[] }] }`
- **성공/실패 처리**
  - 성공: 팀별 멤버 목록 표시
  - 실패: 프론트 에러 메시지, 백엔드 4xx

## 3) 기술 스택
- **Frontend**: Next.js + TypeScript
- **Backend**: Spring Boot
- **배포 예정**: Vercel + Render

## 4) 현재 폴더/구조 요약

### Frontend 주요 파일/페이지
- `frontend/src/app/page.tsx` (홈)
- `frontend/src/app/roulette/page.tsx`
- `frontend/src/app/punishment/page.tsx`
- `frontend/src/app/mission/page.tsx`
- `frontend/src/app/team/page.tsx`
- `frontend/src/lib/api.ts`

### Backend feature 패키지
- `src/main/java/com/randompot/randompot_api/feature/roulette/`
- `src/main/java/com/randompot/randompot_api/feature/punishment/`
- `src/main/java/com/randompot/randompot_api/feature/mission/`
- `src/main/java/com/randompot/randompot_api/feature/team/`

### 공통화된 컴포넌트/유틸
- 프론트
  - `frontend/src/components/shared/ErrorMessage.tsx`
  - `frontend/src/components/shared/ResultCard.tsx`
- 백엔드
  - `src/main/java/com/randompot/randompot_api/feature/common/FeatureItemUtils.java`
    - `normalizeItems()`
    - `pickRandomItem()`

## 5) 지금까지 한 핵심 작업 이력
1. 최소 MVP 설계
2. 룰렛 구현
3. 벌칙 구현
4. 미션 구현
5. 팀나누기 구현
6. 소규모 공통화 (프론트 shared 컴포넌트 + 백엔드 item 유틸)
7. 회귀 테스트
8. 배포 준비 수정
9. 디버그 계측 제거

## 6) 현재 배포 준비 상태
- `application.properties`에 **PORT 반영 완료**
  - `server.port=${PORT:8080}`
- `ALLOWED_ORIGINS` 반영 완료
  - `app.cors.allowed-origins=${ALLOWED_ORIGINS:http://localhost:3000}`
- `WebCorsConfig` 적용 완료
  - `src/main/java/com/randompot/randompot_api/config/WebCorsConfig.java`
- `frontend/.env.example` 존재
- `.gitignore`에 프론트 산출물/env 정리 완료
  - `frontend/.next/`, `frontend/node_modules/`, `frontend/.env*`, `!frontend/.env.example`
- `/actuator/health` 사용 가능 설정 반영
  - `management.endpoints.web.exposure.include=health`

## 7) 배포 체크리스트

### Render 입력값 (백엔드)
- Build Command: `./mvnw clean package -DskipTests`
- Start Command: `java -jar target/randompot-api-0.0.1-SNAPSHOT.jar`
- Env:
  - `ALLOWED_ORIGINS=https://<your-vercel-domain>.vercel.app`
  - `PORT`는 Render 제공값 사용
- Health Check Path: `/actuator/health`

### Vercel 입력값 (프론트)
- Root Directory: `frontend`
- Install Command: `npm install`
- Build Command: `npm run build`
- Env:
  - `NEXT_PUBLIC_API_BASE_URL=https://<your-render-domain>.onrender.com`

### 배포 순서
1. Render 백엔드 배포
2. Render URL 확인
3. Vercel에 `NEXT_PUBLIC_API_BASE_URL` 설정 후 프론트 배포
4. Vercel URL 확인 후 Render `ALLOWED_ORIGINS` 최종 반영
5. 최종 스모크 테스트

### 배포 후 스모크 테스트
- `GET /actuator/health` 200 확인
- 프론트 `/roulette`, `/punishment`, `/mission`, `/team` 진입 확인
- 각 기능 성공 케이스 1회
- 각 기능 실패 케이스 1회
  - 룰렛/벌칙/미션: 항목 1개
  - 팀나누기: `teamCount > participants`

## 8) 다음 작업 우선순위
1. **1순위**: 실제 배포
2. **2순위**: 모바일 사용성 개선
3. **3순위**: 공유 코드 기능
4. 이후: 세션 저장/히스토리, 템플릿 저장 검토

## 9) 주의사항
- 과한 공통화 금지
- 팀나누기 로직은 별도 유지
- API 계약 유지
- 현재는 MVP 안정성 우선
- 새 대화/새 세션에서도 이 문서를 기준으로 바로 이어서 작업 가능
