# GuJeuk Check-in FE Design System

## 1. Product Surface

This app has two visual planes: public check-in forms and an admin management/reporting shell. Issue #118 belongs to the admin reporting shell and should preserve the current quiet, document-like style.

## 2. Tokens

- Primary action blue: `#0f50a0`, hover `#0a4085`.
- Text: primary `#000000`, body `#333333`, muted `#565656`, inverse `#ffffff`.
- Report borders: `#555555`.
- Report header fill: `#f1f1f1`.
- Modal overlay: `rgba(0, 0, 0, 0.55)`.
- Report value blue: `#443cff`.

## 3. Typography

- Admin buttons use 1.1rem to 1.5rem Korean UI text with 600 weight for action labels.
- Report previews use Apple SD Gothic Neo, Malgun Gothic, and sans-serif fallbacks.
- Report section lines are bold and large enough to resemble the HWP source documents.

## 4. Spacing

- Admin sidebar controls use roomy vertical gaps and pill-shaped action buttons.
- Report previews use page-like white surfaces, generous padding, collapsed tables, and horizontal overflow when the table is wider than the viewport.

## 5. Primitives

- `ExcelButton`: pill action button with export icon, primary border, stable min width, hover lift, and disabled state.
- `DateExportModal`: centered selection dialog for year/month based exports.
- Report month option: compact month select above a report preview; the month affects only the monthly performance section while yearly facility usage remains fixed.
- Report preview modal: fixed overlay, action bar, white printable report page, print CSS that hides surrounding UI and prints only the report article.
- Report table: collapsed bordered table, gray header cells, bold row labels, centered numeric cells, and dash placeholders for unavailable values.


## 6. Issue #133 Layout Amendments

- Admin shell sidebar: fixed-sidenav shell using a sticky left header. The content area owns page scroll; the sidebar remains visible and uses its own vertical overflow only when its controls exceed the viewport.
- Admin loading overlay: full-viewport dim overlay with a translucent white rounded box, white Korean status text, and `aria-live`/`role=status` for route loading states.
- Sortable board: card grids keep drag transforms within the board bounds and use overflow-safe intrinsic columns so selected purpose/residence cards cannot visually escape the management area.
- Facility usage record list: month filter button aligns to the right edge of the 80rem card measure on desktop, stretches on small screens, and visit cards reflow from row to stacked layout without horizontal overflow.

# Issue #162 관리자 공통 디자인 시스템

## 1. 정체성·기준
기존 구즉 관리자의 흰 카드·둥근 입력창·고정 사이드바와 원형 인증 배경을 그대로 재사용한다. 이번 작업은 구조 추출이며 구즉 시각 변경을 포함하지 않는다. 법동의 본문 캡처는 공통 UI 경계를 정하는 자료이며 본문 구현은 후속 작업이다.

## 2. 색상
구즉 기준은 현재 `apps/gujeuk-admin/src/shared/ui` 및 인증 위젯이다. 주색 #0F50A0, 인증 버튼 #3D72B3, 밝은색 #C2D5EC, 링크 #A4DFFF/hover #BEE8FF, 카드 테두리 #6F95C4, 오류 #FF5A5A, 경고 #D88282를 유지한다. 기존 중립색과 상태별 색상도 그대로 토큰화한다.

법동 출처: [Frame 2080013040](https://www.figma.com/design/VHUfbJB75st06zIBdIIRJT?node-id=9731-3108). MainColor #FF9000, Main_dark #9B4D00, Main_bright #FFF4E4, MainBright #F5C343. red #E8232C/#F79CA0, pink #EF4B75/#F8CBD5, blue #2868D8/#CBD9F5, green #00A89D/#C5DEDB. 설명용 예제 안의 다른 팔레트는 가져오지 않는다. 여러 fill이 겹친 회색 스와치를 단일 색으로 추정하지 않는다.

## 3. 타이포그래피
사용자 최종 결정에 따라 법동도 구즉과 동일하다. 본문 Pretendard/sans-serif, 인증 제목 Jua/sans-serif 2.5rem/300(768px 이하 2rem, 480px 이하 1.5rem), 입력·라벨 1.25rem(모바일 1rem), 인증 버튼 1.5rem/500(모바일 1.2rem/1rem). 각 기존 컴포넌트의 line-height·letter-spacing 상속을 유지한다. Figma의 타이포그래피 설명/실제 속성은 이번에 적용하지 않는다.

## 4. 간격·레이아웃
구즉 원본의 반응형 규칙을 보존한다. 인증 패널 37.5vw × 74.44vh, padding 40px 133px, 기존 1800/1600/1300/1024/768/480px 미디어쿼리 유지. 인증 입력 높이 4.5rem(모바일 3.5rem). 일반 필드 3.5rem, 사이드바 max(20vw,17rem), 본문 패딩 clamp(1.5rem,3.5vw,3.5rem) clamp(1rem,3.75vw,3.75rem). 기관별 예외는 테마의 컴포넌트 규격 또는 전달한 className으로 한정한다.

## 5. 공통 컴포넌트·상태
- 인증: 배경·패널·입력·확인 버튼·로그인/비밀번호 폼, 필수/불일치 검증, pending/error, 비밀번호 표시 전환.
- 본문: 사이드바/콘텐츠 슬롯, 목록 카드 외형, 상세/입력 필드, 선택창, 검색창과 초기화, 메뉴/엑셀 버튼, 모달.
- 필드 개수·순서·내용, 학교/성별/시설 같은 도메인, API·라우팅·보고서 로직은 앱에서 조합한다.
- 공통화할 수 있는 외형을 재사용하며 기관명 분기로 화면 전체를 구성하지 않는다.

## 6. 인터랙션·모션
기존 버튼 hover translateY(-2px)/active scale(.98), 모달 slideUp .3s, 오류 opacity .2s, 드롭다운 기존 애니메이션을 보존한다. 새 장식 모션을 추가하지 않는다. Enter 제출과 검증 후 오류 제거 시점을 유지한다.

## 7. 깊이·표면
인증 패널 반경 20px 및 shadow 0 6px 10px rgb(207,220,235), 필드 반경 .5rem, 인증 입력 2.2rem, 확인 버튼 3.125rem, 목록 카드 2.25rem/반응형 clamp, 타일 1.25rem. 원본의 테두리·그림자·hover를 보존한다.

## 8. 접근성·남은 제약
입력 라벨, 오류 aria-invalid, 비밀번호 표시 버튼 이름, 검색 초기화 이름과 기존 카드 링크/삭제 영역을 유지한다. 법동 API 준비 전 안내는 실제 성공으로 처리하지 않는다. 구즉 시각·동작 보존 요청으로 기존 대비·모바일 패널 크기·모달 포커스 정책은 이번에 재설계하지 않는다. 개선이 필요한 부분은 별도 범위로 기록한다. 다크 테마는 현재 제품에 없으며 이번 범위에 포함하지 않는다.
