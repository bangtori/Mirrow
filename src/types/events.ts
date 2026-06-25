export const EVENT_NAMES = {
  LANDING_VIEWED: 'LANDING_VIEWED', // 랜딩 페이지 방문
  PROFILE_CREATE_STARTED: 'PROFILE_CREATE_STARTED', // 이름 입력 후 단어 선택 페이지 진입
  RESPONSE_PAGE_VIEWED: 'RESPONSE_PAGE_VIEWED', // 응답 링크 페이지 진입
  PROFILE_CREATED: 'PROFILE_CREATED', // Mirrow 생성
  RESPONSE_COMPLETED: 'RESPONSE_COMPLETED', // 응답 완료
  RESULT_VIEWED: 'RESULT_VIEWED', // Owner가 테스트 결과 페이지 진입
  RESPONSE_LINK_COPIED: 'RESPONSE_LINK_COPIED', // 랜딩 페이지 -> 생성 후 링크 복사
  RESULT_LINK_COPIED: 'RESULT_LINK_COPIED', // 랜딩 페이지 -> 생성 후 결과 링크 복사
  RESPONSE_LINK_RESHARED: 'RESPONSE_LINK_RESHARED', // 결과페이지 -> 링크 다시 공유
  ANALYSIS_PROMPT_COPIED: 'ANALYSIS_PROMPT_COPIED', // Owner 결과 페이지 -> GPT 분석 프롬프트 복사
  VISITOR_CREATE_CLICKED: 'VISITOR_CREATE_CLICKED', // Visitor 결과 페이지 내 나도 Mirrow 생성 버튼 클릭
} as const;

export type EventName = (typeof EVENT_NAMES)[keyof typeof EVENT_NAMES];
