enum Local {
  TOKEN = 'VUE_QZZHU_TOKEN'
}

export function setLocalToken(token: string) {
  window.localStorage.setItem(Local.TOKEN, token)
}