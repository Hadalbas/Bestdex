'use client'

import Lista from "@/components/Lista";
import api from "@/lib/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [search, setSearch] = useState('');
  const [tipo, setTipo] = useState('');
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
      <h1 className="title">Pokédex</h1>

      <input className="search" type="text" onChange={(e) => setSearch(e.target.value)} value={search} placeholder="Search" />

      <br />
      <label htmlFor="tipos">Select types: </label>
      <select name="tipos" value={tipo} onChange={e => setTipo(e.target.value)}>
        <option value="">All</option>
        <option value="Fire">Fire</option>
        <option value="Grass">Grass</option>
        <option value="Water">Water</option>
        <option value="Electric">Electric</option>
        <option value="Normal">Normal</option>
        <option value="Fairy">Fairy</option>
        <option value="Bug">Bug</option>
        <option value="Rock">Rock</option>
        <option value="Ground">Ground</option>
        <option value="Ice">Ice</option>
        <option value="Dark">Dark</option>
        <option value="Psychic">Psychic</option>
        <option value="Steel">Steel</option>
        <option value="Fighting">Fighting</option>
        <option value="Flying">Flying</option>
        <option value="Dragon">Dragon</option>
        <option value="Poison">Poison</option>
        <option value="Ghost">Ghost</option>
      </select>
      <br />

      <Lista lista={pokemon} search={search} tipo={tipo} />
</>
  )
}