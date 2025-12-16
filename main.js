const listaPokemon = document.querySelector("#listaPokemon");
let URL = "https://pokeapi.co/api/v2/pokemon/";
const pokemonCount = document.querySelector("#count");
const inputBusqueda = document.querySelector("#search-pokemon");


for (let i = 1; i <= 151; i++) {
  fetch(URL + i)
    .then((response) => response.json())
    .then((data) => mostrarPokemon(data));
}

function mostrarPokemon(poke) {

    let tipos = poke.types.map((typeInfo) => `<p class="type-${typeInfo.type.name}">${typeInfo.type.name}</p>`);
    tipos = tipos.join("");

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }



  const div = document.createElement("div");
  div.classList.add("pokemon");
  div.innerHTML = `
        <div class="pokemon-card-inner">
        <div class="pokemon-card-front">
            <p class="pokemon-id-back">#${pokeId}</p>

            <div class="pokemon-imagen">
            <img
                src="${poke.sprites.other["official-artwork"].front_default}"
                alt="${poke.name}"
            >
            </div>

            <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>

            </div>

            <div class="pokemon-tipos">
                ${tipos}
            </div>

            <div class="pokemon-stats">
                <div class="stat-item">
                <i class="fas fa-ruler-vertical"></i>
                <span>${ (poke.height / 10).toFixed(2) } m </span>
                </div>
                <div class="stat-item">
                <i class="fas fa-weight-hanging"></i>
                <span>${poke.weight}kg</span>
                </div>
            </div>
            </div>
        </div>

        <div class="pokemon-card-back">
            <p class="pokemon-id-back">#${pokeId}</p>

            <div class="pokemon-imagen">
            <img
                src="${poke.sprites.other["official-artwork"].front_shiny}"
                alt="${poke.name}"
            >
            </div>

            <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>

            </div>

            <div class="stats-detailed">
            <div class="stat-bar">
                <span>HP</span>
                <div class="bar-container">
                <div class="bar-fill" style="width: ${poke.stats[0].base_stat}%"></div>
                </div>
                <span>${poke.stats[0].base_stat}</span>
            </div>

            <div class="stat-bar">
                <span>Ataque</span>
                <div class="bar-container">
                <div class="bar-fill" style="width: ${poke.stats[1].base_stat}%"></div>
                </div>
                <span>${poke.stats[1].base_stat}</span>
            </div>

            <div class="stat-bar">
                <span>Defensa</span>
                <div class="bar-container">
                <div class="bar-fill" style="width: ${poke.stats[2].base_stat}%"></div>
                </div>
                <span>${poke.stats[2].base_stat}</span>
            </div>
            </div>
        </div>
        </div>
    `;
    listaPokemon.append(div);
    actualizarContador();

}

function actualizarContador() {
    const cantidad = document.querySelectorAll(".pokemon").length;
    pokemonCount.textContent = cantidad;
}

inputBusqueda.addEventListener("input", (e) => {
    const textoUsuario = e.target.value.toLowerCase(); // Convertimos a minúsculas para comparar mejor
    const todosLosPokemon = document.querySelectorAll(".pokemon");

    todosLosPokemon.forEach(pokemon => {
        const nombrePokemon = pokemon.querySelector(".pokemon-nombre").textContent.toLowerCase();
        
        // Lógica de filtrado
        if (nombrePokemon.includes(textoUsuario)) {
            pokemon.style.display = "block"; // Se muestra si coincide
        } else {
            pokemon.style.display = "none";  // Se oculta si no coincide
        }
    });

    actualizarContador(); // Actualizamos el número para que coincida con los resultados visibles
});