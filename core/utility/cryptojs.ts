import * as cryptoJS from 'crypto-js';

export class CryptoJS {
    // logger = new Logger();

    encryptMessage(value: string, secretKey: string) {
        // Convert the message to a WordArray using UTF-8 encoding
        var utf8Message = cryptoJS.enc.Utf8.parse(value);

        // Encrypt the UTF-8 encoded message using AES encryption
        var encryptedMessage = cryptoJS.AES.encrypt(utf8Message, secretKey).toString();

        // Display the encrypted message
        return encryptedMessage;
    }

    decryptMessage(value: string, secretKey: string) {
      
        // Decrypt the encrypted message using AES decryption
        var decryptedBytes = cryptoJS.AES.decrypt(value, secretKey);

        // Convert decrypted bytes to UTF-8 string
        var decryptedMessage = decryptedBytes.toString(cryptoJS.enc.Utf8);

        return decryptedMessage;
    }

    encrypt(text: string, key: string) {
        let keyutf;
        let iv;
        let enc;
        let encStr;
        try {
            if (key === null || key === 'undefined' || key === '') {
                throw new Error('Invalid CryptoJS Key : ' + key);
            }
            keyutf = cryptoJS.enc.Utf8.parse(key);
            iv = cryptoJS.enc.Base64.parse(key);
            enc = cryptoJS.AES.encrypt(text, keyutf, { iv: iv });
            encStr = enc.toString();
            return encStr;
        } catch (error) {
            // this.logger.log(error);
            throw new Error('encrypt:' + error);
        }
    }

    decrypt(text: string, key: string) {
        let keyutf;
        let iv;
        let encStr;
        let dec;
        let decStr;
        let encObj: any;
        try {
            if (key === null || key === 'undefined' || key === '') {
                throw new Error('Invalid CryptoJS Key : ' + key);
            }
            keyutf = cryptoJS.enc.Utf8.parse(key);
            iv = cryptoJS.enc.Base64.parse(key);
            encStr = cryptoJS.enc.Base64.parse(text);
            encObj = { ciphertext: encStr }
            dec = cryptoJS.AES.decrypt(encObj, keyutf, { iv: iv });
            decStr = cryptoJS.enc.Utf8.stringify(dec);
            return decStr;
        } catch (error) {
            // this.logger.log('decrypt:' + error);
            throw new Error('decrypt:' + error);
        }
    }

    MD5(text: string) {
        let key = '';
        try {
            key = cryptoJS.MD5(text) + '';
            return key + '';
        } catch (error) {
            // this.logger.log('hashMD5:' + error);
            throw new Error('md5:' + error);
        }
    }

}