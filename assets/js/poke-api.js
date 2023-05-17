const urlSearchParams = new URLSearchParams(window.location.search);
const pokemonId = urlSearchParams.get('id')

const pokeApi = {}

async function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.type = type
    pokemon.types = types    

    pokemon.photo = pokeDetail.sprites.other['official-artwork'].front_default

    pokemon.description = await pokeApi.getPokemonDescription(pokemon.number)

    const abilities = pokeDetail.abilities.map((ability) => ability.ability.name)
    pokemon.abilities = abilities

    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight

    const stats = pokeDetail.stats.map((stats) => ({
        baseStat : stats.base_stat,
        nameStat : stats.stat.name
    }))
    pokemon.stats = stats

    const moves = pokeDetail.moves.map((move) => move.move.name)
    pokemon.moves = moves

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemonDescription = (pokemonId) => {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`

    let pokemonDescription = fetch(url)
            .then((response) => {return response.json()})
            .then((responseData) => {
                let description = responseData.flavor_text_entries[0].flavor_text
                return description
            })
    return pokemonDescription
}

