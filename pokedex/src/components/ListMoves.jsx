'use client'

import api from "@/lib/api";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Moves({ learnset, typesNumbers }) {

    const [moves, setMoves] = useState({});

    async function getAllMoves() {
        const { data } = await api.get('/moves.json');
        setMoves(data);
    }

    useEffect(() => {
        getAllMoves()
    }, [])

    return (
        <>
            {
                Object.keys(learnset).map((move, i) => 
                <div key={i} className="move" title={moves[move].desc}>
                    <h4 key={i}>{moves[move]?.name}</h4>
                    {/* <Image src={`/pokemon-icons-main/icons/${moves[move].type.toLocaleLowerCase()}.svg`} width={20} height={20} alt={moves[move].type}></Image> */}
                    <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-ix/scarlet-violet/${typesNumbers[moves[move].type]}.png`} width={100} height={20} alt={moves[move].type}></Image>
                    <Image src={`/pokemon-icons-main/icons/${moves[move].category}IC_Masters.png`} width={39} height={20} alt={moves[move].type}></Image>
                    <h5 key={move}>Effect: {moves[move].shortDesc} <p></p> Power: {moves[move]?.basePower} Accuracy: {moves[move]?.accuracy === true ? "---" : moves[move]?.accuracy + '%'} PP: {moves[move]?.pp}</h5>
                </div>)
            }
        </>
    )
}