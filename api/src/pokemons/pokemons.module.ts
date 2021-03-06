import { Module } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { PokemonsResolver } from './pokemons.resolver';

@Module({
  providers: [PokemonsService, PokemonsResolver]
})
export class PokemonsModule {}
