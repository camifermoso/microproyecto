
const mostrarPalabra = document.querySelector(".mostrar-palabra");
const tecladoDiv = document.querySelector(".teclado");

const ponerMusica = document.getElementById("cancion");


// Para agarrar una palabra de la lista de palabras de forma aleatoria
const agarrarPalabra = () => {
    const { palabra, pista } = listaPalabras[Math.floor(Math.random() * listaPalabras.length)];
    console.log(palabra);
    document.querySelector(".pista b").innerText = pista;

    // Para que segun la palabra seleccionada, se creen los espacios en blanco dependiendo de cuantas letras tenga la palabra
    mostrarPalabra.innerHTML = palabra.split("").map(() => '<li class="letra"></li>').join("");

}

// Creamos los botones del teclado
for (let index = 97; index <= 122; index++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(index);

    // Incluimos la letra Ñ
    button.innerText = (index === 163) ? "ñ" : String.fromCharCode(index);

    tecladoDiv.appendChild(button);
}

agarrarPalabra();