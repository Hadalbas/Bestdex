'use client'

import Link from "next/link";
import { Bebas_Neue } from "next/font/google";
import { useState } from "react";

const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: ['400'], display: 'swap' });

export default function Header() {
  const [search, setSearch] = useState('');


    return (
        <header>
          <nav>
            <Link href="/"><h1 className={`header-title ${bebasNeue.className}`}>Bestdex</h1></Link>
            <ul>
              <li><Link href="/"><i className="fa-solid fa-house"></i> Home</Link></li>
              <li><Link href="/account"><i className="fa-solid fa-user"></i> Account</Link></li>
              <li><Link href="/teams"><i className="fa fa-database"></i> Teams</Link></li>
            </ul>
          </nav>
        </header>
    )
}