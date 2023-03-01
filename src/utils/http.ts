import axios from 'axios';

const http = axios.create({baseURL: 'http://one-hana.site:8000/app/'});
// http.interceptors.request.use(
//   config => {
//     const isAuthenticated = stores.getters.isAuthenticated;
//     if (isAuthenticated) {
//       config.headers.common.Authorization = `Bearer ${stores.getters.getAccessToken}`;
//     }
//     return config;
//   },
//   error => {
//     Promise.reject(error);
//   },
// );

export default http;
