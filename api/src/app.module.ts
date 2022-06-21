import { Module } from '@nestjs/common';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PokemonsModule } from './pokemons/pokemons.module';
import { PokemonsResolver } from './pokemons/pokemons.resolver';
import { PokemonsService } from './pokemons/pokemons.service';

@Module({
  imports: [ PokemonsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
