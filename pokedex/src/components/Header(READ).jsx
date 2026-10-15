'use client'

import Link from "next/link";
import { Bebas_Neue } from "next/font/google";
import { useState } from "react";

const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: ['400'], display: 'swap' });

export default function Header() {
  const [search, setSearch] = useState('');

    async function getPokedex() {
        const { data } = await api.get('/pokedex.json');
        setPokemon(data);
    }
    return (
        <header>
          <nav>
            <Link href="/"><h1 className={`header-title ${bebasNeue.className}`}>Bestdex</h1></Link>
            <ul>
              <li><Link href="/"><i className="fa-solid fa-house"></i> Home</Link></li>
              <li><Link href="/account"><i className="fa-solid fa-user"></i> Account</Link></li>
              <label htmlFor="search-input" className="search-input"><input id="search-input" className="nav-search search" type="text" onChange={(e)=>setSearch(e.target.value)} value={search} placeholder="Search..."/><i class="fa-solid fa-magnifying-glass"></i></label>
            </ul>            {/* Pensando em ter uma barra de pesquisa para os pokémons, aparecendo um dropdown com os resultados, assim quando clicar seria redirecionado para a página na pasta [id], seria mais rápido para adicionar os pokémons ao time */ }
          </nav>
        </header>
    )
}