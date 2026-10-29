import { createTeam } from "./api";

const TEAM_KEY = 'bestdex_team';
export const MAX_TEAM_SIZE = 6;

export function getTeam() {
    if (typeof window === 'undefined') return [];

    try {
        const saved = localStorage.getItem(TEAM_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
}

export async function saveTeam(userName, teamName) {
    const team = getTeam()
    let pokemons = []

    for (let pokemon of team) {
        pokemons.push({
            species: pokemon.name,
            nickname: "",
            item: "None",
            ability: "Intimidate",
            gender: "f",
            shiny: false,
            stats: {
                hp: 0,
                at: 1,
                df: 2,
                sa: 3,
                sd: 4,
                sp: 5
            //     hp: pokemon.evs.hp,
            //     at: pokemon.evs.atk,
            //     df: pokemon.evs.def,
            //     sa: pokemon.evs.spa,
            //     sd: pokemon.evs.spd,
            //     sp: pokemon.evs.spe
            },
            moves: []
        })
    }

    return await createTeam(teamName, userName, "reg-m", pokemons)
}

export function updatePokemonFromTeam(pokemonName, hpEV, atkEV, defEV, spaEV, spdEV, speEV) {

    const team = getTeam();

    const pokemon = team.find(({ name }) => name === pokemonName)
    const position = team.indexOf(pokemon)

    pokemon.evs.hp = parseInt(hpEV) ?? 0
    pokemon.evs.atk = parseInt(atkEV) ?? 0
    pokemon.evs.def = parseInt(defEV) ?? 0
    pokemon.evs.spa = parseInt(spaEV) ?? 0
    pokemon.evs.spd = parseInt(spdEV) ?? 0
    pokemon.evs.spe = parseInt(speEV) ?? 0

    let updatedTeam = [...team]

    updatedTeam[position] = {
        id: pokemon.id ?? pokemon.num ?? pokemon.name,
        num: pokemon.num ?? pokemon.id ?? 0,
        ability: pokemon.ability,
        name: pokemon.name,
        image: pokemon.image ?? '',
        baseStats: {
            hp: pokemon.baseStats?.hp ?? 0,
            atk: pokemon.baseStats?.atk ?? 0,
            def: pokemon.baseStats?.def ?? 0,
            spa: pokemon.baseStats?.spa ?? 0,
            spd: pokemon.baseStats?.spd ?? 0,
            spe: pokemon.baseStats?.spe ?? 0,
        },
        evs: {
            hp: parseInt(hpEV) ?? 0,
            atk: parseInt(atkEV) ?? 0,
            def: parseInt(defEV) ?? 0,
            spa: parseInt(spaEV) ?? 0,
            spd: parseInt(spdEV) ?? 0,
            spe: parseInt(speEV) ?? 0
        }
    }

    localStorage.setItem(TEAM_KEY, JSON.stringify(updatedTeam));

    // console.log(pokemon)
    // console.log(getTeam())
}

export function addPokemonToTeam(pokemon) {
    if (typeof window === 'undefined') return false;

    const team = getTeam();

    if (team.length >= MAX_TEAM_SIZE) {
        return false;
    }

    const alreadyAdded = team.some((item) => item.name === pokemon.name || item.id === pokemon.id || item.num === pokemon.num);

    if (alreadyAdded) return false;

    const newTeam = [
        ...team,
        {
            id: pokemon.id ?? pokemon.num ?? pokemon.name,
            num: pokemon.num ?? pokemon.id ?? 0,
            ability: pokemon?.abilities[0],
            gender: 'f',
            name: pokemon.name,
            image: pokemon.image ?? '',
            baseStats: {
                hp: pokemon.baseStats?.hp ?? 0,
                atk: pokemon.baseStats?.atk ?? 0,
                def: pokemon.baseStats?.def ?? 0,
                spa: pokemon.baseStats?.spa ?? 0,
                spd: pokemon.baseStats?.spd ?? 0,
                spe: pokemon.baseStats?.spe ?? 0,
            },
            evs: {
                hp: 0,
                atk: 0,
                def: 0,
                spa: 0,
                spd: 0,
                spe: 0
            }
        }
    ];

    localStorage.setItem(TEAM_KEY, JSON.stringify(newTeam));
    window.dispatchEvent(new Event('bestdex-team-updated'));

    return true;
}

export function removePokemonFromTeam(pokemonName) {
    if (typeof window === 'undefined') return false;

    const team = getTeam();
    const filteredTeam = team.filter((pokemon) => pokemon.name !== pokemonName);

    if (filteredTeam.length === team.length) return false;

    localStorage.setItem(TEAM_KEY, JSON.stringify(filteredTeam));
    window.dispatchEvent(new Event('bestdex-team-updated'));

    return true;
}

export function isPokemonInTeam(name, num) {
    return getTeam().some((pokemon) => pokemon.name === name || pokemon.num === num);
}

export function clearTeam() {
    if (typeof window === 'undefined') return;

    localStorage.removeItem(TEAM_KEY);
    window.dispatchEvent(new Event('bestdex-team-updated'));
}
