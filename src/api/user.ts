import { defHttp } from '../util/http/index';
import { userModel, userDataModel } from '../view/login/types/index';

enum API {
  Login = '/api/login',
  UserInfo = '/userInfo',
  Register = '/api/register',
  GitHubLogin = '/api/GithubLogin'
}

export function login(user: userModel) {
  return defHttp.post(API.Login, user)
}

export function getUserInfo() {
  return defHttp.get(API.UserInfo)
}

export function register(dto: userDataModel) {
  return defHttp.post(API.Register, dto)
}

export function gitHubLogin(code: string) {
  return defHttp.get(API.GitHubLogin, {
    params: { code }
  })
}