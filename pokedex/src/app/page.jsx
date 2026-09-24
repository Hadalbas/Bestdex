'use client'

import Lista from "@/components/Lista";
import api from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
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
      <div className="main-page">
        

        <section className="banner">
          <div className="banner-container">
            <div className="banner-text">
              <h1>Welcome to your Deck Creator and Pokedex!</h1>
              <hr />
              <h3>Discover and collect all your favorite Pokémon <br /> and create the ultimate deck! <br /> Trade with other trainers and improve your strategy!</h3>
            </div>
            <Image src="/c/3.svg" height={500} width={500} alt="pikachu image"/>
          </div>
        </section>

        <section className="search-section">
          <div className="search-container">
            <div className="search-filter">
              <h2>Search Here:</h2>
              <input className="search" type="text" onChange={(e)=>setSearch(e.target.value)} value={search} placeholder="Search..."/>
            </div>
            
            <div className="select-container">
              <label htmlFor="tipos" className="types-text">Select types: </label>
              <select name="tipos" className="dropdown" style={{width: tipo ? tipo.length * 0.85 + 2.5 + 'em' : '5em'}} value={tipo} onChange={e => setTipo(e.target.value)}>
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
            </div>
          </div>
        </section>
        
        <Lista lista={pokemon} search={search} tipo={tipo}/>
      </div>
    </>
  );
}
