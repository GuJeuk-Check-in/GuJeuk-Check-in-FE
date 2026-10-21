import type {} from '@emotion/react';

export interface AdminColors {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  authButton: string;
  authButtonHover: string;
  authLink: string;
  authLinkHover: string;
  authInputBorder: string;
  authPanelShadow: string;
  error: string;
  warning: string;
  cardBorder: string;
  selected: string;
  selectedHover: string;
  white: string;
  black: string;
  text: string;
  fieldBorder: string;
  secondaryText: string;
  mutedText: string;
  circles: readonly string[];
}

export const typography = {
  bodyFamily: "'Pretendard', sans-serif",
  titleFamily: "'Jua', sans-serif",
  authTitle: '2.5rem',
  authTitleMobile: '2rem',
  authTitleSmall: '1.5rem',
  authTitleWeight: 300,
  input: '1.25rem',
  inputMobile: '1rem',
  authButton: '1.5rem',
  authButtonMobile: '1.2rem',
  authButtonSmall: '1rem',
  authButtonWeight: 500,
} as const;

export const componentMetrics = {
  authInputHeight: '4.5rem',
  authInputHeightMobile: '3.5rem',
  authInputRadius: '2.2rem',
  authPanelRadius: '20px',
  fieldHeight: '3.5rem',
  fieldRadius: '0.5rem',
  cardRadius: '2.25rem',
  sidebarWidth: 'max(20vw, 17rem)',
};

export interface AdminTheme {
  colors: AdminColors;
  typography: { [Key in keyof typeof typography]: (typeof typography)[Key] extends number ? number : string };
  components: typeof componentMetrics;
}

export const blueTheme: AdminTheme = {
  colors: {
    primary: '#0F50A0', primaryDark: '#1e3a8a', primaryLight: '#c2d5ec',
    authButton: '#3d72b3', authButtonHover: '#c2d5ec',
    authLink: '#a4dfff', authLinkHover: '#bee8ff',
    authInputBorder: 'rgba(15, 80, 160, 0.6)',
    authPanelShadow: 'rgb(207, 220, 235)',
    error: '#ff5a5a', warning: '#D88282', cardBorder: '#6f95c4',
    selected: '#E9F0FF', selectedHover: '#f4f8ff',
    white: '#ffffff', black: '#000000', text: '#2e2e32',
    fieldBorder: '#404040', secondaryText: '#828284', mutedText: '#969698',
    circles: ['#0F50A0', '#2ABFEC', '#FBBC18', '#2BBDEC', '#E6222C', '#17A753',
      '#2BBDEC', '#A1298C', '#2BBDEC', '#E8232C', '#2ABFEC', '#FBBC18', '#17A753'],
  },
  typography,
  components: componentMetrics,
};

export const orangePalette = {
  main: '#FF9000', dark: '#9B4D00', light: '#FFF4E4', bright: '#F5C343',
  red: '#E8232C', redShadow: '#F79CA0', pink: '#EF4B75', pinkShadow: '#F8CBD5',
  blue: '#2868D8', blueShadow: '#CBD9F5', green: '#00A89D', greenShadow: '#C5DEDB',
} as const;

export const orangeTheme: AdminTheme = {
  ...blueTheme,
  colors: {
    ...blueTheme.colors,
    primary: orangePalette.main, primaryDark: orangePalette.dark,
    primaryLight: orangePalette.light, authButton: orangePalette.bright,
    authButtonHover: orangePalette.light, authLink: orangePalette.light,
    authLinkHover: '#ffffff', authInputBorder: 'rgba(255, 144, 0, 0.6)',
    authPanelShadow: 'rgba(0, 0, 0, 0.2)',
    error: orangePalette.red, warning: orangePalette.redShadow,
    cardBorder: orangePalette.light, selected: orangePalette.light,
    selectedHover: orangePalette.light,
    circles: [orangePalette.main, orangePalette.blue, orangePalette.green,
      orangePalette.blue, orangePalette.pink, orangePalette.main,
      orangePalette.blue, orangePalette.red, orangePalette.blue,
      orangePalette.pink, orangePalette.blue, orangePalette.green, orangePalette.red],
  },
};

export const createAdminTheme = (
  base: AdminTheme,
  overrides: {
    colors?: Partial<AdminColors>;
    typography?: Partial<AdminTheme['typography']>;
    components?: Partial<AdminTheme['components']>;
  } = {},
): AdminTheme => ({
  colors: { ...base.colors, ...overrides.colors },
  typography: { ...base.typography, ...overrides.typography },
  components: { ...base.components, ...overrides.components },
});

export const adminTokens = (theme: { admin?: AdminTheme }): AdminTheme => theme.admin ?? blueTheme;

declare module '@emotion/react' {
  interface Theme {
    admin?: AdminTheme;
  }
}
