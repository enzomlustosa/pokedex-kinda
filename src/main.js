console.log("Hello World!")
let pokemon = "null"
const txtinputid = document.getElementById("inputText");
const txtpokemonname = document.getElementById("pokemonName")
var audio = new Audio();

function capitalizar(texto) {
    return texto.slice(0, 1).toUpperCase() + texto.slice(1, 50)
}

async function fetchData() {
    let fetching = true
    const txtinputvalue = document.getElementById("inputText").value.toLowerCase();
    const imgsprite = document.getElementById("pokemonsprite");
    if (fetching) {
        imgsprite.src = "./imgs/loading.gif"
        imgsprite.width = "50px";
        txtpokemonname.textContent = "Buscando..."
    }
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + txtinputvalue)
        if (!response.ok) {
            fetching = false
            txtinputid.style.borderColor = "red"
            imgsprite.src = ""
            imgsprite.style.display = "none"
            txtpokemonname.textContent = "Erro: Pokemon não encontrado ou Servidor não esta respondendo."
            throw new Error("Could not fetch.");
        } else {
            fetching = false
            const data = await response.json();
            const imgsprite = document.getElementById("pokemonsprite");
            const sprite = data.sprites.front_default;
            console.log(data)
            txtinputid.style.borderColor = "green"
            imgsprite.src = sprite
            imgsprite.width = "300px";
            txtpokemonname.textContent = capitalizar(data.name)
            imgsprite.style.display = "block"
            audio = new Audio(data.cries.latest);
            audio.play();
        }
    }
    catch (error) {
        console.error(error)
    }
}
