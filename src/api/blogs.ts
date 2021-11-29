import { defHttp } from '../util/http/index';
import { searchListModel, commentModel, blogModel, photoModel } from './types/blogsModel';

enum API {
  blogListModel = 'api/blog/list',
  GetUploadPhoto = 'api/Form/GetUploadPhoto',
  GetBlogDetail = 'api/blog/GetBlogById',
  SaveCommentById = 'api/blog/SaveCommentByBlogId',
  DeleteCommentById = 'api/blog/DeleteCommentById',
  SaveBlog = 'api/blog/SaveBlog',
  SavePhoto = 'api/blog/SavePhoto',
  GetPhotoList = 'api/blog/GetPhotoByUserId'
}

export function getBlogList(search: searchListModel) {
  return defHttp.post(API.blogListModel, search)
}

export function getUploadPhoto(id?: string) {
  return defHttp.get(API.GetUploadPhoto, {
    params: { id }
  })
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
/**
 * @return 发布博客
 */
export function saveBlog(dto: blogModel) {
  return defHttp.post(API.SaveBlog, dto)
}
/**
 * @return dto 上传照片
 */
export function savePhoto(dto: photoModel) {
  return defHttp.post(API.SavePhoto, dto)
}

/**
 * @param {string} userId
 */
export function getPhotoByUserId(userId: string) {
  return defHttp.get(API.GetPhotoList, {
    params: { userId }
  })
}