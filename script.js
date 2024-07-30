async function fetchData() {
    try {
        const pokemonName = document.querySelector("#pokemonName").value.toLowerCase();

        if (!pokemonName) {
            alert("Please enter a Pokémon name.");
            return;
        }

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();

        const getMoves = data.moves.slice(0, 5).map(move => move.move.name);

        const pokemonSprite = data.sprites.front_default;
        const imgElement = document.querySelector("#pokemonSprite");
        const pokeIndexElement = document.querySelector("#pokeIndex");

        imgElement.src = pokemonSprite;
        imgElement.style.display = 'block';

        pokeIndexElement.innerHTML = `
            <h1><b><u>Poke-Index</u></b></h1><br></br>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>ID:</strong> ${data.id}</p>
            <p><strong>Weight:</strong> ${data.weight} hectograms</p>
            <p><strong>Moves:</strong> ${getMoves.join(", ")} etc</p>
        `;

    } catch (error) {
        console.error(error);
    }
}

document.getElementById("btn1").addEventListener("click", fetchData);