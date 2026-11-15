import { adminTokens } from '@center/tokens';

type FieldFocusTheme = Parameters<typeof adminTokens>[0];

interface FieldFocusOptions {
  readonly selector?: string;
  readonly outlineFallback?: boolean;
}

export const fieldFocusStyle = (
  theme: FieldFocusTheme,
  { selector = "&:focus, &[aria-expanded='true']", outlineFallback = true }: FieldFocusOptions = {},
): string => {
  const { colors, components } = adminTokens(theme);
  if (components.fieldFocus === 'highlight') {
    return `${selector} {
      outline: none;
      border-color: ${colors.primary};
      background-color: ${colors.fieldFocusBackground};
    }`;
  }
  return outlineFallback
    ? `&:focus-visible {
      outline: 2px solid ${colors.primary};
      outline-offset: 2px;
    }`
    : '';
};
