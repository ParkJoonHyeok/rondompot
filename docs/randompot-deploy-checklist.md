# 랜덤팟 배포 직전 체크리스트

## 1) Render 입력값 (Backend)
- Root: `randompot-api` 루트
- Build Command: `./mvnw clean package -DskipTests`
- Start Command: `java -jar target/randompot-api-0.0.1-SNAPSHOT.jar`
- Env:
  - `ALLOWED_ORIGINS=https://<your-vercel-domain>.vercel.app`
  - `PORT`는 Render 제공값 사용
- Health Check: `/actuator/health`

## 2) Vercel 입력값 (Frontend)
- Root Directory: `frontend`
- Install Command: `npm install`
- Build Command: `npm run build`
- Env:
  - `NEXT_PUBLIC_API_BASE_URL=https://<your-render-domain>.onrender.com`

## 3) 배포 순서
1. Render 백엔드 배포
2. Render URL 확인
3. Vercel에 `NEXT_PUBLIC_API_BASE_URL` 설정 후 배포
4. Vercel URL 확인 후 Render `ALLOWED_ORIGINS` 최종 반영
5. 필요 시 재배포

## 4) 배포 후 확인 항목
- `GET https://<render-domain>/actuator/health` → 200
- 프론트 `/roulette`, `/punishment`, `/mission`, `/team` 진입
- 각 기능 성공 1회 + 실패 1회
  - 룰렛/벌칙/미션: 항목 1개 실패
  - 팀나누기: `teamCount > participants` 실패
- 브라우저 네트워크에서 API 요청 도메인이 Render인지 확인

## 5) 문제 발생 시 가장 먼저 볼 것
1. Vercel `NEXT_PUBLIC_API_BASE_URL` 값 오타/누락
2. Render `ALLOWED_ORIGINS` 값 오타/누락
3. Render 서비스 헬스체크(`/actuator/health`) 상태
4. 브라우저 콘솔 CORS/fetch 에러
5. Render 로그의 4xx/5xx 응답
