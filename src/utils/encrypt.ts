

const stringToArrayBuffer = (str: string): ArrayBuffer =>
  new TextEncoder().encode(str).buffer;

const arrayBufferToString = (buffer: ArrayBuffer): string =>
  new TextDecoder().decode(buffer);

export const generateKey = async (): Promise<CryptoKey> => {
  return await window.crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true, // La clave es exportable
    ['encrypt', 'decrypt']
  )
}

export const encryptData = async <T>(key: CryptoKey, data: T) => {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    stringToArrayBuffer(JSON.stringify(data))
  );

  return {
    encryptedData: arrayBufferToBase64(encrypted),
    iv: arrayBufferToBase64(iv.buffer),
  };
};

export const decryptData = async (
  key: CryptoKey,
  encryptedData: string,
  iv: string
) => {
  const decrypted = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: new Uint8Array(base64ToArrayBuffer(iv)),
    },
    key,
    base64ToArrayBuffer(encryptedData)
  );

  return JSON.parse(arrayBufferToString(decrypted));
};

const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  const binary = bytes.reduce((acc, byte) => acc + String.fromCharCode(byte), "");
  return btoa(binary);
};

const base64ToArrayBuffer = (base64: string): ArrayBuffer => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
};

export const importCryptoKey = async (keyBase64: string): Promise<CryptoKey> => {
  const rawKey = Uint8Array.from(atob(keyBase64), (c) => c.charCodeAt(0));

  return await crypto.subtle.importKey(
    'raw',
    rawKey,
    { name: 'AES-GCM' },
    true,
    ['encrypt', 'decrypt']
  );
};

const encoder = new TextEncoder();

export const toUint8Array = (key: string) => {
  const encoded = encoder.encode(key);
  return encoded.toString()
}
