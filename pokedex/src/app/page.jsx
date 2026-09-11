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
      <header>
        <nav>
            <li><h1 className="title">Pokédex</h1></li>
          <ul> {/* Ainda não foram feitas as páginas */}
            <li><Link href="/"><i className="fa-solid fa-house"></i> Home</Link></li>
            <li><Link href="/trade"><i className="fa-solid fa-exchange-alt"></i> Trade</Link></li>
            <li><Link href="/account"><i className="fa-solid fa-user"></i> Account</Link></li> {/* Ainda necessário criar um sistema de login */}
          </ul>
        </nav>
      </header>
      <section className="banner">
        <div className="banner-container">
          <div className="banner-text">
          <h1>Welcome to your Deck Creator and Pokedex!</h1>
          <h3>Discover and collect all your favorite Pokémon, and create the ultimate deck! Trade with other trainers and improve your strategy!</h3>
          </div>
          <Image src="/c/3.svg" height={500} width={500} alt="pikachu image"/>
        </div>
      </section> {/* Estrutura alterada apenas para customização, ainda deve ser responsivo */}
      <div className="search-filter">
        <h2>Search Here:</h2>
        <input className="search" type="text" onChange={(e)=>setSearch(e.target.value)} value={search} placeholder="Search"/>
      </div>
      
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
      
      <Lista lista={pokemon} search={search} tipo={tipo}/>
    </>
  );
}
