const ADULT_FALLBACK_NAME = '성인';

export const getVisitDisplayName = (visit: { readonly name: string | null }) => visit.name?.trim() || ADULT_FALLBACK_NAME;
