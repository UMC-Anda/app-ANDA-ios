const baseURL = 'one-hana.site:8000';
const fetch = (url: string, ...params: any[]): any => {
  if (url.startsWith('/')) {
    return fetch(baseURL + url, ...params);
  } else {
    return fetch(baseURL + '/' + url, ...params);
  }
};

export default fetch;
