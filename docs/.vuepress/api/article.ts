import { get, post } from "./http";
// 文章列表
export function getArticle() {
  return get('/article/list');
}
// 根据类别和父类获取文章列表
export function getCateArticle(params) {
  return post('/article/list', params);
}
// 新增文章阅读量
export function addRead(params) {
  return post('/article/add', params);
}
// 点赞
export function addLike(params) {
  return post('/article/like', params);
}
// 取消点赞
export function removeLike(params) {
  return post('/article/cancellike', params);
}
// 搜索文章
export function searchArticle(params) {
  return post('/article/search', params);
}


