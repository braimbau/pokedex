import { Injectable } from '@nestjs/common';
import { query } from 'express';
import { Pokemon } from './pokemon.entity';
import fetch from 'cross-fetch';


@Injectable()
export class PokemonsService {

    pokemonsPerPage:number = 9;

    async findAll(): Promise<Pokemon[]> {
        const pokemon = new Pokemon();
        pokemon.id = 35;
        pokemon.name = 'pikachu';
        pokemon.image = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png';

        return [pokemon];
    }

    async findOneById(id: number): Promise<Pokemon> {
        const ret = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
            method: 'GET'
        }).then(response => {return response.json()})
        .catch(err => {return null});

        if (!ret)
            return null;

        let pokemon = new Pokemon();
        pokemon.id = ret.id;
        pokemon.name = ret.name;
        pokemon.image = ret.sprites.front_default;

        return pokemon;
    }

    async getOneByUrl(url: string): Promise<Pokemon> {
        const ret = await fetch(url, {
            method: 'GET'
        }).then(response => {return response.json()})
        .catch(err => {return null});

        if (!ret)
            return null;

        let pokemon = new Pokemon();
        pokemon.id = ret.id;
        pokemon.name = ret.name;
        pokemon.image = ret.sprites.front_default;
        return pokemon;
    }

    async getPage(page: number) {
        const ret = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${page * this.pokemonsPerPage}&limit=${this.pokemonsPerPage}`, {
            method: 'GET'
        }).then(response => {return response.json()})
        .catch(err => {return null});

        if (!ret)
            return null;

        const pokemons = ret.results.map(async (pokemon) => {
            return await this.getOneByUrl(pokemon.url);
        })
        return pokemons;
    }

    async maxPages() {

        const ret = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=${this.pokemonsPerPage}`, {
            method: 'GET'
        }).then(response => {return response.json()})
        .catch(err => {return null});
        if (!ret)
            return null;
        return Math.ceil(ret.count / 9)
    }}
