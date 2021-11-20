import { defineStore } from 'pinia';
import { store } from '..';
import { UserInfo } from '../../../types/store';
import { setLocalToken, getLocalToken, setLocalExpiresIn, getLocalExpiresIn, setLocalUserInfo, getLocalUserInfo } from '/@/util/auth/index';
import router from '/@/router/index';
import { getUserInfo } from '/@/api/user';
import { ElMessage } from 'element-plus';

interface UserState {
  userInfo: UserInfo | null;
  token: string | undefined;
  expiresIn: number | undefined;
  refreshToken?: string | undefined;
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
    getUserInfo(): UserInfo | null {
      return this.userInfo || getLocalUserInfo()
    },
    getToken(): string | null {
      return this.token || getLocalToken() || null
    },
    getExpiresIn(): number {
      return this.expiresIn || getLocalExpiresIn() || 0
    },
  },
  actions: {
    setUserInfo(userInfo: UserInfo | null) {
      this.userInfo = userInfo
      setLocalUserInfo(userInfo)
    },
    setToken(token: string | undefined) {
      this.token = token
      setLocalToken(token)
    },
    setExpiresIn(expiresIn: number | undefined) {
      this.expiresIn = expiresIn || undefined
      setLocalExpiresIn(expiresIn)
    },
    /**
     * @login
     */
    async login(token: string, expiresIn: number) {
      await this.setToken(token)
      await this.setExpiresIn(expiresIn)
      await this.getActiveUserInfo()
    },
    async getActiveUserInfo() {
      const { code, data } = await getUserInfo()
      if (code === 1) {
        await this.setUserInfo(data)
        router.push('/home')
      }
    },
    async logout() {
      await this.setToken(undefined)
      await this.setExpiresIn(undefined)
      await this.setUserInfo(null)
      ElMessage({
        message: '退出登录 成功'
      })
      router.push('/login')
    }
  }
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}