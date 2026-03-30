# 랜덤팟 (RandomPot)

친구/모임/술자리/게임팟에서 사용할 수 있는 캐주얼 랜덤 놀이 웹서비스

## 주요 기능
- **룰렛**: 입력한 항목 중 하나를 랜덤으로 선택
- **벌칙 뽑기**: 간단한 벌칙 리스트에서 즉시 랜덤 추첨
- **랜덤 미션**: 미션 후보를 넣고 한 개를 랜덤 선택
- **팀나누기**: 참여자를 원하는 팀 수로 무작위 분배

## 기술 스택
- **Frontend**: Next.js, TypeScript
- **Backend**: Spring Boot, Java
- **Deployment**: Vercel, Render

## 배포 주소
- **프론트엔드**: [https://rondompot.vercel.app](https://rondompot.vercel.app)
- **백엔드 헬스체크**: `https://<your-render-domain>.onrender.com/actuator/health`

## 프로젝트 구조
```text
randompot-api/
├─ frontend/                  # Next.js 프론트엔드
├─ src/main/java/...          # Spring Boot 백엔드
└─ docs/                      # 프로젝트 내부 문서
```

## 실행 방법

### 1) 백엔드 실행
```bash
./mvnw spring-boot:run
```

Windows PowerShell:
```powershell
.\mvnw.cmd spring-boot:run
```

기본 주소: `http://localhost:8080`

### 2) 프론트 실행
```bash
cd frontend
npm install
npm run dev
```

기본 주소: `http://localhost:3000`

## 현재 상태
- MVP 배포 완료
- 룰렛/벌칙/미션/팀나누기 기본 기능 동작 확인 완료

## 향후 계획
- 모바일 사용성 개선
- 공유 기능
- 세션 저장/히스토리
