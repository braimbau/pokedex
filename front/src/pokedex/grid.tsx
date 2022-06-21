import { gql, useQuery } from "@apollo/client";
import { PokemonDTO } from "../dto/pokemon.dto";
import '../styles/pokedex.css'

interface GridProps {
    page: number
}

function Grid(props: GridProps) {

    const { loading, error, data } = useQuery(gql`query getPokemonsPage {
        pokemonsPage(page: ${props.page}) {
            name,
            id,
            image
          }
    }`);

    const renderPokemons = () => {
        if (loading) return <div className='Info'>Loading...</div>;
        if (error) return <div className='Info'>Error</div>;
    
        return data.pokemonsPage.map((pokemon: PokemonDTO) => {
            return (
                <div className='Pokemon'>
                    <div className='PokemonIdentity'>
                        <div className="pokemonId">{`#${pokemon.id}`}</div>
                        <div className="PokemonName">{pokemon.name}</div>
                    </div>
                    {pokemon.image && <img className='PokemonImage' src={pokemon.image} alt={pokemon.name}></img>}
                </div>
            )
        })
    }

    return (
    <div className="Grid">
        {renderPokemons()}
    </div>
)
}

export default Grid