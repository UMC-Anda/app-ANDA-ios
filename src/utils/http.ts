import axios from 'axios';
import {getAccessToken} from './jwt';

const http = axios.create({baseURL: 'http://one-hana.site:8000/app/'});
http.interceptors.request.use(
  async config => {
    const accessToekn = await getAccessToken();
    if (accessToekn) {
      config.headers.common.Authorization = `Bearer ${accessToekn}`;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

export default http;
