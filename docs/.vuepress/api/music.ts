import axios from "axios";
axios.defaults.baseURL = 'http://39.108.60.145:3001/';
// 音乐列表
export function getMusic() {
  return axios.get('/music/list')
  .then(function (response) {
    // 处理成功情况
    if (response.status === 200) {
      return response.data || {}
    }
    console.log(response);
  })
  .catch(function (error) {
    // 处理错误情况
    console.log(error);
    return error
  })
  .finally(function () {
    // 总是会执行
  });
}

