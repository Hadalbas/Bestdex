export default function AccountPokemonCard({ name, stats = [], onRemove }) {
    const [hp, atk, def, spa, spd, spe] = stats;

    return (
        <div className="card-content-container">
            <div className="pokemon-card-header">
                <span className="pokemon-name">{name}</span>
                <span className="pokemon-badge">Lv. 25</span>
            </div>

            <div className="pokemon-sprite">⚡</div>

            <div className="pokemon-stats-list">
                <span>HP: {hp}</span>
                <span>ATK: {atk}</span>
                <span>DEF: {def}</span>
                <span>SPA: {spa}</span>
                <span>SPD: {spd}</span>
                <span>SPE: {spe}</span>
            </div>

            <button className="remove-team-button" onClick={onRemove}>Remove</button>
        </div>
    );
}
