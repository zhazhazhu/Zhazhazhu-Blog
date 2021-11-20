import { useUserStore } from '/@/store/modules/user';
import { UserInfo } from '../../../types/store';
enum Local {
  TOKEN = 'VUE_QZZHU_TOKEN',
  EXPIRES = 'VUE_QZZHU_EXPIRES',
  USERINFO = 'VUE_QZZHU_USERINFO'
}

export function setLocalToken(token: string | undefined) {
  token ?
    window.localStorage.setItem(Local.TOKEN, token)
    :
    window.localStorage.removeItem(Local.TOKEN)
  return token
}

export function setLocalExpiresIn(expiresIn: number | undefined) {
  expiresIn ?
    window.localStorage.setItem(Local.EXPIRES, String(expiresIn))
    :
    window.localStorage.removeItem(Local.EXPIRES)
  return expiresIn
}

export function setLocalUserInfo<T = UserInfo | null>(userInfo: T): T {
  userInfo ?
    window.localStorage.setItem(Local.USERINFO, JSON.stringify(userInfo))
    :
    window.localStorage.removeItem(Local.USERINFO)
  return userInfo
}

export function getLocalToken(): string | null {
  return window.localStorage.getItem(Local.TOKEN) || null
}

export function getLocalExpiresIn(): number | undefined {
  return Number(window.localStorage.getItem(Local.EXPIRES)) || undefined
}

export function getLocalUserInfo(): UserInfo | null {
  if (window.localStorage.getItem(Local.USERINFO)) {
    return JSON.parse(window.localStorage.getItem(Local.USERINFO) || '')
  } else {
    return null
  }
}

export function isExpiresIn(expiresIn: number): boolean {
  const Now = Date.now()
  return Now === expiresIn ? true : false
}