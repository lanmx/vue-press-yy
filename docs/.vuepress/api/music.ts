import axios from "axios";
axios.defaults.proxy = {
  protocol: 'http',
  host: '127.0.0.1',
  port: 3001,
  // auth: {
  //   username: 'mikeymike',
  //   password: 'rapunz3l'
  // }
}

// 音乐列表
export function getMusic() {
  return axios.get('/misic/list')
}

