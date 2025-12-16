const listaPokemon = document.querySelector("#listaPokemon");
let URL = "https://pokeapi.co/api/v2/pokemon/";

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
            <h3>Habilidad Especial</h3>
            <p class="ability">Flexibilidad</p>
            <p class="description">Puede transformarse en cualquier Pokémon que vea.</p>

            <div class="stats-detailed">
            <div class="stat-bar">
                <span>HP</span>
                <div class="bar-container">
                <div class="bar-fill" style="width: 48%"></div>
                </div>
                <span>48</span>
            </div>

            <div class="stat-bar">
                <span>Ataque</span>
                <div class="bar-container">
                <div class="bar-fill" style="width: 48%"></div>
                </div>
                <span>48</span>
            </div>

            <div class="stat-bar">
                <span>Defensa</span>
                <div class="bar-container">
                <div class="bar-fill" style="width: 48%"></div>
                </div>
                <span>48</span>
            </div>
            </div>
        </div>
        </div>
    `;
    listaPokemon.append(div);

}