import { errorsTrs } from "../translations";

export function validatePhoneNumber(phoneNumber: string, lang:'fa'|'en'='fa'): boolean|string {
    if (!/^(\+98|0)?9\d{9}$/.test(phoneNumber)) {
        return errorsTrs.wrongPhoneNumberFormat[lang]
    }
    
    return true
}

export function validateEmail(email: string, lang:'fa'|'en'='fa'): boolean|string {
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        return errorsTrs.wrongEmailFormat[lang]
    }

    return true
}

export function validatePassword(pass: string, lang:'fa'|'en'='fa'): boolean|string {
    if (pass.length < 8) {
        return errorsTrs.passwordLength[lang]
    }

    if (!/[azAZ]/.test(pass)) {
        return errorsTrs.atLeastOneLetter[lang]
    }

    if (!/[0-9]/.test(pass)) {
        return errorsTrs.atLeastOneNumber[lang]
    }

    return true
}
