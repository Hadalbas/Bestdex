import { useState } from "react";
import Pokemon from "./Pokemon";

export default function Lista({ lista, search }) {

    var pokedex = [];
    
    const typesNumbers = {
        "Normal": 1,
        "Fighting": 2,
        "Flying": 3,
        "Poison": 4,
        "Ground": 5,
        "Rock": 6,
        "Bug": 7,
        "Ghost": 8,
        "Steel": 9,
        "Fire": 10,
        "Water": 11,
        "Grass": 12,
        "Electric": 13,
        "Psychic": 14,
        "Ice": 15,
        "Dragon": 16,
        "Dark": 17,
        "Fairy": 18,
    }


    if(lista) {
        pokedex = Object.values(lista).filter((pokemon) => pokemon.baseSpecies == undefined)
        if(search.trim()) {
          pokedex = pokedex.filter((pokemon)=>pokemon.name.toLowerCase().includes(search.toLowerCase()))  
        } 
    }

    return (
        <div className="flex-container">
                {
                    pokedex?.length > 0 
                        ? pokedex.map((pkm) => pkm.num > 0 && <Pokemon key={pkm.name} pokemon={pkm} typesNumbers={typesNumbers}/>)
                        : <p>Carregando...</p>
                }
        </div>
    )
}