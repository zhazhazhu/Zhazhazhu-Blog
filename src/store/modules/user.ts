import { defineStore } from 'pinia';
import { store } from '..';
import { UserInfo } from '../../../types/store';
import { setLocalToken, getLocalToken, setLocalExpiresIn, getLocalExpiresIn, setLocalUserInfo, getLocalUserInfo } from '/@/util/auth/index';
import router from '/@/router/index';
import { getUserInfo } from '/@/api/user';

interface UserState {
  userInfo: UserInfo | null;
  token: string;
  expiresIn: number;
  refreshToken?: string;
}

export const useUserStore = defineStore({
  id: 'user-store',
  state: (): UserState => ({
    userInfo: null,
    token: '',
    expiresIn: 0,
    refreshToken: ''
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getLocalUserInfo()
    },
    getToken(): string {
      return this.token || getLocalToken()
    },
    getExpiresIn(): number {
      return this.expiresIn || getLocalExpiresIn()
    },
  },
  actions: {
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo && setLocalUserInfo(userInfo)
    },
    setToken(token: string) {
      this.token = token && setLocalToken(token)
    },
    setExpiresIn(expiresIn: number) {
      this.expiresIn = expiresIn && setLocalExpiresIn(expiresIn)
    },
    /**
     * @login
     */
    async login(token: string, expiresIn: number) {
      await this.setToken(token)
      await this.setExpiresIn(expiresIn)
      const { code, data } = await getUserInfo()
      if (code === 1) {
        await this.setUserInfo(data)
      }
      router.push('/home')
    },
  }
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}