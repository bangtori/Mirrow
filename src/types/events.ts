export const EVENT_NAMES = {
  PROFILE_CREATED: 'PROFILE_CREATED', // Mirrow 생성
  RESPONSE_COMPLETED: 'RESPONSE_COMPLETED', // 응답 완료
  RESULT_VIEWED: 'RESULT_VIEWED', // Owner가 테스트 결과 페이지 진입
  RESPONSE_LINK_COPIED: 'RESPONSE_LINK_COPIED', // 랜딩 페이지 -> 생성 후 링크 복사
  RESPONSE_LINK_RESHARED: 'RESPONSE_LINK_RESHARED', // 결과페이지 -> 링크 다시 공유
  VISITOR_CREATE_CLICKED: 'VISITOR_CREATE_CLICKED', // Visitor 결과 페이지 내 나도 Mirrow 생성 버튼 클릭
} as const;

export type EventName = (typeof EVENT_NAMES)[keyof typeof EVENT_NAMES];
