const listaPokemon = document.querySelector("#listaPokemon");
let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
  fetch(URL + i)
    .then((response) => response.json())
    .then((data) => mostrarPokemon(data));
}

function mostrarPokemon(poke) {
  const div = document.createElement("div");
  div.classList.add("pokemon");
  div.innerHTML = `
        <div class="pokemon-card-inner">
        <div class="pokemon-card-front">
            <p class="pokemon-id-back">#${poke.id}</p>

            <div class="pokemon-imagen">
            <img
                src="${poke.sprites.other["showdown"].front_default}"
                alt="${poke.name}"
            >
            </div>

            <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${poke.id}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
                <i class="fas fa-heart favorite"></i>
            </div>

            <div class="pokemon-tipos">
                <p class="tipo type-normal">NORMAL</p>
            </div>

            <div class="pokemon-stats">
                <div class="stat-item">
                <i class="fas fa-ruler-vertical"></i>
                <span>0.3m</span>
                </div>
                <div class="stat-item">
                <i class="fas fa-weight-hanging"></i>
                <span>4.0kg</span>
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

/* 
<!-- Tarjeta 1: Ditto -->
<div class="pokemon" data-type="normal">
    <div class="pokemon-card-inner">
        <div class="pokemon-card-front">
            <p class="pokemon-id-back">#132</p>
            <div class="pokemon-imagen">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png" alt="ditto">
            </div>
            <div class="pokemon-info">
                <div class="nombre-contenedor">
<p class="pokemon-id">#132</p>
<h2 class="pokemon-nombre">Ditto</h2>
<i class="fas fa-heart favorite"></i>
                </div>
                <div class="pokemon-tipos">
<p class="tipo type-normal">NORMAL</p>
                </div>
                <div class="pokemon-stats">
<div class="stat-item">
    <i class="fas fa-ruler-vertical"></i>
    <span>0.3m</span>
</div>
<div class="stat-item">
    <i class="fas fa-weight-hanging"></i>
    <span>4.0kg</span>
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
</div>

*/
