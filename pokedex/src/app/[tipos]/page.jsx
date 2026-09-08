'use client'

import Lista from "@/components/Lista";
import api from "@/lib/api";
import { useEffect, useState } from "react";

export default function Home({ params }) {
  const [pokemon, setPokemon] = useState({});
  var tipo;
  
  async function getPokedex() {
    tipo = await params;
    console.log(tipo)
    const { data } = await api.get('/pokedex.json');
    setPokemon(data);
  }

  useEffect(() => {
    getPokedex()
  }, [])

  return (
    <>
      <h1>Pokédex</h1>

      {/* <Image src="https://archives.bulbagarden.net/media/upload/thumb/f/fb/0001Bulbasaur.png/800px-0001Bulbasaur.png" width={100} height={100} alt="XXX"></Image> */}

      <Lista lista={pokemon} filtro={tipo}/>
    </>
  );
}
