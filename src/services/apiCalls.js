import axios from 'axios';

const root = "http://localhost:8000/api"
// const root = "https://planetexpressdentalclinic.up.railway.app"

export const RegisterMe = async (body) => {

    return await axios.post(`${root}/register`, body);
}

export const logMe = async (body) => {

    return await axios.post(`${root}/login`, body);
} 