# Mirrow

## 프로젝트 개요

**Mirrow**는 조하리 창(Johari Window) 기반 자기 인식 탐색 웹 서비스다.
사용자가 자신을 나타내는 단어 6개를 선택하고, 친구들에게 링크를 공유해 응답을 받으면, 자기 인식과 타인 인식의 차이를 조하리 창 4영역으로 시각화해 보여준다.

## 기술 스택

- **Framework**: Next.js (App Router, TypeScript)
- **Styling**: Tailwind CSS v4
- **Backend/DB**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **Fonts**: Noto Sans KR, JetBrains Mono, Gowun Batang (`next/font/google`)

## 폴더 구조

```
src/
  app/
    (with-footer)/          # 랜딩(/), 마이페이지(/my) — 푸터 포함 레이아웃
      _components/          # 랜딩 페이지 컴포넌트
      my/                   # 마이페이지
      layout.tsx
      page.tsx
    (without-footer)/       # 응답/결과 페이지 — 푸터 없는 레이아웃
      response/[id]/        # 응답 페이지
      result/[id]/          # 결과 페이지 (Owner)
      view/[testId]/        # 결과 페이지 (Visitor)
      layout.tsx
    layout.tsx              # 루트 레이아웃 (html, body, 폰트)
  actions/                  # Server Actions ('use server')
    tests.ts                # tests 테이블 관련 (getTestOwnerInfo, saveTestOwner)
    response.ts             # responses 테이블 관련 (saveResponse, getVisitorResult)
    result.ts               # 결과 조회 (getResult)
    events.ts               # 이벤트 로그 (trackEvent)
  components/
    ui/                     # 공통 UI (Button, Card, Badge, Input, NoticeBox 등)
    mirrow/                 # 서비스 전용 (JohariPanel, StickyCounter, StepIndicator 등)
    layout/                 # 레이아웃 (CardMain, Footer)
  hooks/
    useLanding.ts           # 랜딩 페이지 상태 관리 훅
  lib/
    supabase/
      server.ts             # Supabase 서버 클라이언트
    storage.ts              # localStorage 유틸 (getStorage, setStorage, STORAGE_KEYS)
  types/                    # 타입 정의
    word.ts, result.ts, response.ts, storage.ts, supabase.ts 등
  utils/
    johari.ts               # 조하리 창 계산 (calcJohariResult, calculateVisitorComparison)
    korean.ts               # 한국어 조사 유틸 (getObjectParticle)
    word.ts                 # 단어 매핑 유틸 (mapWordIdToWord)
  data/
    words.ts                # 57개 단어 데이터
```

## DB 스키마 (Supabase)

### tests

| 컬럼         | 타입        | 설명                                     |
| ------------ | ----------- | ---------------------------------------- |
| id           | uuid        | PK, gen_random_uuid()                    |
| name         | text        | 출제자 이름                              |
| self_words   | int4[]      | 출제자가 선택한 단어 id 배열             |
| result_token | uuid        | 결과 페이지 접근 토큰, gen_random_uuid() |
| is_active    | boolean     | 링크 활성화 여부 (기본값 true)           |
| created_at   | timestamptz | 생성 시각                                |

### responses

| 컬럼          | 타입        | 설명                          |
| ------------- | ----------- | ----------------------------- |
| id            | uuid        | PK                            |
| test_id       | uuid        | FK → tests.id                 |
| words         | int4[]      | 응답자가 선택한 단어 id 배열  |
| visitor_token | uuid        | Visitor 결과 페이지 접근 토큰 |
| created_at    | timestamptz | 생성 시각                     |

### events

| 컬럼       | 타입        | 설명                   |
| ---------- | ----------- | ---------------------- |
| id         | uuid        | PK                     |
| event_name | text        | 이벤트 식별자          |
| test_id    | uuid        | 연관 test (nullable)   |
| metadata   | jsonb       | 추가 데이터 (nullable) |
| created_at | timestamptz | 생성 시각              |

## 라우트 구조

| 라우트                             | 대상    | 설명                              |
| ---------------------------------- | ------- | --------------------------------- |
| `/`                                | 출제자  | 이름 입력 → 단어 선택 → 링크 발급 |
| `/response/[id]`                   | 응답자  | 단어 선택 후 제출                 |
| `/result/[result_token]`           | Owner   | 조하리 창 결과 + 응답 링크 재공유 |
| `/view/[testId]?responseToken=...` | Visitor | 나와 출제자 단어 비교             |
| `/my`                              | 출제자  | 내가 만든 Mirrow 목록             |

## 핵심 원칙

- **조하리 창 본질 유지**: 응답자에게 출제자가 고른 단어 절대 노출 금지
- **익명 응답 보장**: 누가 무엇을 골랐는지 응답자에게 비공개
- **결과 해석 중립**: "좋다/나쁘다" 없이 중립적 설명만

## 코드 컨벤션

- `type` 키워드로 통일 (`interface` 사용 안 함)
- 컴포넌트/훅: 화살표 함수
- Server Action: `function` 키워드
- `try-finally` 패턴: 비동기 작업의 로딩 상태 초기화
- Supabase 자동 생성 타입 기반으로 타입 추론 사용
- 이중 캐스팅(as unknown as) 사용 금지
- DTO → Model 변환은 Server Action 내부에서 처리, 클라이언트는 완성된 Model만 수신

## 에러 핸들링 패턴

- **페이지 초기 데이터 로드 실패** (서버): `throw` → `error.tsx`로 처리
- **사용자 액션 실패** (클라이언트): `try-catch` → 토스트/알럿
- 각 라우트에 `error.tsx` 존재 (`'use client'` 필수, `error: Error`, `reset: () => void` props)

## localStorage 구조

### `mirrow_responded` (string[])

응답한 testId 목록. 중복 응답 방지 및 본인 차단에 사용.

### `mirrow_list` (MirrowItem[])

생성한 Mirrow 목록. 마이페이지 및 랜딩 미리보기에 사용.

```typescript
type MirrowItem = {
  testId: string;
  userName: string;
  resultUrl: string; // /result/[result_token] 상대경로
  responseUrl: string; // /response/[id] 상대경로
  createdAt: string; // ISO 8601
};
```

## 이벤트 로그

- `types/events.ts` — `EVENT_NAMES` 상수 정의
- `actions/events.ts` — `trackEvent` Server Action

```typescript
EVENT_NAMES = {
  PROFILE_CREATED, // Mirrow 생성 완료
  RESPONSE_LINK_COPIED, // 응답 링크 복사 버튼 클릭
  RESPONSE_COMPLETED, // 응답자 제출 완료
  RESULT_VIEWED, // 결과 페이지 진입
  RESPONSE_LINK_RESHARED, // Owner가 결과 페이지에서 응답 링크 재공유
  VISITOR_CREATE_CLICKED, // Visitor가 visitor용 결과 페이지에서 Mirrow 생성 버튼 클릭
};
```

로그 실패 ≠ 서비스 실패. `trackEvent`는 항상 `try-catch`로 감싸 에러가 서비스에 영향 안 줌.

## 절대 하지 말아야 할 것

- 응답자에게 출제자가 고른 단어 노출
- 작업 범위(ErrorView, SEO) 외 기능 코드 수정
- 불필요한 의존성 추가
