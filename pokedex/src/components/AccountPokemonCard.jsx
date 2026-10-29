'use client'

import { updatePokemonFromTeam } from "@/lib/teamStorage";
import Image from "next/image";

export default function AccountPokemonCard({ name, image, stats = [], onRemove, changeEditingPokemon }) {

    const [hp, atk, def, spa, spd, spe] = stats;

    return (
        <div className="card-content-container">
            <div className="pokemon-card-header">
                <span className="pokemon-name">{name}</span>
            </div>

            <div className="pokemon-sprite">
                <Image src={image} width={70} height={70} alt={name + "_image"} />
            </div>

                <div className="pokemon-stats-list">
                        <span>HP:  <strong>{hp}</strong></span>
                        <span>ATK: <strong>{atk}</strong></span>
                        <span>DEF: <strong>{def}</strong></span>
                        <span>SPA: <strong>{spa}</strong></span>
                        <span>SPD: <strong>{spd}</strong></span>
                        <span>SPE: <strong>{spe}</strong></span>
                </div>
            
{/* updatePokemonFromTeam */}
            <button className="edit-team-button" onClick={changeEditingPokemon}>Edit</button>

            <button className="remove-team-button" onClick={onRemove}>Remove</button>
        </div>
    );
}
