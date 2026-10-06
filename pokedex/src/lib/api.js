const { default: axios } = require("axios");

const api = axios.create({
    //baseURL: 'https://play.pokemonshowdown.com/data',
    baseURL: 'http://localhost:3005',
    withCredentials: true //para enviar/receber cookies
})

export default api