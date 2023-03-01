import axios from 'axios';
import {selector} from 'recoil';
import {accessTokenState} from './jwt';

const httpState = selector({
  key: 'http',
  get: ({get}) => {
    const http = axios.create({baseURL: 'http://one-hana.site:8000/app/'});
    http.interceptors.request.use(
      async config => {
        const accessToekn = get(accessTokenState);
        if (accessToekn) {
          config.headers.common.Authorization = `Bearer ${accessToekn}`;
        }
        return config;
      },
      error => {
        Promise.reject(error);
      },
    );
    http.interceptors.response.use(
      async response => {
        return response;
      },
      error => {
        // const {
        //   config,
        //   response: {status},
        // } = error;

        // if (status === 401) {
        //   if (error.response.data.message === 'TokenExpiredError') {
        //     const refresh = useSetRecoilState(refreshAccessTokenState);
        //     refresh();
        //     const originalRequest = config;
        //     const refreshToken = await AsyncStorage.getItem('refreshToken');
        //     // token refresh 요청
        //     const {data} = await axios.post(
        //       'http://localhost:3000/refresh/token', // token refresh api
        //       {
        //         refreshToken,
        //       },
        //     );
        //     // 새로운 토큰 저장
        //     const {accessToken: newAccessToken, refreshToken: newRefreshToken} =
        //       data;
        //     await AsyncStorage.multiSet([
        //       ['accessToken', newAccessToken],
        //       ['refreshToken', newRefreshToken],
        //     ]);
        //     axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        //     originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        //     // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
        //     return axios(originalRequest);
        //   }
        // }
        return Promise.reject(error);
        // Promise.reject(error);
      },
    );
    return http;
  },
});

export default httpState;
