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

export const deletePjByUser = async (params, token) => {

  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

  return await axios.delete(`${root}/characters/delete/${params}`, config);
}

export const deleteSavedGameByUser = async (params, token) => {

  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

  return await axios.delete(`${root}/games/delete/${params}`, config);
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

  return await axios.delete(`${root}/users/${params}`, config);
}

export const bringCharacterGames = async (params) => {

  return await axios.get(`${root}/games/byCharacter/${params}`);
}

export const deleteSavedGameByAdmin = async (params, token) => {

  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

  return await axios.delete(`${root}/games/delete/${params}`, config);
}

export const updateGuide = async (dataGuide, token) => {

  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

    return await axios.put(`${root}/games/updateGuide`, dataGuide, config);
}

export const addRoleByAdmin = async (body, params, token) => {

  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

  return await axios.put(`${root}/users/updateRole/${params}`, body, config);
}

export const getProfile = async (token) => {
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

  return await axios.get(`${root}/users/byIdwithCharacters`, config);
}

export const updateNameProfile = async (nameProfile, token) => {

  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

    return await axios.put(`${root}/users/profile/name`, nameProfile, config);
}

export const updateUserNameProfile = async (UserNameProfile, token) => {

  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

    return await axios.put(`${root}/users/profile/userName`, UserNameProfile, config);
}

export const updateSurnameProfile = async (surnameProfile, token) => {

  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

    return await axios.put(`${root}/users/profile/surname`, surnameProfile, config);
}

export const updateEmailProfile = async (emailProfile, token) => {

  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

    return await axios.put(`${root}/users/profile/email`, emailProfile, config);
}

export const updateBirthdateProfile = async (birthdateProfile, token) => {

  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

    return await axios.put(`${root}/users/profile/birthdate`, birthdateProfile, config);
}

export const bringAnswerById = async (params) => {

  return await axios.get(`${root}/answers/${params}`);
}

export const createBagdeGame = async (dataBadge) => {

    return await axios.post(`${root}/badges/add`, dataBadge);
}

export const getBadgesByGameId = async (params) => {

  return await axios.get(`${root}/badges/ByGameId/${params}`);
}

export const consumeBadgesByGameBadgeId = async (body) => {

  return await axios.put(`${root}/badges/consume/`, body);
}

export const updateMadness = async (body, token) => {

  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

  return await axios.put(`${root}/games/updateMadness`, body, config);
}

export const updateFinished = async (dataFinished, token) => {

  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

    return await axios.put(`${root}/games/updateFinished`, dataFinished, config);
}
