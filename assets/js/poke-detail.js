const pokemonDetail = document.getElementById('pokemonCardDetail')
const pokemon = {}
pokemon.url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

let pokemonNumber = '';
if(pokemonId < 10){
    pokemonNumber = '#00' + pokemonId;
} else if(pokemonId >= 10 && pokemonId < 100){
    pokemonNumber = '#0' + pokemonId;
} else {
    pokemonNumber = '#' + pokemonId;
}

function createPokemonCard(pokemon) {
    return `
        <div id="pokemonHeaderDetail" class="${pokemon.type}">
            <div class="nav">
                <a href="./index.html">
                    <i class="arrow left"></i>
                </a>
            </div>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
        <div id="pokemonCardDetails">
            <div class="pokemonDetail">
                <div class="header">
                    <span class="number">${pokemonNumber}</span>
                    <span class="name">${pokemon.name}</span>
                </div>
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <div class="description">
                    <h4>Descrição</h4>
                    <p>Quisque sit amet turpis leo. Maecenas sed dolor mi. Pellentesque varius elit in neque ornare commodo ac non tellus. Mauris id iaculis quam. Donec eu felis quam.</p>
                </div>
                <div class="tabs">
                    <div class="tab-2">
                        <label for="tab2-1">Geral</label>
                        <input id="tab2-1" name="tabs-two" type="radio" checked="checked">
                        <div class="measures">
                            <div><h4>Peso</h4><p>${(pokemon.weight/10).toFixed(2)} kgs</p></div>
                            <div><h4>Altura</h4><p>${(pokemon.height/10).toFixed(2)} mts</p></div>
                        </div>
                    </div>
                    <div class="tab-2">
                        <label for="tab2-2">Stats</label>
                        <input id="tab2-2" name="tabs-two" type="radio">
                        <div>
                        <h4>Stats</h4>
                        <p>Quisque sit amet turpis leo. Maecenas sed dolor mi. Pellentesque varius elit in neque ornare commodo ac non tellus. Mauris id iaculis quam. Donec eu felis quam. Morbi tristique lorem eget iaculis consectetur. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean at tellus eget risus tempus ultrices. Nam condimentum nisi enim, scelerisque faucibus lectus sodales at.</p>
                        </div>
                    </div>
                </div>
            </div>    
        </div>
    `
}

function loadPokemonDetails(pokemon) {
    pokeApi.getPokemonDetail(pokemon)
        .then((pokemon = []) => {
            const newHtml = createPokemonCard(pokemon)
            pokemonDetail.innerHTML += ` ${newHtml}`
        })
}

loadPokemonDetails(pokemon)