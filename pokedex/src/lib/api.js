const { default: axios } = require("axios");

// const urlAPI = 'http://localhost:3005/treinadores'

const api = axios.create({
    baseURLe: 'https://play.pokemonshowdown.com/data',
    withCredentials: false //para enviar/receber cookies
})

// export async function createTreinador(treinador){
//     await axios.post(urlAPI, treinador)
// }

export default api