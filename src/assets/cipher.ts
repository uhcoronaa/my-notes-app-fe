import * as crypto from 'crypto-js';
import { privateEnvironmet } from 'src/environments/private-environment';

function encrypt(text: string) {
    try {
        const encrypted = crypto.AES.encrypt(text.trim(), privateEnvironmet.keyUI.trim()).toString();
        return encrypted;
    }
    catch (err) {
        throw new Error('CIPHER_ERROR');
    }
}

export { encrypt }