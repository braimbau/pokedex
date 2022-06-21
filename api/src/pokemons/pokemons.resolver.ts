import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { Pokemon } from './pokemon.entity';
import { PokemonsService } from './pokemons.service';

@Resolver(of => Pokemon)
export class PokemonsResolver {
    constructor(private pokemonService: PokemonsService) {}

    @Query(returns => Int)
    async maxPages() {
      return this.pokemonService.maxPages();
    }

    @Query(returns => Pokemon)
    async pokemonId(@Args('id', { type: () => Int }) id: number) {
      return this.pokemonService.findOneById(id);
    }

    @Query(returns => [Pokemon])
    async pokemonsPage(@Args('page', { type: () => Int }) page: number) {
        return this.pokemonService.getPage(page);
    }
}
