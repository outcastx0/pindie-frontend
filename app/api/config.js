export const BASE_URL = 'http://localhost:3001/api'; //https://api-code-2.practicum-team.ru //http://localhost:3001/api //https://outcast.nomoredomainswork.ru/api

export const endpoints = {
  games: `${BASE_URL}/games`,
  auth: `${BASE_URL}/auth/login`,
  register: `${BASE_URL}/auth/local/register`,
  me: `${BASE_URL}/me`,
};
