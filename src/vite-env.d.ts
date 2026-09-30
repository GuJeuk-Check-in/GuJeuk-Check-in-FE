/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_SENTRY_DSN?: string;
  readonly VITE_SENTRY_TRACES_SAMPLE_RATE?: string;
  readonly VITE_MIXPANEL_TOKEN?: string;
  readonly VITE_MIXPANEL_DEBUG?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

type GtagArguments = readonly [command: string, ...parameters: readonly unknown[]];
type GtagFunction = (...arguments_: GtagArguments) => void;

interface Window {
  dataLayer?: unknown[];
  googleAnalyticsConfiguredForId?: string;
  gtag?: GtagFunction;
}
