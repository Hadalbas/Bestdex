'use client'

import Moves from "@/components/ListMoves";
import api from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, use } from "react"

export default function Pokemon({ params }) {

    const { id } = use(params);
    const name = id.toLowerCase().replace("-", "");
    const [pokemon, setPokemon] = useState({});
    const [learnset, setLearnset] = useState({});
    const [evolution, setEvolution] = useState([]);
    const [prevolution, setPrevolution] = useState({});
    const [number, setNumber] = useState(0)
    const [evoNumber, setEvoNumber] = useState([])
    const [prevoNumber, setPrevoNumber] = useState(0)
    const [isOpen, setIsOpen] = useState(false);

    const typesNumbers = { "Normal": 1, "Fighting": 2, "Flying": 3, "Poison": 4, "Ground": 5, "Rock": 6, "Bug": 7, "Ghost": 8, "Steel": 9, "Fire": 10, "Water": 11, "Grass": 12, "Electric": 13, "Psychic": 14, "Ice": 15, "Dragon": 16, "Dark": 17, "Fairy": 18, }

    async function getPokemon() {
        const { data } = await api.get('/pokedex.json');
        setPokemon(data[name]);
        setNumber(data[name].num.toString().padStart(3, "0"))

        if (data[name]?.evos != undefined) {
            data[name]?.evos.map((evo) => {
                setEvolution(evolution => [...evolution, data[evo.toLocaleLowerCase()]]);
                setEvoNumber(evoNumber => [...evoNumber, (data[evo.toLocaleLowerCase()].num).toString().padStart(3, "0")])
            })

        }
        if (data[name]?.prevo != undefined) {
            setPrevolution(data[data[name]?.prevo.toLowerCase()]);
            setPrevoNumber((data[data[name]?.prevo.toLowerCase()].num).toString().padStart(3, "0"))
        }
    }

    async function getLearnset() {
        const { data } = await api.get('/learnsets.json');
        setLearnset(data[name].learnset);
    }

    useEffect(() => {
        getPokemon()
        getLearnset()
    }, [])

    return (
        <>
            <header>
                <nav>
                    <li><h1 className="title">Bestdex</h1></li>
                <ul> {/* Ainda não foram feitas as páginas */}
                    <li><Link href="/"><i className="fa-solid fa-house"></i> Home</Link></li>
                    <li><Link href="/trade"><i className="fa-solid fa-exchange-alt"></i> Trade</Link></li>
                    <li><Link href="/account"><i className="fa-solid fa-user"></i> Account</Link></li> {/* Ainda necessário criar um sistema de login */}
                </ul>
                </nav>
            </header>
            <div className="pokemon-stats-page">
                <div className="pokemon-stats">
                    <div className="pokemon-exhibited">
                        <Image className="pokemon" src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${number}.png`} width={300} height={300} alt="XXX"></Image>
                        <div className="pokemon-stats-header">
                            <h2>#{pokemon?.num}</h2>
                            <hr />
                            <h1>{pokemon.name}</h1>
                        </div>

                    </div>
                    <div className="stats-abilities-container">
                        <div className="stats-container">
                            <h2>Base stats</h2>
                            <div className="stats">
                                <div className="stat-row">
                                    <label htmlFor="hp" className="stat-label">Health: {pokemon?.baseStats?.hp}</label>
                                    <meter id="hp" min={0} max={1} low={0.2} high={0.39} optimum={1} value={(pokemon?.baseStats?.hp / 255).toString()} className="stat-meter" />
                                </div>
                                <div className="stat-row">
                                    <label htmlFor="atk" className="stat-label">Attack: {pokemon?.baseStats?.atk}</label>
                                    <meter id="atk" min={0} max={1} low={0.2} high={0.39} optimum={1} value={(pokemon?.baseStats?.atk / 255).toString()} className="stat-meter" />
                                </div>
                                <div className="stat-row">
                                    <label htmlFor="def" className="stat-label">Defense: {pokemon?.baseStats?.def}</label>
                                    <meter id="def" min={0} max={1} low={0.2} high={0.39} optimum={1} value={(pokemon?.baseStats?.def / 255).toString()} className="stat-meter" />
                                </div>
                                <div className="stat-row">
                                    <label htmlFor="spa" className="stat-label">Special Attack: {pokemon?.baseStats?.spa}</label>
                                    <meter id="spa" min={0} max={1} low={0.2} high={0.39} optimum={1} value={(pokemon?.baseStats?.spa / 255).toString()} className="stat-meter" />
                                </div>
                                <div className="stat-row">
                                    <label htmlFor="spd" className="stat-label">Special Defense: {pokemon?.baseStats?.spd}</label>
                                    <meter id="spd" min={0} max={1} low={0.2} high={0.39} optimum={1} value={(pokemon?.baseStats?.spd / 255).toString()} className="stat-meter" />
                                </div>
                                <div className="stat-row">
                                    <label htmlFor="spe" className="stat-label">Speed: {pokemon?.baseStats?.spe}</label>
                                    <meter id="spe" min={0} max={1} low={0.2} high={0.39} optimum={1} value={(pokemon?.baseStats?.spe / 255).toString()} className="stat-meter" />
                                </div>
                            </div>
                        </div>

                        <br />

                        <div className="abilities">
                            <h2>Abilities</h2>
                            <h4>Normal: {pokemon?.abilities ? pokemon?.abilities["0"] : "carregando"}  {pokemon?.abilities && pokemon?.abilities["1"]}</h4>

                            {
                                pokemon?.abilities?.H && <h4>Hidden: {pokemon?.abilities?.H}</h4>
                            }
                        </div>
                    </div>
                </div>

                <br />

                <div className="evolution-line">
                    <h2>Evolution Line:</h2>

                    <div className="evolutions">
                        {
                            pokemon?.prevo
                                ? <div className={`detalhePokemon`}>
                                    <Link href={pokemon?.prevo}>
                                        <Image className="pokemon" src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${prevoNumber}.png`} width={150} height={150} alt="XXX"></Image>

                                        <div className="detalhePokemon-data">
                                            <h2>#{prevolution.num}</h2>
                                            <h2>{pokemon?.prevo}</h2>
                                        </div>
                                    </Link>
                                </div>

                                : <p>No prevolution</p>
                        }

                        {
                            pokemon?.evos
                                ? pokemon?.evos.map((evo, i) =>

                                    <div className={`detalhePokemon`} key={i}>
                                        <Link href={evo}>
                                            <Image className="pokemon" src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${evoNumber[i]}.png`} width={150} height={150} alt="XXX"></Image>

                                            <div className="detalhePokemon-data">
                                                <h2>#{evolution[i]?.num}</h2>
                                                <h2>{evo}</h2>
                                            </div>
                                        </Link>
                                    </div>
                                )

                                : <p>No evolution</p>
                        }
                    </div>
                </div>

                <div className="accordion-container">
                    <div className="accordion-container">
                    <button className={`accordion ${isOpen ? "active" : ""}`} onClick={() => setIsOpen(!isOpen)}>Learn set <i className="fa-solid fa-caret-down"></i> </button>
                    {isOpen && (
                        <div className="panel" style={{ display: "block" }}>
                            <p>Conteúdo que aparece e desaparece!</p>
                        </div>
                    )}
                </div>
                </div>

                <h2>Learnset:</h2>
                
                <Moves learnset={learnset} typesNumbers={typesNumbers} />

                <br />

                <Link href="/"><button className="exibir">Back</button></Link>
            </div>

        </>
    )
}