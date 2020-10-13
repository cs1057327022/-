const TokenKey = 'Admin-Token'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken() {
  return localStorage.setItem(TokenKey, '12451251251212451')
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}
