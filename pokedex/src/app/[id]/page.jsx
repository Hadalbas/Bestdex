'use client'

import Moves from "@/components/ListMoves";
import api from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, use } from "react"

export default function Pokemon({ params }) {

    const { id } = use(params);
    const name = id.toLowerCase().replace(/-|[.]| /g, "");
    const [pokemon, setPokemon] = useState({});
    const [learnset, setLearnset] = useState({});
    const [baseForme, setBaseForme] = useState({});
    const [evolution, setEvolution] = useState([]);
    const [prevolution, setPrevolution] = useState({});
    const [number, setNumber] = useState(0)
    const [evoNumber, setEvoNumber] = useState([])
    const [prevoNumber, setPrevoNumber] = useState(0)


    const typesNumbers = { "Normal": 1, "Fighting": 2, "Flying": 3, "Poison": 4, "Ground": 5, "Rock": 6, "Bug": 7, "Ghost": 8, "Steel": 9, "Fire": 10, "Water": 11, "Grass": 12, "Electric": 13, "Psychic": 14, "Ice": 15, "Dragon": 16, "Dark": 17, "Fairy": 18, }

    async function getPokemon() {
        const { data } = await api.get('/pokedex.json');
        setPokemon(data[name]);
        setNumber(data[name].num.toString().padStart(3, "0"))

        if (data[name]?.baseSpecies != undefined) {
            setBaseForme(data[data[name]?.baseSpecies.toLowerCase().replace(/-|[.]| /g, "")]);
        }
        if (data[name]?.evos != undefined) {
            data[name]?.evos.map((evo) => {
                setEvolution(evolution => [...evolution, data[evo.toLocaleLowerCase().replace(/-|[.]| /g, "")]]);
                setEvoNumber(evoNumber => [...evoNumber, (data[evo.toLocaleLowerCase().replace(/-|[.]| /g, "")].num).toString().padStart(3, "0")])
            })

        }
        if (data[name]?.prevo != undefined) {
            setPrevolution(data[data[name]?.prevo.toLowerCase().replace(/-|[.]| /g, "")]);
            setPrevoNumber((data[data[name]?.prevo.toLowerCase().replace(/-|[.]| /g, "")].num).toString().padStart(3, "0"))
        }
    }

    async function getLearnset() {
        const { data } = await api.get('/learnsets.json');
        data[name]?.learnset && setLearnset(data[name].learnset)
    }

    useEffect(() => {
        getPokemon()
        getLearnset()
    }, [])

    const router = useRouter();

    function handleFormeChange(e) {
        router.push(`/${e.target.value.replace(/ /, "")}`)
    }

    return (
        <>
            <div className="pokemon-stats-page">


                {pokemon?.formeOrder || pokemon?.baseSpecies
                    ?
                    <div className="select-container">
                        <label htmlFor="Formes" className="types-text">Select forme: </label>

                        <select name="Formes" defaultValue={pokemon.name} onChange={handleFormeChange}>
                            {pokemon?.formeOrder 
                            ? pokemon.formeOrder.map((forme) => <option key={forme} value={forme}>{forme}</option>)
                            : baseForme.formeOrder.map((forme) => <option key={forme} value={forme}>{forme}</option>)
                            }
                        </select>
                    </div>
                    : <></>
                }

                <div className="pokemon-stats">
                    <div className="pokemon-exhibited">
                        <Image className="pokemon" src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${number}${pokemon?.baseSpecies ? `_f${baseForme.formeOrder.indexOf(pokemon.name)+1}` : ""}.png`} width={300} height={300} alt="XXX"></Image>
                        <div className="pokemon-stats-header">
                            <h2>#{pokemon?.num}</h2>
                            <hr />
                            <h1>{pokemon.name}</h1>
                        </div>
                    </div>
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

                        <div className="abilities">
                            <h2>Abilities</h2>
                            <h4>Normal: {pokemon?.abilities ? pokemon?.abilities["0"] : "carregando"} {(pokemon?.abilities && pokemon?.abilities["1"]) != undefined && <>{"and " + pokemon?.abilities["1"]}</>}</h4>

                            {
                                pokemon?.abilities?.H && <h4>Hidden: {pokemon?.abilities?.H}</h4>
                            }
                        </div>
                </div>

                <br />

                <div className="evolution-line">
                    <h2>Evolution Line:</h2>

                    <div className="evolutions">
                        {
                            pokemon?.prevo
                                ? <div className={`detalhePokemon`}>
                                    <Link href={pokemon?.prevo.replace(/ /, "")}>
                                        <Image className="pokemon" src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${prevoNumber}${prevolution?.baseSpecies ? "_f2" : ""}.png`} width={150} height={150} alt="XXX"></Image>

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
                                        <Link href={evo.replace(/ /, "")}>
                                            <Image className="pokemon" src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${evoNumber[i]}${evolution[i]?.baseSpecies ? "_f2" : ""}.png`} width={150} height={150} alt="XXX"></Image>

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

                
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Learn Sets
                        </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <Moves learnset={learnset} typesNumbers={typesNumbers} />
                        </div>
                        </div>
                    </div>
                    
                </div>

                <Link href="/"><button className="exibir">Back</button></Link>

            </div>

        </>
    )
}