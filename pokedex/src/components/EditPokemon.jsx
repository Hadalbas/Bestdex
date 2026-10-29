'use client'

import Image from "next/image";
import { useState } from "react"

export default function Editor({ name, image, stats = [], changeEditingPokemon }) {

    const [hp, at, df, sa, sd, sp] = stats;

    const [hpEV, setHpEV] = useState(0)
    const [atEV, setAtEV] = useState(0)
    const [dfEV, setDfEV] = useState(0)
    const [saEV, setSaEV] = useState(0)
    const [sdEV, setSdEV] = useState(0)
    const [spEV, setSpEV] = useState(0)

    return (
        <div className="card-content-container">

            <button className="save-edit-team-button">Save</button>
            <button className="edit-team-button" onClick={changeEditingPokemon}>Cancel</button>
            <div className="pokemon-card-header">
                <span className="pokemon-name">{name}</span>
            </div>

            <div className="pokemon-sprite">
                <Image src={image} width={90} height={90} alt={name + "_image"} />
            </div>


            <div className="pokemon-stats-list">
                        <span>HP:  {parseInt(hp) + parseInt(hpEV)}</span>
                        <span>ATK: {parseInt(at) + parseInt(atEV)}</span>
                        <span>DEF: {parseInt(df) + parseInt(dfEV)}</span>
                        <span>SPA: {parseInt(sa) + parseInt(saEV)}</span>
                        <span>SPD: {parseInt(sd) + parseInt(sdEV)}</span>
                        <span>SPE: {parseInt(sp) + parseInt(spEV)}</span>
            </div>

            <div className="pokemon-stats-list">
                <div className="slidecontainer">
                    <span>HP:  {hpEV} <input type="range" name="hpEV" min="0" max="32" value={hpEV} onChange={(e) => { if (parseInt(e.target.value) + parseInt(atEV) + parseInt(dfEV) + parseInt(saEV) + parseInt(sdEV) + parseInt(spEV) <= 66 || e.target.value < hpEV) { setHpEV(e.target.value) } else { setHpEV(66 - (parseInt(atEV) + parseInt(dfEV) + parseInt(saEV) + parseInt(sdEV) + parseInt(spEV))) } }} className="ev-slider" /></span>
                    <span>ATK: {atEV} <input type="range" name="atEV" min="0" max="32" value={atEV} onChange={(e) => { if (parseInt(hpEV) + parseInt(e.target.value) + parseInt(dfEV) + parseInt(saEV) + parseInt(sdEV) + parseInt(spEV) <= 66 || e.target.value < atEV) { setAtEV(e.target.value) } else { setAtEV(66 - (parseInt(hpEV) + parseInt(dfEV) + parseInt(saEV) + parseInt(sdEV) + parseInt(spEV))) } }} className="ev-slider" /></span>
                    <span>DEF: {dfEV} <input type="range" name="dfEV" min="0" max="32" value={dfEV} onChange={(e) => { if (parseInt(hpEV) + parseInt(atEV) + parseInt(e.target.value) + parseInt(saEV) + parseInt(sdEV) + parseInt(spEV) <= 66 || e.target.value < dfEV) { setDfEV(e.target.value) } else { setDfEV(66 - (parseInt(hpEV) + parseInt(atEV) + parseInt(saEV) + parseInt(sdEV) + parseInt(spEV))) } }} className="ev-slider" /></span>
                    <span>SPA: {saEV} <input type="range" name="saEV" min="0" max="32" value={saEV} onChange={(e) => { if (parseInt(hpEV) + parseInt(atEV) + parseInt(dfEV) + parseInt(e.target.value) + parseInt(sdEV) + parseInt(spEV) <= 66 || e.target.value < saEV) { setSaEV(e.target.value) } else { setSaEV(66 - (parseInt(hpEV) + parseInt(atEV) + parseInt(dfEV) + parseInt(sdEV) + parseInt(spEV))) } }} className="ev-slider" /></span>
                    <span>SPD: {sdEV} <input type="range" name="sdEV" min="0" max="32" value={sdEV} onChange={(e) => { if (parseInt(hpEV) + parseInt(atEV) + parseInt(dfEV) + parseInt(saEV) + parseInt(e.target.value) + parseInt(spEV) <= 66 || e.target.value < sdEV) { setSdEV(e.target.value) } else { setSdEV(66 - (parseInt(hpEV) + parseInt(atEV) + parseInt(dfEV) + parseInt(saEV) + parseInt(spEV))) } }} className="ev-slider" /></span>
                    <span>SPE: {spEV} <input type="range" name="spEV" min="0" max="32" value={spEV} onChange={(e) => { if (parseInt(hpEV) + parseInt(atEV) + parseInt(dfEV) + parseInt(saEV) + parseInt(sdEV) + parseInt(e.target.value) <= 66 || e.target.value < spEV) { setSpEV(e.target.value) } else { setSpEV(66 - (parseInt(hpEV) + parseInt(atEV) + parseInt(dfEV) + parseInt(saEV) + parseInt(sdEV))) } }} className="ev-slider" /></span>
                </div>
            </div>

        </div>
    )
}