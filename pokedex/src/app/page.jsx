'use client'

import Lista from "@/components/Lista";
import api from "@/lib/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [search, setSearch] = useState('');
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

      <input className="search" type="text" onChange={(e)=>setSearch(e.target.value)} value={search} placeholder="Pesquisar"/>
      <br />
      <Lista lista={pokemon} search={search}/>
    </>
  );
}
