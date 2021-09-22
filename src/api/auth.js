import Cookies from 'js-cookie'

const TokenKey = 'eshop-Token'

const RefreshTokenKey = 'eshop-RToken'

export function getToken() {
    return sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
    return sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
    return sessionStorage.removeItem(TokenKey)
}	

export function getRefreshToken() {
    return sessionStorage.getItem(RefreshTokenKey)
}

export function setRefreshToken(token) {
    return sessionStorage.setItem(RefreshTokenKey, token)
}

export function removeRefreshToken() {
    return sessionStorage.removeItem(RefreshTokenKey)
}

export function removeAllSessionItem() {
    Object.keys(sessionStorage).forEach(key => {
        if (key.indexOf('eshop') > -1) {
            sessionStorage.removeItem(key)
        }
    })
    return true
}

const expiresAtKey = 'Expiration'

export function getExpires() {
    return Cookies.get(expiresAtKey)
}

export function setExpires(expiresAt, expires) {
    return Cookies.set(expiresAtKey, expiresAt, { expires: expires })
}

export function removeExpires() {
    return Cookies.remove(expiresAtKey)
}
