const listaPokemon = document.querySelector("#listaPokemon");
let URL = "https://pokeapi.co/api/v2/pokemon/";
const pokemonCount = document.querySelector("#count");
const inputBusqueda = document.querySelector("#search-pokemon");
const botonesFiltro = document.querySelectorAll(".filter-btn");
const botonTodos = document.querySelector(".all-btn");
let tiposSeleccionados = [];
const pokemonData = [];


// Generamos los espacios vacíos inmediatamente
for (let i = 1; i <= 151; i++) {
    const contenedorVacio = document.createElement("div");
    contenedorVacio.id = `pokemon-slot-${i}`; // Le damos un ID único por número
    listaPokemon.append(contenedorVacio);
}

for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then((data) => {
            // Buscamos el lugar que le corresponde
            const slot = document.querySelector(`#pokemon-slot-${i}`);
            // Llamamos a tu función para generar el HTML y lo metemos en el slot
            rellenarSlot(slot, data);
            
        });
}



function rellenarSlot(contenedor, poke) {

    let tipos = poke.types.map((typeInfo) => `<p class="type-${typeInfo.type.name}">${typeInfo.type.name}</p>`);
    tipos = tipos.join("");

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }



  contenedor.classList.add("pokemon");
  contenedor.innerHTML = `
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



});

function filtrarPokemon() {
    const textoUsuario = document.querySelector("#search-pokemon").value.toLowerCase();
    const todosLosPokemon = document.querySelectorAll(".pokemon");

    todosLosPokemon.forEach(pokemon => {
        const nombre = pokemon.querySelector(".pokemon-nombre").textContent.toLowerCase();
        
        // Obtenemos todos los tipos que tiene esta tarjeta de Pokémon
        const tiposDelPokemon = Array.from(pokemon.querySelectorAll(".pokemon-tipos p"))
                                     .map(p => p.textContent.toLowerCase());

        // CONDICIÓN 1: ¿El nombre coincide con el buscador?
        const coincideNombre = nombre.includes(textoUsuario);

        // CONDICIÓN 2: ¿El Pokémon tiene AL MENOS UNO de los tipos seleccionados?
        // Si no hay tipos seleccionados, mostramos todos (true)
        const coincideTipo = tiposSeleccionados.length === 0 || 
                             tiposSeleccionados.some(tipo => tiposDelPokemon.includes(tipo));

        // Si cumple ambas condiciones, lo mostramos
        if (coincideNombre && coincideTipo) {
            pokemon.style.display = "block";
        } else {
            pokemon.style.display = "none";
        }
    });

    actualizarContador();
}

botonesFiltro.forEach(boton => {
    boton.addEventListener("click", () => {
        const tipo = boton.getAttribute("data-type");

        if (tipo === null) { // Caso del botón "VER TODOS"
            tiposSeleccionados = [];
            botonesFiltro.forEach(b => b.classList.remove("active"));
            document.querySelector(".all-btn").classList.add("active");
        } else {
            // Quitamos el "active" del botón Ver Todos
            document.querySelector(".all-btn").classList.remove("active");

            // Si el tipo ya estaba, lo quitamos. Si no, lo agregamos.
            if (tiposSeleccionados.includes(tipo)) {
                tiposSeleccionados = tiposSeleccionados.filter(t => t !== tipo);
                boton.classList.remove("active");
            } else {
                tiposSeleccionados.push(tipo);
                boton.classList.add("active");
            }

            // Si deseleccionamos todo, volvemos a activar "Ver Todos"
            if (tiposSeleccionados.length === 0) {
                document.querySelector(".all-btn").classList.add("active");
            }
        }

        filtrarPokemon(); // Ejecutamos el filtro
    });
});