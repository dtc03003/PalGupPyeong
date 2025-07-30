# 팔굽평 (Pushup Tracker)

하루하루 팔굽혀펴기 수행량을 기록하고, 시각화된 통계로 자신의 운동 습관을 추적할 수 있는 모바일 웹 앱입니다.  
목표 설정, 타이머, 소셜 로그인 등 다양한 기능으로 꾸준한 운동을 도와줍니다.

## 주요 기능

-  팔굽혀펴기 기록 추가 및 편집/삭제
-  날짜별, 주간, 월간 통계 그래프 제공
-  하루 목표 설정 및 진행률 확인
-  휴식 타이머 (인터벌, 알람/진동 기능 포함 예정)
-  다크 모드 지원
-  Firebase 로그인 및 인증 (이메일, Google, Apple)

## 기술 스택

- **Frontend**: React + TypeScript + Vite
- **스타일링**: styled-components
- **상태 관리**: zustand
- **데이터베이스 및 인증**: Firebase (Firestore, Auth)
- **차트 시각화**: Recharts
- **배포**: vercel

## 디렉터리 구조

src/
```
├── components/ # 재사용 가능한 컴포넌트
├── pages/ # 주요 페이지 (기록, 통계 등)
├── hooks/ # 커스텀 훅
├── stores/ # zustand 상태 관리
├── firebase/ # Firebase 설정 및 관련 함수
├── utils/ # 유틸리티 함수
├── types/ # 타입 정의
└── App.tsx # 진입점
```

## 설치 및 실행 방법

```bash
git clone https://github.com/dtc03003/PalGupPyeong.git
npm i
npm run dev
```

# 향후 계획
 소셜 로그인 (카카오, 구글)
 기록 공유 기능 (이미지로 변환하여 SNS에 공유)
 다국어 지원 (한국어/영어)
