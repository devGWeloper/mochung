# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

모바일 청첩장 (Mobile Wedding Invitation) - React + Vite + TypeScript 기반의 모바일 최적화 웨딩 초대장 웹앱.

## Build & Development Commands

```bash
npm install    # 의존성 설치
npm run dev    # 개발 서버 실행 (http://localhost:5173)
npm run build  # 프로덕션 빌드
npm run preview # 빌드 결과물 미리보기
```

## Architecture

### 주요 설정 파일
- `src/config/wedding.ts` - 결혼식 정보 (신랑/신부, 일시, 장소, 계좌번호 등) 중앙 관리
- `src/lib/firebase.ts` - Firebase 설정 (방명록 기능)

### 컴포넌트 구조
각 섹션은 독립적인 컴포넌트로 구성되며, CSS Modules로 스타일링:
- `Hero` - 메인 히어로 섹션
- `Greeting` - 인사말
- `DateTime` - 일시 및 D-day 카운트다운 + 달력
- `Gallery` - 사진 갤러리 (Swiper)
- `Location` - 장소 안내 (카카오맵)
- `Account` - 계좌번호 (복사 기능)
- `GuestBook` - 방명록 (Firebase 또는 LocalStorage)

### 스타일링
- CSS Variables 사용 (`src/styles/global.css`)
- 내추럴 가든 테마: 베이지(#F5F0E8), 세이지 그린(#8B9D83), 더스티 로즈(#D4A5A5)
- 폰트: Noto Serif KR (제목), Noto Sans KR (본문)

### 외부 서비스 연동
- **카카오맵**: `src/components/Location.tsx`에서 API 키 설정 필요
- **Firebase**: `src/lib/firebase.ts`에서 프로젝트 설정 필요 (미설정 시 LocalStorage 폴백)

### 이미지
- `public/images/` 폴더에 갤러리 이미지 추가
- `wedding.ts`의 `gallery` 배열에서 경로 관리
