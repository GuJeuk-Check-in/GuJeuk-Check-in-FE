import * as Sentry from '@sentry/react';
import { reactRouterBrowserTracingIntegration } from '@sentry/react/react-router';

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN?.trim() ?? '';
const DEFAULT_TRACES_SAMPLE_RATE = 0.1;

const parseTracesSampleRate = (value: string | undefined): number => {
  if (!value) return DEFAULT_TRACES_SAMPLE_RATE;

  const parsedValue = Number(value);
  if (!Number.isFinite(parsedValue)) return DEFAULT_TRACES_SAMPLE_RATE;

  return Math.min(Math.max(parsedValue, 0), 1);
};

const parseTracePropagationTargets = (
  value: string | undefined
): string[] | undefined => {
  if (!value) return undefined;

  const targets = value
    .split(',')
    .map((target) => target.trim())
    .filter(Boolean);

  return targets.length > 0 ? [...new Set(targets)] : undefined;
};

export const initializeSentryMonitoring = (): void => {
  if (!SENTRY_DSN) return;

  Sentry.init({
    dsn: SENTRY_DSN,
    environment: import.meta.env.MODE,
    integrations: [reactRouterBrowserTracingIntegration()],
    tracesSampleRate: parseTracesSampleRate(
      import.meta.env.VITE_SENTRY_TRACES_SAMPLE_RATE,
    ),
    tracePropagationTargets: parseTracePropagationTargets(
      import.meta.env.VITE_SENTRY_TRACE_PROPAGATION_TARGETS,
    ),
  });
};

export const SentryErrorBoundary = Sentry.ErrorBoundary;
