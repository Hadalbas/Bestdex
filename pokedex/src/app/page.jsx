'use client'

import Lista from "@/components/Lista";
import api from "@/lib/api";
// import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [pokemon, setPokemon] = useState({});
  
  async function getPokedex() {
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

      <Lista lista={pokemon}/>
    </>
  );
}
