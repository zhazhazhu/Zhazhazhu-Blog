import { useUserStore } from '/@/store/modules/user';
enum Local {
  TOKEN = 'VUE_QZZHU_TOKEN'
}

export function setLocalToken(token: string) {
  window.localStorage.setItem(Local.TOKEN, token)
}

export function getLocalToken(){
  const userStore = useUserStore()
  return window.localStorage.getItem(Local.TOKEN) || userStore.getToken
}