import crypto from "crypto-js";

export const encrypt = (target: string, key: string, iv: string) => {
  const parsedTarget = crypto.enc.Utf8.parse(target);
  const parsedKey = crypto.enc.Utf8.parse(key);
  const parsedIV = crypto.enc.Utf8.parse(iv);

  const encryptedTarget = crypto.AES.encrypt(parsedTarget, parsedKey, {
    mode: crypto.mode.CBC,
    padding: crypto.pad.Pkcs7,
    iv: parsedIV,
  });

  return encryptedTarget.ciphertext.toString();
};

export const decrypt = (encryptedTarget: string, key: string, iv: string) => {
  const parsedKey = crypto.enc.Utf8.parse(key);
  const parsedIV = crypto.enc.Utf8.parse(iv);

  const target = crypto.AES.decrypt(encryptedTarget, parsedKey, {
    mode: crypto.mode.CBC,
    padding: crypto.pad.Pkcs7,
    iv: parsedIV,
  });

  return target.toString();
};
