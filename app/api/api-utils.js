export const getData = async (url) => {
  try {
    const response = await fetch(url)
    if (response.status !== 200) {
      throw new Error('Ошибка получения данных')
    }
    const data = await response.json()
    return data
  } catch (error) {
    return error
  }
}

export const normalizeDataObject = (obj) => {
  let str = JSON.stringify(obj);

  str = str.replaceAll('_id', 'id');
  const newObj = JSON.parse(str);
  const result = { ...newObj, category: newObj.categories };
  return result;
}

export const normalizeData = (data) => {
  return data.map((item) => {
    return normalizeDataObject(item)
  })
};

export const getNormalizedGamesDataByCategory = async (url, category) => {
  const data = await getData(`${url}?categories.name=${category}`);
  return isResponseOk(data) ? normalizeData(data) : data;
};

export const getNormalizedGameDataById = async (url, id) => {
  const data = await getData(`${url}/${id}`);
  return isResponseOk(data) ? normalizeDataObject(data) : data;
};

export const isResponseOk = (response) => {
  return !(response instanceof Error);
};

export const authorize = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.status !== 200) {
      throw new Error("Ошибка авторизации");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

export const getMe = async (url, jwt) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { authorization: `Bearer ${jwt}` },
    });
    if (response.status !== 200) {
      throw new Error("Ошибка получения данных");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

export const setJWT = (jwt) => {
  localStorage.setItem("jwt", jwt);
};

export const getJWT = () => {
  return localStorage.getItem("jwt");
};

export const removeJWT = () => {
  localStorage.removeItem("jwt");
};

export const checkIfUserVoted = (game, userId) => {
  if (game.users.find((user) => user.id === userId)) {
    return true;
  }
  else return false
};

export const vote = async (url, jwt, usersArray) => {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ users: usersArray }),
    })
    if (response.status !== 200) {
      throw new Error('Ошибка голосования')
    }
    const result = response.json;
    return result;
  }
  catch (error) {
    return error;
  }
} 