'use client'

import { updatePokemonFromTeam } from "@/lib/teamStorage";
import Image from "next/image";
import { useState } from "react";

export default function AccountPokemonCard({ name, image, stats = [], onRemove }) {
    const [edit, setEdit] = useState(false)

    const [hpEV, setHpEV] = useState(0)
    const [atEV, setAtEV] = useState(0)
    const [dfEV, setDfEV] = useState(0)
    const [saEV, setSaEV] = useState(0)
    const [sdEV, setSdEV] = useState(0)
    const [spEV, setSpEV] = useState(0)
    const [hp, atk, def, spa, spd, spe] = stats;

    return (
        <div className="card-content-container">
            <div className="pokemon-card-header">
                <span className="pokemon-name">{name}</span>
            </div>

            <div className="pokemon-sprite">
                <Image src={image} width={70} height={70} alt={name + "_image"} />
            </div>

            {
                edit ? <div className="pokemon-stats-list">
                    <div className="slidecontainer">
                        <span>HP:  {hpEV} <input type="range" name="hpEV" min="0" max="32" value={hpEV} onChange={(e) => {if(parseInt(e.target.value) + parseInt(atEV) + parseInt(dfEV) + parseInt(saEV) + parseInt(sdEV) + parseInt(spEV) <= 66 || e.target.value < hpEV) {setHpEV(e.target.value)} else{setHpEV(66 - (parseInt(atEV) + parseInt(dfEV) + parseInt(saEV) + parseInt(sdEV) + parseInt(spEV)))}}} className="ev-slider" /></span>
                        <span>ATK: {atEV} <input type="range" name="atEV" min="0" max="32" value={atEV} onChange={(e) => {if(parseInt(hpEV) + parseInt(e.target.value) + parseInt(dfEV) + parseInt(saEV) + parseInt(sdEV) + parseInt(spEV) <= 66 || e.target.value < atEV) {setAtEV(e.target.value)} else{setAtEV(66 - (parseInt(hpEV) + parseInt(dfEV) + parseInt(saEV) + parseInt(sdEV) + parseInt(spEV)))}}} className="ev-slider" /></span>
                        <span>DEF: {dfEV} <input type="range" name="dfEV" min="0" max="32" value={dfEV} onChange={(e) => {if(parseInt(hpEV) + parseInt(atEV) + parseInt(e.target.value) + parseInt(saEV) + parseInt(sdEV) + parseInt(spEV) <= 66 || e.target.value < dfEV) {setDfEV(e.target.value)} else{setDfEV(66 - (parseInt(hpEV) + parseInt(atEV) + parseInt(saEV) + parseInt(sdEV) + parseInt(spEV)))}}} className="ev-slider" /></span>
                        <span>SPA: {saEV} <input type="range" name="saEV" min="0" max="32" value={saEV} onChange={(e) => {if(parseInt(hpEV) + parseInt(atEV) + parseInt(dfEV) + parseInt(e.target.value) + parseInt(sdEV) + parseInt(spEV) <= 66 || e.target.value < saEV) {setSaEV(e.target.value)} else{setSaEV(66 - (parseInt(hpEV) + parseInt(atEV) + parseInt(dfEV) + parseInt(sdEV) + parseInt(spEV)))}}} className="ev-slider" /></span>
                        <span>SPD: {sdEV} <input type="range" name="sdEV" min="0" max="32" value={sdEV} onChange={(e) => {if(parseInt(hpEV) + parseInt(atEV) + parseInt(dfEV) + parseInt(saEV) + parseInt(e.target.value) + parseInt(spEV) <= 66 || e.target.value < sdEV) {setSdEV(e.target.value)} else{setSdEV(66 - (parseInt(hpEV) + parseInt(atEV) + parseInt(dfEV) + parseInt(saEV) + parseInt(spEV)))}}} className="ev-slider" /></span>
                        <span>SPE: {spEV} <input type="range" name="spEV" min="0" max="32" value={spEV} onChange={(e) => {if(parseInt(hpEV) + parseInt(atEV) + parseInt(dfEV) + parseInt(saEV) + parseInt(sdEV) + parseInt(e.target.value) <= 66 || e.target.value < spEV) {setSpEV(e.target.value)} else{setSpEV(66 - (parseInt(hpEV) + parseInt(atEV) + parseInt(dfEV) + parseInt(saEV) + parseInt(sdEV)))}}} className="ev-slider" /></span>
                    </div>
                </div>

                    : <div className="pokemon-stats-list">
                        <span>HP:  {hp}</span>
                        <span>ATK: {atk}</span>
                        <span>DEF: {def}</span>
                        <span>SPA: {spa}</span>
                        <span>SPD: {spd}</span>
                        <span>SPE: {spe}</span>
                    </div>
            }


            {
            edit 
            ? <>
                <button className="save-edit-team-button" onClick={updatePokemonFromTeam}>Save</button> 
                <button className="edit-team-button" onClick={() => setEdit(false)}>Cancel</button>
            </>
            : <button className="edit-team-button" onClick={() => setEdit(true)}>Edit</button>
            }

            <button className="remove-team-button" onClick={onRemove}>Remove</button>
        </div>
    );
}
