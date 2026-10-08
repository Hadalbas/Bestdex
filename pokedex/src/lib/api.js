const { default: axios } = require("axios");

const urlAPI = 'http://localhost:3005'

const api = axios.create({
    baseURL: 'https://play.pokemonshowdown.com/data',
    withCredentials: false //para enviar/receber cookies
})

export async function createTreinador(treinador){
    return await axios.post(urlAPI+'/treinadores', treinador)
}
export async function accessTreinador(treinador){
    return await axios.post(urlAPI+'/login', treinador)
}
export async function logoutTreinador(){
    return await axios.post(urlAPI+'/logout')
}

export default api