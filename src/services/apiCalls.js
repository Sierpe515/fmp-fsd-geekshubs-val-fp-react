import axios from 'axios';

const root = "http://localhost:8000/api"
// const root = "https://planetexpressdentalclinic.up.railway.app"

export const RegisterMe = async (body) => {

    return await axios.post(`${root}/register`, body);
}

export const logMe = async (body) => {

    return await axios.post(`${root}/login`, body);
}

export const bringUserCharacters = async (token) => {
    let config = {
      headers: { 
        'Authorization': 'Bearer '+ token,  
      }
    };
  
    return await axios.get(`${root}/characters`, config);
}

export const bringLoadGames = async (params, token) => {

    let config = {
      headers: { 
        'Authorization': 'Bearer '+ token,  
      }
    };
  
    return await axios.get(`${root}/games/byCharacter/${params}`, config);
}

export const bringLoadGamesById = async (params, token) => {

  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

  return await axios.get(`${root}/games/byId/${params}`, config);
}

export const bringSelectableGames = async () => {

  return await axios.get(`${root}/selectGames`);
}

export const createNewGame = async (dataGame, token) => {

  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

    return await axios.post(`${root}/games`, dataGame, config);
}

export const createCharacter = async (dataCharacter, token) => {

  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

    return await axios.post(`${root}/characters/newCharacter`, dataCharacter, config);
}

export const createSavedGame = async (dataSavedGame, token) => {

  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

    return await axios.post(`${root}/games/save`, dataSavedGame, config);
}

export const updateGameStage = async (dataAnswer, token) => {

  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

    return await axios.put(`${root}/games/update`, dataAnswer, config);
}

export const bringCharactersImages = async () => {

  return await axios.get(`${root}/characters/images`);
}

export const updateCharacterImage = async (dataImage, token) => {

  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

    return await axios.put(`${root}/characters/newCharacter`, dataImage, config);
}

export const bringUsersByAdmin = async () => {

  return await axios.get(`${root}/users/withCharacters`);
}

export const deleteUserByAdmin = async (params, token) => {

  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

  return await axios.delete(`${root}/deleteUser/${params}`, config);
}