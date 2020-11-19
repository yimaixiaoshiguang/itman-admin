const TokenKey = 'cpms-Token'

export function getToken() {
	return sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
	return sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
	return sessionStorage.removeItem(TokenKey);
}

export function removeAllSessionItem() {
	Object.keys(sessionStorage).forEach(key => {
		if(key.indexOf('cpms') > -1){
			sessionStorage.removeItem(key)
		}
	} )
	return true
}
