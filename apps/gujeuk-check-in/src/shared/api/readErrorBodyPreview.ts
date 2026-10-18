export const readErrorBodyPreview = async (
  data: unknown,
  maxLength = 50
): Promise<string> => {
  const errorBodyText =
    data instanceof Blob
      ? await data.text()
      : typeof data === 'string'
        ? data
        : '';

  if (!errorBodyText) {
    return '';
  }

  return errorBodyText.length > maxLength
    ? `${errorBodyText.slice(0, maxLength)}...`
    : errorBodyText;
};
