---
name: Release
about: 배포 및 릴리즈 체크리스트
title: '[Release] '
labels: ['release']
assignees: []
---

## 릴리즈 정보

버전:

---

## 포함 이슈

-

## 개발 완료 확인

- [ ] 관련 이슈 모두 완료
- [ ] 마일스톤 내 Open Issue 없음
- [ ] 테스트 완료

---

## 배포 전 확인

- [ ] 개발 환경(Local) 테스트 완료
- [ ] Preview 배포 테스트 완료
- [ ] 환경 변수 확인
- [ ] 버전 정보 결정

---

## 버전 업데이트

- [ ] package.json 버전 수정
- [ ] Footer 버전 수정
- [ ] CHANGELOG 작성

---

## Git 작업

- [ ] main 최신 상태 확인
- [ ] 릴리즈 커밋 생성
- [ ] Git Tag 생성
- [ ] Git Tag Push

---

## 배포

- [ ] Vercel Production 배포 확인
- [ ] 배포 로그 확인

---

## 운영 환경 검증

- [ ]
- [ ]
- [ ]

### 공통

- [ ] 콘솔 에러 확인
- [ ] Supabase 데이터 저장 확인
- [ ] 주요 사용자 흐름 검증

---

## 릴리즈 완료

- [ ] GitHub Release 생성
- [ ] Milestone 종료
- [ ] 프로젝트 보드 상태 정리
