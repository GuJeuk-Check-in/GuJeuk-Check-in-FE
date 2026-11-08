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
  fieldFocusBackground: string;
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
  fieldFocus: 'outline' as 'highlight' | 'outline',
  cardRadius: '2.25rem',
  sidebarWidth: 'max(20vw, 17rem)',
};

export const ColorData = {
  colors: {
    primary: '#0066FF',
    primaryStrong: '#005EEB',
    primaryLight: '#EAF2FE',
    primary8: 'rgba(0, 102, 255, 0.08)',
    labelNormal: '#171719',
    labelNeutral: 'rgba(46, 47, 51, 0.88)',
    labelAlternative: 'rgba(55, 56, 60, 0.61)',
    labelAssistive: 'rgba(55, 56, 60, 0.28)',
    labelDisabled: 'rgba(55, 56, 60, 0.16)',
    lineNormal: '#D9DADD',
    fillNormal: 'rgba(112, 115, 124, 0.08)',
    background: '#FFFFFF',
    interactionDisabled: '#F4F4F5',
    dimmer: 'rgba(23, 23, 25, 0.52)',
    positive: '#00BF4F',
    positiveBackground: '#EAFBF0',
    caution: '#FF9200',
    cautionBackground: '#FFF4E5',
    negative: '#FF4242',
    negativeBackground: '#FFF0F0',
  },
  spacing: {
    4: '0.25rem',
    8: '0.5rem',
    12: '0.75rem',
    16: '1rem',
    24: '1.5rem',
    32: '2rem',
  },
  radius: {
    medium: '0.5rem',
    large: '0.625rem',
    modal: '1rem',
    pill: '999px',
  },
  shadow: {
    popover: '0 4px 16px rgba(0, 0, 0, 0.12)',
    focus: '0 0 0 2px #0066FF',
  },
  typography: {
    fontFamily:
      'Pretendard, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif',
    title: { fontSize: '1.625rem', fontWeight: 700, lineHeight: 1.3 },
    body: { fontSize: '0.875rem', fontWeight: 500, lineHeight: 1.5 },
    label: { fontSize: '0.8125rem', fontWeight: 600, lineHeight: 1.4 },
    caption: { fontSize: '0.75rem', fontWeight: 500, lineHeight: 1.4 },
  },
  interaction: {
    transitionFast: '150ms ease',
    transitionNormal: '200ms ease',
  },
} as const;

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
    fieldBorder: '#404040', secondaryText: '#828284', mutedText: '#969698', fieldFocusBackground: '#fbfbff',
    circles: ['#0F50A0', '#2ABFEC', '#FBBC18', '#2BBDEC', '#E6222C', '#17A753',
      '#2BBDEC', '#A1298C', '#2BBDEC', '#E8232C', '#2ABFEC', '#FBBC18', '#17A753'],
  },
  typography,
  components: componentMetrics,
};

export const orangePalette = {
  main: '#FF9000', dark: '#9B4D00', light: '#FFF4E4', bright: '#F5C343',
  red: '#E8232C', redShadow: '#F79CA0', pink: '#EF4B75',
  blue: '#2868D8', green: '#00A89D',
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

export const adminTokens = (theme: { admin?: AdminTheme }): AdminTheme => theme.admin ?? blueTheme;

declare module '@emotion/react' {
  interface Theme {
    admin?: AdminTheme;
  }
}
