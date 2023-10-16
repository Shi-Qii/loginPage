// 密鑰，請替換為你的實際密鑰
const loginModuleKey = 'SecretKey'

// 加密
const AesEncrypt = (plainText, key) => {
    const encrypted = CryptoJS.AES.encrypt(plainText, key, {
        mode: CryptoJS.mode.ECB, // 使用ECB模式，注意：ECB模式不是最安全的選擇
        padding: CryptoJS.pad.Pkcs7 // 使用PKCS7填充
    });
    return encrypted.toString();
}

// 解密
const AesDecrypt = (cipherText, key) => {
    const decrypted = CryptoJS.AES.decrypt(cipherText, key, {
        mode: CryptoJS.mode.ECB, // 使用ECB模式，注意：ECB模式不是最安全的選擇
        padding: CryptoJS.pad.Pkcs7 // 使用PKCS7填充
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}

// Base64 編碼
const encode = (str) => {
    const wordArray = CryptoJS.enc.Utf8.parse(str);
    return CryptoJS.enc.Base64.stringify(wordArray);
}

// Base64 解碼
const decode = (str) => {
    const wordArray = CryptoJS.enc.Base64.parse(str);
    return CryptoJS.enc.Utf8.stringify(wordArray);
}

// 存入 Session Storage
const sessionSet = (key, val) => {
    console.log('sessionSet');
    const jsonString = JSON.stringify(val);
    const cipherText = encode(AesEncrypt(jsonString, loginModuleKey));
    sessionStorage.setItem(encode(key), cipherText);
}

// 從 Session Storage 取出
const sessionGet = (key) => {
    const cipherText = sessionStorage.getItem(encode(key));

    if (cipherText == null) return undefined;
    else {
        const jsonString = AesDecrypt(decode(cipherText), loginModuleKey);

        if (jsonString === "") return undefined;

        return JSON.parse(jsonString);
    }
}

