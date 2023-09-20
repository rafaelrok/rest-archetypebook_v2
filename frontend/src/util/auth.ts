import jwtDecode from 'jwt-decode';
import { getAuthData } from './storage';

export type Permission = 'ADMIN' | 'MANAGER' | 'COMMON_USER';

export type TokenData = {
  exp: number;
  username: string;
  authorities: Permission[];
};

export const getTokenData = (): TokenData | undefined => {
  try {
    return jwtDecode(getAuthData().accessToken) as TokenData;
  } catch (error) {
    return undefined;
  }
};

// Verifica a autenticação do (Usuário) analisando o exp do futuro para expiração
export const isAuthenticated = (): boolean => {
  const tokenData = getTokenData();
  return tokenData && tokenData.exp * 1000 > Date.now() ? true : false;
};

export const hasAnyRoles = (permissions: Permission[]): boolean => {
  if (permissions.length === 0) {
    return true;
  }

  //Percorre os roles do type(tokenData.authorities) e verifica se contem o role do usuário logado
  const tokenData = getTokenData();

  // Metodo (some) função de alta ordem, testando o elemento de uma lista
  if (tokenData !== undefined) {
    return permissions.some((permission) =>
      tokenData.authorities.includes(permission)
    );
  }

  /*
    // Metodo alternativo percorrento com for
    if (tokenData !== undefined) {
        for (var i = 0; i < roles.length; i++){
            if (tokenData.authorities.includes(roles[i])) {
                return true;
            }
        }
    }
    */

  return false;
};
