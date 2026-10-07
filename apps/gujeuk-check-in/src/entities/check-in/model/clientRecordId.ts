export const createClientRecordId = (): string => {
  if (typeof crypto === 'undefined') {
    throw new Error('안전한 clientRecordId를 생성할 수 없습니다.');
  }

  const webCrypto: Crypto = crypto;
  const randomUUID = webCrypto.randomUUID;

  if (typeof randomUUID === 'function') {
    return randomUUID.call(webCrypto);
  }

  const bytes = webCrypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0'));

  return `${hex.slice(0, 4).join('')}-${hex.slice(4, 6).join('')}-${hex
    .slice(6, 8)
    .join('')}-${hex.slice(8, 10).join('')}-${hex.slice(10).join('')}`;
};
