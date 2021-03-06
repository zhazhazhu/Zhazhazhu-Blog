export interface searchListModel {
  pageIndex: number; //当前页
  pageSize: number; //展示多少条数据
  keyWord: string; //搜索
  sortField: string;
  sortType: string;
  totalCount: number; //总共多少条
}
export interface commentModel {
  blogId?: string;
  userId?: string;
  userName?: string;
  avatar?: string;
  createdAt?: number | null;
  content?: string;
  parentId: string | null;
  childrenId: string | null;
}

export interface blogModel {
  id?: string;
  title: string;
  abstract: string;
  content: string;
  author: string;
  createdAt?: string;
}

export interface photoModel {
  id: string | null;
  title: string | null;
  imgUrl: string;
  userId: string;
}