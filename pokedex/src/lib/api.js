const { default: axios } = require("axios");

const api = axios.create({
    baseURL: 'https://play.pokemonshowdown.com/data'
})

export default api