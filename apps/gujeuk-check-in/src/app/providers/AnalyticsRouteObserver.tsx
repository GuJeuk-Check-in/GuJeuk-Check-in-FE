import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  normalizeAnalyticsPath,
  trackGoogleAnalyticsPageView,
} from '@shared/lib/googleAnalytics';

export const AnalyticsRouteObserver = () => {
  const location = useLocation();

  useEffect(() => {
    trackGoogleAnalyticsPageView({
      pagePath: normalizeAnalyticsPath(location.pathname),
      pageTitle: document.title,
    });
  }, [location.pathname]);

  return null;
};
