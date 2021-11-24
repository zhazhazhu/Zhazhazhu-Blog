import { defHttp } from '../util/http/index';
import { searchListModel, commentModel } from './types/blogsModel';

enum API {
  blogListModel = 'api/blog/list',
  GetUploadPhoto = 'api/Form/GetUploadPhoto',
  GetBlogDetail = 'api/blog/GetBlogById',
  SaveCommentById = 'api/blog/SaveCommentByBlogId',
  DeleteCommentById = 'api/blog/DeleteCommentById'
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
/**
 * @return 保存评论
 */
export function saveCommentById(dto: commentModel) {
  return defHttp.post(API.SaveCommentById, dto)
}
/**
 * @return 删除评论
 */
export function deleteCommentById(id: string) {
  return defHttp.delete(API.DeleteCommentById, {
    params: { id }
  })
}