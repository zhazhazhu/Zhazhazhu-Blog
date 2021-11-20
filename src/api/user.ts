import { defHttp } from '../util/http/index';
import { userModel, userDataModel } from '../view/login/types/index';

enum API {
  Login = '/login',
  UserInfo = '/userInfo',
  Register = '/register'
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
