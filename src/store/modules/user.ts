import { defineStore } from 'pinia';
import { store } from '..';
import { UserInfo } from '../../../types/store';
import { setLocalToken } from '../../util/auth/index';
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
      return this.userInfo || {
        userName: '',
        email: '',
        avatar: '',
        phoneNumber: '',
      }
    },
    getToken(): string {
      return this.token
    },
    getExpiresIn(): number {
      return this.expiresIn
    },
  },
  actions: {
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo
    },
    setToken(token: string) {
      this.token = token
    },
    setExpiresIn(expiresIn: number) {
      this.expiresIn = expiresIn
    },
    /**
     * @login
     */
    async login(token: string, expiresIn: number) {
      this.setToken(token)
      this.setExpiresIn(expiresIn)
      setLocalToken(token)
      await getUserInfo()
      router.push('/home')
    }
  }
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}