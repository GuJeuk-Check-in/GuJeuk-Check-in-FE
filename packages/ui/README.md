# 관리자 공통 UI

구즉·법동 관리자에서 사용하는 표현 컴포넌트다. 구즉의 기존 DOM, 기본 규격과 반응형 CSS를 기준으로 추출했다. 체크인 앱은 이 패키지를 사용하지 않는다.

| 경로 | 제공 범위 |
| --- | --- |
| `@center/ui/auth` | 로그인·비밀번호 변경 폼, 검증, 입력창, 인증 배경·레이아웃 |
| `@center/ui/modal` | 모달 표현, 모달 상태 훅과 계약 |
| `@center/ui/button` | 메뉴·엑셀 버튼 표현 |
| `@center/ui/form` | 일반·상세 입력창, 선택창, 드롭다운 표현 |
| `@center/ui/search` | 검색창 |
| `@center/ui/card` | 목록·회원·관리 카드의 표현 슬롯 |
| `@center/ui/layout` | 관리자 배경, 사이드바, 본문 배치 |

기관별 페이지는 필드 개수·순서·표시 정보와 카드 슬롯 구성을 직접 정한다. API, 인증 저장소, 라우팅, 메뉴와 삭제·수정 권한은 앱에 둔다. 공통 UI에 기관 이름을 검사하는 조건문을 추가하지 않는다.

```tsx
import { ThemeProvider } from '@emotion/react';
import { createAdminTheme, orangeTheme } from '@center/tokens';
import { LoginForm } from '@center/ui/auth';

const theme = createAdminTheme(orangeTheme, {
  components: { fieldRadius: '0.75rem' },
});

export const Login = () => (
  <ThemeProvider theme={{ admin: theme }}>
    <LoginForm
      onLogin={submitLogin}
      onSuccess={openAdminHome}
      onChangePassword={openPasswordPage}
    />
  </ThemeProvider>
);
```

위 콜백은 앱이 제공한다. `onLogin`과 `onUpdatePassword`는 성공 시 `callbacks.onSuccess()`, 실패 시 사용자에게 보여줄 문자열로 `callbacks.onError(message)`를 호출한다. 비밀번호 변경 완료 버튼의 `onLogin`은 앱의 로그아웃과 로그인 화면 이동을 수행한다. 법동은 API가 준비되기 전까지 미연결 오류만 표시한다.

`@center/tokens`의 `blueTheme`이 구즉 기본값이다. `orangeTheme`은 같은 폰트·기본 규격에 법동 색상을 적용한다. 기관별 예외는 `createAdminTheme`으로 필요한 값만 덮어쓰며 원본 테마를 변경하지 않는다. 공통 컴포넌트는 로직을 파일 상단, 스타일을 하단에 둔다.

검증 명령은 저장소 루트에서 실행한다.

- `yarn check:admin-shared`: 공통 패키지 타입·린트 검사
- `yarn check:gujeuk-admin`, `yarn check:beopdong-admin`: 각 앱 전체 검사
