import { defHttp } from '../util/http/index';
import { searchListModel } from './types/blogsModel';

enum API {
  blogListModel = 'api/blog/list',
  GetUploadPhoto = 'api/Form/GetUploadPhoto',
  GetBlogDetail = 'api/blog/GetBlogById'
}

export function getBlogList(search: searchListModel) {
  return defHttp.post(API.blogListModel, search)
}

export function getUploadPhoto(id?: string) {
  return defHttp.get(API.GetUploadPhoto, id)
}

export function getBlogData(id: string) {
  return defHttp.get(API.GetBlogDetail, {
    params: { id }
  })
}