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

  return encryptedTarget.ciphertext.toString().toUpperCase();
};

export const decrypt = (encryptedTarget: string, key: string, iv: string) => {
  const parsedTarget = crypto.enc.Base64.stringify(crypto.enc.Hex.parse(encryptedTarget));
  const parsedKey = crypto.enc.Utf8.parse(key);
  const parsedIV = crypto.enc.Utf8.parse(iv);

  const target = crypto.AES.decrypt(parsedTarget, parsedKey, {
    mode: crypto.mode.CBC,
    padding: crypto.pad.Pkcs7,
    iv: parsedIV,
  });

  return target.toString(crypto.enc.Utf8);
};

export const getRandStr = (len: number) => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const res = new Array<string>(len).fill("").map((_) => {
    const index = Math.floor(Math.random() * chars.length);
    return chars[index];
  }).join("");

  return res;
};
