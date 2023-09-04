import { get, post } from "./http";
// 新增文章阅读量
export function readAdd(params) {
  return post('/read/add', params);
}
// 获取文章阅读量
export function getReadTotal() {
  return get('/read/total');
}


