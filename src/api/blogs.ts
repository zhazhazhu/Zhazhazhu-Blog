import { defHttp } from '../util/http/index';
import { searchListModel } from './types/blogsModel';

enum API {
  blogListModel = 'api/blog/list'
}

export function getBlogList(search: searchListModel) {
  return defHttp.post(API.blogListModel, search)
}