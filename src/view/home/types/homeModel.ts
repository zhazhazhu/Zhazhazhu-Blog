export interface blogListModel {
  id: string
  title: string;
  abstract: string;
  author: string;
  createdAt: string;
}

/**
 * @param blogDetailModel
 * @private 博客详情
 */
export interface blogDetailModel {
  id: string;
  title: string;
  abstract: string;
  author: string;
  content: string;
  createdAt: number;
  commentList: commentModel[]
}

/**
 * @param 评论
 */
export interface commentModel {
  id: string;
  userId: string;
  userName: string;
  avatar: string;
  content: string;
  createdAt: number;
}