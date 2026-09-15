import Image from "next/image";
import Link from "next/link";

export default function Pokemon({ pokemon, typesNumbers }) {

    var numero = pokemon.num.toString().padStart(3, "0");

    return (
        <>
                <div className={`detalhePokemon`}>
                    <Link href={pokemon.name}>
                    <Image className="pokemon" src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${numero}.png`} width={150} height={150} alt="XXX"></Image>

                    <div className="detalhePokemon-data">
                        <h2>#{pokemon.num}</h2>
                        <h2>{pokemon.name}</h2>

                        <p><span><Image className={"tipos " + pokemon.types[0]} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-ix/scarlet-violet/${typesNumbers[pokemon.types[0]]}.png`} width={150} height={30} alt="XXX"></Image><br /></span> {pokemon.types[1] && <span><Image className={"tipos " + pokemon.types[0]} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-ix/scarlet-violet/${typesNumbers[pokemon.types[1]]}.png`} width={150} height={30} alt="XXX"></Image></span>} </p>
                    </div>
                    </Link>

                </div>

        </>
    )
}