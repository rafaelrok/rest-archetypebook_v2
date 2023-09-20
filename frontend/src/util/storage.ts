// export type LoginResponse = {
//   accessToken: string;
//   token_type: string;
//   refresh_Token: string;
//   expires_in: number;
//   scope: string;
//   username: string;
//   userId: number;
// };

export type LoginResponse = {
  accessToken: string;
};

const tokenKey = 'accessToken';
export const saveAuthData = (obj: LoginResponse) => {
  localStorage.setItem(tokenKey, JSON.stringify(obj)); //(JSON.stringify) converte o obj em string.
};

export const getAuthData = () => {
  //"{}" Pega o obj e converte em string com "JSON.parse" e o cast "as LoginResponse" garante o tipo de dado
  const str = localStorage.getItem(tokenKey) ?? '{}';
  return JSON.parse(str) as LoginResponse;
};

export const removeAuthData = () => {
  localStorage.removeItem(tokenKey);
};
