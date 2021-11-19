import { defHttp } from '../util/http/index';
import { userModel } from '../view/login/types/index';

enum API {
  login = '/login',
  userInfo = '/userInfo'
}

export function login(user: userModel) {
  return defHttp.post(API.login, user)
}

export function getUserInfo() {
  return defHttp.get(API.userInfo)
}
