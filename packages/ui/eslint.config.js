import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import hooks from 'eslint-plugin-react-hooks';
import refresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default tseslint.config({
  files: ['src/**/*.{ts,tsx}'],
  extends: [js.configs.recommended, ...tseslint.configs.recommended, hooks.configs['recommended-latest'], refresh.configs.vite],
  languageOptions: { globals: globals.browser },
});
