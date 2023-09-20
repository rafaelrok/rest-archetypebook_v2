import axios from 'axios';
import qs from 'qs';
import { AxiosRequestConfig } from 'axios';
import history from './history';
import { getAuthData } from './storage';

export const BASE_URL =
  process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';

const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? '53cr37';

type LoginData = {
  username: string;
  password: string;
};

export const requestBackendLogin = (loginData: LoginData) => {
  const headers = {
    Authorization: 'Basic' + window.btoa(CLIENT_SECRET),
  };

  const data = qs.stringify({
    ...loginData,
    grant_type: 'password',
  });

  return axios({
    method: 'POST',
    baseURL: BASE_URL,
    url: '/auth/signin',
    data,
    headers,
  });
};

// export const requestBackendLogin = (loginData: LoginData) => {
//   //(qs.strindify) monta um QueryString de requisição apartir de um objeto.
//   const data = {
//     ...loginData,
//     username: loginData.username,
//     password: loginData.password,
//   };

//   return axios({
//     method: 'POST',
//     baseURL: BASE_URL,
//     url: '/auth/signin',
//     data,
//   })
//     .then((response) => {
//       localStorage.setItem('username', loginData.username);
//       localStorage.setItem('accessToken', response.data.token);
//       return response;
//     })
//     .catch((error) => {
//       alert('Erro ao logar na aplicação!');
//     });
// };

//(requestBackend) responsavel por efetuar a requisição de rotas
export const requestBackend = (config: AxiosRequestConfig) => {
  const headers = config.withCredentials
    ? {
        ...config.headers,
        Authorization: 'Bearer' + getAuthData().accessToken,
      }
    : config.headers;

  return axios({ ...config, baseURL: BASE_URL, headers });
};

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      history.push('/auth/signin');
    }
    return Promise.reject(error);
  }
);
