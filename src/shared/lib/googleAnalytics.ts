const GA_SCRIPT_ID = 'google-analytics-gtag';
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() ?? '';

type GoogleAnalyticsPageView = {
  readonly pagePath: string;
  readonly pageTitle: string;
};

const dynamicRouteSegmentNames: ReadonlyMap<string, string> = new Map([
  ['/log', ':logId'],
  ['/organ/user', ':userId'],
]);

const isIdentifierSegment = (segment: string): boolean =>
  /^\d+$/.test(segment) ||
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    segment,
  );

const normalizePathSegment = (
  segment: string,
  parentPath: string,
): string => {
  const dynamicSegmentName = dynamicRouteSegmentNames.get(parentPath);
  if (dynamicSegmentName && segment !== 'all' && segment !== 'create') {
    return dynamicSegmentName;
  }

  if (isIdentifierSegment(segment)) return ':id';

  return segment;
};

export const normalizeAnalyticsPath = (pathname: string): string => {
  const normalizedSegments: string[] = [];

  for (const segment of pathname.split('/').filter(Boolean)) {
    const parentPath = `/${normalizedSegments.join('/')}`;
    normalizedSegments.push(normalizePathSegment(segment, parentPath));
  }

  return `/${normalizedSegments.join('/')}`;
};

const ensureGoogleTagQueue = (): GtagFunction => {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(): void {
    // eslint-disable-next-line prefer-rest-params -- gtag.js expects the queued command to be the function arguments object.
    window.dataLayer?.push(arguments);
  };

  return window.gtag;
};

const sendGoogleTagCommand = (...arguments_: GtagArguments): void => {
  ensureGoogleTagQueue()(...arguments_);
};

export const initializeGoogleAnalytics = (): void => {
  if (!GA_MEASUREMENT_ID || typeof document === 'undefined') return;

  if (window.googleAnalyticsConfiguredForId !== GA_MEASUREMENT_ID) {
    sendGoogleTagCommand('js', new Date());
    sendGoogleTagCommand('config', GA_MEASUREMENT_ID, {
      send_page_view: false,
    });
    window.googleAnalyticsConfiguredForId = GA_MEASUREMENT_ID;
  }

  if (document.getElementById(GA_SCRIPT_ID)) return;

  const scriptElement = document.createElement('script');
  scriptElement.id = GA_SCRIPT_ID;
  scriptElement.async = true;
  scriptElement.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
    GA_MEASUREMENT_ID,
  )}`;
  document.head.append(scriptElement);
};

export const trackGoogleAnalyticsPageView = ({
  pagePath,
  pageTitle,
}: GoogleAnalyticsPageView): void => {
  if (!GA_MEASUREMENT_ID) return;

  sendGoogleTagCommand('event', 'page_view', {
    page_location: `${window.location.origin}${pagePath}`,
    page_path: pagePath,
    page_title: pageTitle,
  });
};
