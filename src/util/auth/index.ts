import { useUserStore } from '/@/store/modules/user';
import { UserInfo } from '../../../types/store';
enum Local {
  TOKEN = 'VUE_QZZHU_TOKEN',
  EXPIRES = 'VUE_QZZHU_EXPIRES',
  USERINFO = 'VUE_QZZHU_USERINFO'
}

export function setLocalToken(token: string) {
  window.localStorage.setItem(Local.TOKEN, token)
  return token
}

export function setLocalExpiresIn(expiresIn: number) {
  window.localStorage.setItem(Local.EXPIRES, String(expiresIn))
  return expiresIn
}

export function setLocalUserInfo<T = UserInfo>(userInfo: T): T {
  window.localStorage.setItem(Local.USERINFO, JSON.stringify(userInfo))
  return userInfo
}

export function getLocalToken(): string {
  return String(window.localStorage.getItem(Local.TOKEN))
}

export function getLocalExpiresIn(): number {
  return Number(window.localStorage.getItem(Local.EXPIRES))
}

export function getLocalUserInfo(): UserInfo {
  return JSON.parse(window.localStorage.getItem(Local.USERINFO) || '')
}