# TalkBingo 랜딩 페이지 디자인 리뷰

**리뷰 날짜**: 2026-03-03  
**경로**: `/` (홈 페이지)  
**검토 항목**: Visual Design · UX/Usability · Responsive/Mobile · Micro-interactions · Accessibility · Consistency  
**참고 문서**: `image/web_design/UI_DEsign.md`

---

## 요약

현재 TalkBingo 랜딩 페이지는 인터랙티브 카드 히어로와 앱 프리뷰 캐러셀 등 독창적인 UI 요소를 갖추고 있습니다. 다만, **9초 이상의 인트로 애니메이션으로 CTA 노출이 지연**되고, **모바일에서 카드 오버레이 위치 오류**, **로고 이미지 404** 등 즉시 수정이 필요한 Critical 이슈가 3건 존재합니다. 디자인 토큰 미사용, Feature 섹션의 브랜드 색상 단절 등 일관성 문제도 함께 개선이 필요합니다.

---

## 이슈 목록

| # | 이슈 | 심각도 | 분류 | 위치 |
|---|------|--------|------|------|
| 1 | **로고 이미지 404**: `<Image src="/logo_vector.svg">` 경로에 파일 없음. 실제 파일은 `/assets/hero/LOGO_Vector_edited.svg` | 🔴 Critical | Visual | `src/components/InteractiveCardHero.tsx:170` |
| 2 | **CTA 버튼 pointer-events 차단**: `.coreMessage`에 `pointer-events: none` 적용 → 내부 CTA 버튼 클릭 불가 우려 (`.ctaVisible`에서 auto로 복구되나 부모 none이 덮어쓸 수 있음) | 🔴 Critical | UX | `src/components/InteractiveCardHero.module.css:446~459`, `tsx:243` |
| 3 | **모바일 카드 선택 메시지 오버레이 위치 오류**: `padding-top: 100%` 적용으로 카드 선택 시 메시지가 뷰포트 밖으로 밀려남 | 🔴 Critical | Responsive | `src/components/InteractiveCardHero.module.css:638` |
| 4 | **인트로 애니메이션 9.2초**: 로고가 6초, CTA가 9.2초 후 노출 — 페이지 진입 초반 이탈률 상승 우려. 스킵 버튼 없음 | 🟠 High | UX | `src/components/InteractiveCardHero.tsx:109~119` |
| 5 | **SubTitlesRow 텍스트 잘림**: `white-space: nowrap` + `overflow: hidden` 조합으로 "Mini GAME" 우측이 잘림 | 🟠 High | Visual | `src/components/InteractiveCardHero.module.css:155~173` |
| 6 | **모바일 Feature 그리드 1열**: 768px 이하에서 6개 카드가 1열로 쌓여 스크롤이 매우 길어짐. UI_Design.md 모바일 2열 권장과 불일치 | 🟠 High | Responsive | `src/app/page.module.css:273~278` |
| 7 | **카드 키보드 접근 불가**: 인터랙티브 카드에 `onClick`만 있고 `tabIndex`, `onKeyDown`, `role="button"` 없음 | 🟠 High | Accessibility | `src/components/InteractiveCardHero.tsx:204` |
| 8 | **ChatReveal 이미지 404 가능성**: `/images/carousel/CHT_2.png` 경로 — `public/images/` 폴더가 존재하지 않음 | 🟠 High | Visual | `src/components/ChatReveal.tsx:19` |
| 9 | **"BINGO" 텍스트 상단 클리핑**: `font-size: clamp(52px, 12vw, 120px)` + `line-height: 1` 조합으로 Nura 폰트 어센더 잘림 | 🟡 Medium | Visual | `src/app/page.module.css:325~335` |
| 10 | **Feature 섹션 흰 배경 단절**: 다크 히어로 → 흰 Feature 섹션의 급격한 전환이 브랜드 다크 테마 일관성 깨뜨림. UI_Design.md `Background: #0C0219` 기반 다크 테마와 충돌 | 🟡 Medium | Visual Design | `src/app/page.module.css:128~130` |
| 11 | **디자인 토큰 미사용**: `globals.css`에 `--primary: #E91E63` 정의하나, 컴포넌트 전체에서 `#BD0558`, `#7F28FF` 하드코딩. UI_Design.md 색상 팔레트와도 불일치 | 🟡 Medium | Consistency | `src/app/globals.css:89`, `InteractiveCardHero.module.css` 전체 |
| 12 | **글로벌 body 폰트 불일치**: `globals.css`에서 `body { font-family: 'Inter' }` 선언하지만, 실제 UI는 `EliceDigitalBaeum`, `Nura` 위주 렌더링 | ⚪ Low | Consistency | `src/app/globals.css:132` |

---

## 심각도 기준

- 🔴 **Critical**: 기능 오류 또는 즉시 사용자 경험을 손상시키는 문제
- 🟠 **High**: UX/접근성/반응형에 크게 영향을 미치는 문제
- 🟡 **Medium**: 디자인 일관성 또는 가독성에 영향을 미치는 문제
- ⚪ **Low**: 개선 권장 사항

---

## 우선순위 액션 플랜

### 즉시 수정 (Critical)
1. **#1** 로고 경로 수정: `"/logo_vector.svg"` → `"/assets/hero/LOGO_Vector_edited.svg"`
2. **#2** `.coreMessage` pointer-events 제거하고 `.ctaButtons`에서만 제어
3. **#3** 모바일 오버레이 `padding-top: 100%` → `padding-top: 20%` 또는 `align-items: center` + `justify-content: center` 재설계

### 단기 개선 (High)
4. **#4** 인트로 타임라인 단축: CTA 노출 9.2s → 3~4s (카드 등장 후 즉시 텍스트+CTA 노출)
5. **#5** SubTitlesRow `white-space: nowrap` → `flex-wrap: wrap` + `justify-content: center`
6. **#6** Feature 그리드 모바일: `grid-template-columns: repeat(2, 1fr)` (480px 이하에서 1열)
7. **#7** 카드에 `tabIndex={0}`, `role="button"`, `onKeyDown` 추가
8. **#8** `public/images/` 폴더 및 이미지 경로 확인/수정

### 브랜드 일관성 개선 (Medium)
9. **#9** `previewBingoTitle` `line-height: 1` → `line-height: 1.1` + `padding-top: 0.1em`
10. **#10** Feature 섹션 배경을 `#0C0219` 또는 다크 그라디언트로 변경 (UI_Design.md 기준)
11. **#11** globals.css 디자인 토큰을 UI_Design.md 색상으로 업데이트 후 하드코딩값 교체

---

## UI_Design.md 준수 체크리스트

| 항목 | 현재 | UI_Design.md 기준 | 상태 |
|------|------|------------------|------|
| Host Primary | `#BD0558` (컴포넌트 하드코딩) | `#BD0558` | ✅ 값은 맞음, 토큰화 필요 |
| Guest Primary | `#430887` (미사용) | `#430887` | ❌ 미반영 |
| Background | `#050008` (hero only) | `#0C0219` | 🟡 근사값 |
| globals Primary | `#E91E63` | `#BD0558` | ❌ 불일치 |
| 버튼 Radius | `50px` (pill) | `8px` | ❌ 불일치 |
| 버튼 Height (Primary) | 미정의 | `48px` | ❌ 미반영 |
| 인풋 스타일 | 미사용 | Engraved (`#F5F5F5`, `8px` radius) | N/A |
| 카드 Radius | `10px` | `12px` (Standard) | 🟡 근사값 |
