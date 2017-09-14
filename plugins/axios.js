import axios from 'axios';
import Qs from 'qs';
// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_URL, // api的base_url
    timeout: 15000,
    transformRequest: [function (data) {
        　data = Qs.stringify({});
        return data;
    }]
});
// request拦截器
service.interceptors.request.use(config => {
//   if (store.getters.token) {
//     config.headers.TBSAccessToken = store.getters.token;
//     config.headers.deviceId = 1;
//   }
  return config;
}, error => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
})

// respone拦截器
service.interceptors.response.use(
  response => response
  ,
  error => {
    console.log('err' + error);// for debug
    return Promise.reject(error);
  }
)

export default service;
