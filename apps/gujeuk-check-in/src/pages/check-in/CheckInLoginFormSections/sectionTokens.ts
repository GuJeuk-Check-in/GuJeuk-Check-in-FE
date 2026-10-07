export type LoginPurposeTone = 'peach' | 'mint' | 'blue';
export type LoginSectionTone = LoginPurposeTone | 'pink';

export const toneShadow = {
  peach: '#f7d9be',
  mint: '#c5dedb',
  blue: '#ccd9ea',
  pink: '#f8cbd5',
} as const;

export const toneColor = {
  peach: '#f28d31',
  mint: '#00a89d',
  blue: '#2868d8',
  pink: '#ef4b75',
} as const;

export const selectedBackground = {
  peach: '#fff5ec',
  mint: '#effbf9',
  blue: '#f0f6ff',
  pink: '#fff1f5',
} as const;

export const selectedRing = {
  peach: 'rgba(242, 141, 49, 0.18)',
  mint: 'rgba(0, 168, 157, 0.18)',
  blue: 'rgba(40, 104, 216, 0.18)',
  pink: 'rgba(239, 75, 117, 0.18)',
} as const;
