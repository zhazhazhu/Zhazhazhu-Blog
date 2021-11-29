export interface photoListModel {
  id: string;
  title: string | null;
  imgUrl: string;
  userId: string;
  state: number;
  likeIds:string | null;
}