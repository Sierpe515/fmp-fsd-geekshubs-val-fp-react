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