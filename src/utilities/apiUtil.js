import axios from 'axios';

import { handleErrorAPI } from './handleError';

const getInstance = (config) => {
  const instance = axios.create({
    baseURL: process.env.SERVER_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    (conf) => {
      const configInstace = conf;
      if (
        configInstace.method === 'get'
        || configInstace.data === undefined
      ) {
        configInstace.data = true;
      }
      const newConfig = { ...configInstace, ...config };
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(newConfig);
      }
      return newConfig;
    },
    (error) => Promise.reject(error),
  );
  return instance;
};

const httpRequest = (method, path, data, config = {}) => new Promise((resolve, reject) => {
  getInstance(config)[method](path, data, {})
    .then((response) => resolve(response))
    .catch((error) => reject(handleErrorAPI(error)));
});

const apiUtil = {
  get(path, data, config) {
    return httpRequest('get', path, data, config);
  },
  post(path, data, config) {
    return httpRequest('post', path, data, config);
  },
}

export default apiUtil;
