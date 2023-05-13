import { get, post } from "./http";
// 音乐列表
export function getMusic() {
  return get('/music/list');
}

// 搜索音乐
export function searchlist(params) {
  return post('/music/search', params)
}

