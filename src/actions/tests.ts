import { TestOwnerSummary } from '@/types';

export async function getTestOwnerInfo(id: string): Promise<TestOwnerSummary> {
  // TODO: Test용 목업 로직, 실제 DB 연동 후 삭제 예정
  const MOCK_DATA: TestOwnerSummary = {
    id: 'pemncwkx',
    name: '유빈',
    result_token: '9h5vjbcd',
    is_active: true,
  };
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (id !== MOCK_DATA.id) {
    throw new Error('사용자를 찾을 수 없습니다.');
  }
  if (Math.random() < 0.1) {
    throw new Error('사용자 정보를 가져오는데 실패했습니다.');
  }

  return MOCK_DATA;
}
