'use client'

import api from "@/lib/api";
import { updatePokemonFromTeam } from "@/lib/teamStorage";
import Image from "next/image";
import { useEffect, useState } from "react"

export default function Editor({ name, image, ability, stats = [], nat, evs = [], moves = [], changeEditingPokemon }) {

    const funName = name.toLowerCase().replace(/-|[.]| /g, "");
    const [learnset, setLearnset] = useState({})


    const [hp, at, df, sa, sd, sp] = stats;
    const [hepEV, atkEV, defEV, spaEV, spdEv, speEV] = evs;

    const [mv1, mv2, mv3, mv4] = moves;

    const [newAbility, setNewAbility] = useState(ability)

    const [nature, setNature] = useState(nat);

    const [hpEV, setHpEV] = useState(hepEV)
    const [atEV, setAtEV] = useState(atkEV)
    const [dfEV, setDfEV] = useState(defEV)
    const [saEV, setSaEV] = useState(spaEV)
    const [sdEV, setSdEV] = useState(spdEv)
    const [spEV, setSpEV] = useState(speEV)
    
    const [incAT, setIncAT] = useState(1)
    const [incDF, setIncDF] = useState(1)
    const [incSA, setIncSA] = useState(1)
    const [incSD, setIncSD] = useState(1)
    const [incSP, setIncSP] = useState(1)

    const [move1, setMove1] = useState(mv1)
    const [move2, setMove2] = useState(mv2)
    const [move3, setMove3] = useState(mv3)
    const [move4, setMove4] = useState(mv4)

    async function getLearnset() {
        const { data } = await api.get('/learnsets.json');
        setLearnset(data[funName].learnset)

        // console.log(data[funName].learnset)
        // console.log(learnset)
        // console.log(funName)
    }

    useEffect(() => {
        getLearnset()
    }, [])

    function defineNature(e) {

        let nature = e.target.value

        setIncAT(1); setIncDF(1); setIncSA(1); setIncSD(1); setIncSP(1);

        switch(nature){
            
            case "Lonely": case "Adamant": case "Naughty": case "Brave": setIncAT(1.1) 
            break;
            case "Bold": case "Impish": case "Lax": case "Relaxed":      setIncDF(1.1) 
            break;
            case "Modest": case "Mild": case "Rash": case "Quiet":       setIncSA(1.1) 
            break;
            case "Calm": case "Gentle": case "Careful": case "Sassy":    setIncSD(1.1) 
            break;
            case "Timid": case "Hasty": case "Jolly": case "Naive":      setIncSP(1.1) 
            break;
            
        }

        switch(nature){
            
            case "Bold": case "Modest": case "Calm": case "Timid":       setIncAT(0.9) 
            break;
            case "Lonely": case "Mild": case "Gentle": case "Hasty":     setIncDF(0.9) 
            break;
            case "Adamant": case "Impish": case "Careful": case "Jolly": setIncSA(0.9) 
            break;
            case "Naughty": case "Lax": case "Rash": case "Naive":       setIncSD(0.9) 
            break;
            case "Brave": case "Relaxed": case "Quiet": case "Sassy":    setIncSP(0.9) 
            break;

        }

        setNature(nature);
    }

    return (
        <div className="pokemon-edit-section">
            <div className="edit-button-container">
                <button className="save-edit-team-button" onClick={() => {updatePokemonFromTeam(name, newAbility, nature, parseInt(hpEV), parseInt(atEV), parseInt(dfEV), parseInt(saEV), parseInt(sdEV), parseInt(spEV), move1, move2, move3, move4); changeEditingPokemon()}}>Save</button>
                <button className="edit-team-button" onClick={changeEditingPokemon}>Cancel</button>
            </div>
            <div className="pokemon-edit-container">
                <div className="edit-card-content-container">
                
                    <div className="pokemon-card-header">
                        <span className="pokemon-name">{name}</span>
                    </div>
                
                    <div className="pokemon-sprite">
                        <Image src={image} width={90} height={90} alt={name + "_image"} />
                    </div>
                
                    <div className="pokemon-edit-ability">
                        <h1>Abilities: <div className="ability">{ability}</div></h1>
                    </div>
                
                    <div className="pokemon-stats-list">
                                <span className="pokemon-stats-list-span">HP:  {parseInt(hp) + parseInt(hpEV)}</span>
                                <span className="pokemon-stats-list-span">ATK: {parseInt((parseInt(at) + parseInt(atEV)) * incAT)}</span>
                                <span className="pokemon-stats-list-span">DEF: {parseInt((parseInt(df) + parseInt(dfEV)) * incDF)}</span>
                                <span className="pokemon-stats-list-span">SPA: {parseInt((parseInt(sa) + parseInt(saEV)) * incSA)}</span>
                                <span className="pokemon-stats-list-span">SPD: {parseInt((parseInt(sd) + parseInt(sdEV)) * incSD)}</span>
                                <span className="pokemon-stats-list-span">SPE: {parseInt((parseInt(sp) + parseInt(spEV)) * incSP)}</span>
                    </div>
                
                
                </div>


            
                <div className="pokemon-slide-stats-list">
                    <div className="select-container-profile">
                    <label htmlFor="natures" className="types-text">Select nature: </label>
                    <select name="natures" className="dropdown" style={{width: nature ? nature.length * 0.85 + 7 + 'em' : '7em'}} value={nature} onChange={defineNature}>
                        <option value="">Serious</option>

                        <option value="Lonely">Lonely | +Atk -Def</option>
                        <option value="Adamant">Adamant | +Atk -SpA</option>
                        <option value="Naughty">Naughty | +Atk -SpD</option>
                        <option value="Brave">Brave | +Atk -Spe</option>

                        <option value="Bold">Bold | +Def -Atk</option>
                        <option value="Impish">Impish | +Def -SpA</option>
                        <option value="Lax">Lax | +Def -SpD</option>
                        <option value="Relaxed">Relaxed | +Def -Spe</option>
                        
                        <option value="Modest">Modest | +SpA -Atk</option>
                        <option value="Mild">Mild | +SpA -Def</option>
                        <option value="Rash">Rash | +SpA -SpD</option>
                        <option value="Quiet">Quiet | +SpA -Spe</option>
                        
                        <option value="Calm">Calm | +SpD -Atk</option>
                        <option value="Gentle">Gentle | +SpD -Def</option>
                        <option value="Careful">Careful | +SpD -SpA</option>
                        <option value="Sassy">Sassy | +SpD -Spe</option>
                        
                        <option value="Timid">Timid | +Spe -Atk</option>
                        <option value="Hasty">Hasty | +Spe -Def</option>
                        <option value="Jolly">Jolly | +Spe -SpA</option>
                        <option value="Naive">Naive | +Spe -SpD</option>

                    </select>
                    </div>
                    <div className="slide-container">
                        <label className="stats-slide-label">
                            <span className="stats-slide"><div className="stats-slide-span">HP:  {hpEV}</div> <input type="range" name="hpEV" min="0" max="32" value={hpEV} onChange={(e) => { if (parseInt(e.target.value) + parseInt(atEV) + parseInt(dfEV) + parseInt(saEV) + parseInt(sdEV) + parseInt(spEV) <= 66 || e.target.value < hpEV) { setHpEV(e.target.value) } else { setHpEV(66 - (parseInt(atEV) + parseInt(dfEV) + parseInt(saEV) + parseInt(sdEV) + parseInt(spEV))) } }} className="ev-slider" /></span>
                        </label>
                        <label className="stats-slide-label">
                            <span className="stats-slide"><div className="stats-slide-span">ATK: {atEV}</div> <input type="range" name="atEV" min="0" max="32" value={atEV} onChange={(e) => { if (parseInt(hpEV) + parseInt(e.target.value) + parseInt(dfEV) + parseInt(saEV) + parseInt(sdEV) + parseInt(spEV) <= 66 || e.target.value < atEV) { setAtEV(e.target.value) } else { setAtEV(66 - (parseInt(hpEV) + parseInt(dfEV) + parseInt(saEV) + parseInt(sdEV) + parseInt(spEV))) } }} className="ev-slider" /></span>
                        </label>
                        <label className="stats-slide-label">
                            <span className="stats-slide"><div className="stats-slide-span">DEF: {dfEV}</div> <input type="range" name="dfEV" min="0" max="32" value={dfEV} onChange={(e) => { if (parseInt(hpEV) + parseInt(atEV) + parseInt(e.target.value) + parseInt(saEV) + parseInt(sdEV) + parseInt(spEV) <= 66 || e.target.value < dfEV) { setDfEV(e.target.value) } else { setDfEV(66 - (parseInt(hpEV) + parseInt(atEV) + parseInt(saEV) + parseInt(sdEV) + parseInt(spEV))) } }} className="ev-slider" /></span>
                        </label>
                        <label className="stats-slide-label">
                            <span className="stats-slide"><div className="stats-slide-span">SPA: {saEV}</div> <input type="range" name="saEV" min="0" max="32" value={saEV} onChange={(e) => { if (parseInt(hpEV) + parseInt(atEV) + parseInt(dfEV) + parseInt(e.target.value) + parseInt(sdEV) + parseInt(spEV) <= 66 || e.target.value < saEV) { setSaEV(e.target.value) } else { setSaEV(66 - (parseInt(hpEV) + parseInt(atEV) + parseInt(dfEV) + parseInt(sdEV) + parseInt(spEV))) } }} className="ev-slider" /></span>
                        </label>
                        <label className="stats-slide-label">
                            <span className="stats-slide"><div className="stats-slide-span">SPD: {sdEV}</div> <input type="range" name="sdEV" min="0" max="32" value={sdEV} onChange={(e) => { if (parseInt(hpEV) + parseInt(atEV) + parseInt(dfEV) + parseInt(saEV) + parseInt(e.target.value) + parseInt(spEV) <= 66 || e.target.value < sdEV) { setSdEV(e.target.value) } else { setSdEV(66 - (parseInt(hpEV) + parseInt(atEV) + parseInt(dfEV) + parseInt(saEV) + parseInt(spEV))) } }} className="ev-slider" /></span>
                        </label>
                        <label className="stats-slide-label">
                            <span className="stats-slide"><div className="stats-slide-span">SPE: {spEV}</div> <input type="range" name="spEV" min="0" max="32" value={spEV} onChange={(e) => { if (parseInt(hpEV) + parseInt(atEV) + parseInt(dfEV) + parseInt(saEV) + parseInt(sdEV) + parseInt(e.target.value) <= 66 || e.target.value < spEV) { setSpEV(e.target.value) } else { setSpEV(66 - (parseInt(hpEV) + parseInt(atEV) + parseInt(dfEV) + parseInt(saEV) + parseInt(sdEV))) } }} className="ev-slider" /></span>
                        </label>
                    </div>
                </div>

                <div className="edit-pokemon-moves">
                    <select name="moves" onChange={e => setMove1(e.target.value)} className="dropdown" style={{width: '10em'}}>
                                {Object.keys(learnset).length > 0
                                    ? Object.keys(learnset).map((move, i) => <option key={i} value={move}>{move}</option>)
                                    : <option key={'0'} value={'0'}>awaiting</option>
                                }
                    </select>
                    
                    <select name="moves" onChange={e => setMove2(e.target.value)} className="dropdown" style={{width: '10em'}}>
                                {Object.keys(learnset).length > 0
                                    ? Object.keys(learnset).map((move, i) => <option key={i} value={move}>{move}</option>)
                                    : <option key={'0'} value={'0'}>awaiting</option>
                                }
                    </select>
                    
                    <select name="moves" onChange={e => setMove3(e.target.value)} className="dropdown" style={{width: '10em'}}>
                                {Object.keys(learnset).length > 0
                                    ? Object.keys(learnset).map((move, i) => <option key={i} value={move}>{move}</option>)
                                    : <option key={'0'} value={'0'}>awaiting</option>
                                }
                    </select>
                    
                    <select name="moves" onChange={e => setMove4(e.target.value)} className="dropdown" style={{width: '10em'}}>
                                {Object.keys(learnset).length > 0
                                    ? Object.keys(learnset).map((move, i) => <option key={i} value={move}>{move}</option>)
                                    : <option key={'0'} value={'0'}>awaiting</option>
                                }
                    </select>
                </div>

            </div>
        </div>
    )
}