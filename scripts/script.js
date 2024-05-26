
const monigote = document.querySelector(".ahorcado");
const mostrarPalabra = document.querySelector(".mostrar-palabra");
const textoAdivinar = document.querySelector(".intentos");
const tecladoDiv = document.querySelector(".teclado");

const ponerMusica = document.getElementById("cancion");

let palabraActual, equivocaciones = 0;
const maxEquivocaciones = 7;

// Para agarrar una palabra de la lista de palabras de forma aleatoria
const agarrarPalabra = () => {
    const { palabra, pista } = listaPalabras[Math.floor(Math.random() * listaPalabras.length)];
    palabraActual = palabra
    console.log(palabra);
    document.querySelector(".pista b").innerText = pista;

    // Para que segun la palabra seleccionada, se creen los espacios en blanco dependiendo de cuantas letras tenga la palabra
    mostrarPalabra.innerHTML = palabra.split("").map(() => '<li class="letra"></li>').join("");

}

const actualizarMonigote = () => {
    const partesCuerpo = ["head", "body", "left-arm", "right-arm", "left-leg", "right-leg", "lazo"];
    partesCuerpo.slice(0, equivocaciones).forEach(parte => {
        document.getElementById(parte).style.display = "block";
    });
};



const initGame = (button, clickedLetter) => {
    // Revisa si la letra elegida está o no en la palabra
    console.log(button, clickedLetter);
    if (palabraActual.includes(clickedLetter)) {
        [...palabraActual].forEach((letra, index) => {
            if (letra === clickedLetter) {
                mostrarPalabra.querySelectorAll("li")[index].innerText = letra;
                mostrarPalabra.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        equivocaciones++;
        actualizarMonigote();
        if (equivocaciones === maxEquivocaciones) {
            // Muestra el mensaje de fin de juego y la palabra correcta
            document.querySelector(".estado-juego").style.display = "flex";
            document.querySelector(".estado-juego .opcion p b").innerText = palabraActual;
        }
    }
    button.disabled = true;
    textoAdivinar.innerText = `${equivocaciones} / ${maxEquivocaciones}`;
};


// Creamos los botones del teclado
for (let index = 97; index <= 122; index++) {
    if (index != 111){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(index);
    tecladoDiv.appendChild(button);
    button.addEventListener("click", e=> initGame(e.target, String.fromCharCode(index)));}
    else{
    // Incluimos la letra Ñ y O
    const buttonÑ = document.createElement("button");
    buttonÑ.innerText = "ñ";
    tecladoDiv.appendChild(buttonÑ);
    buttonÑ.addEventListener("click", e => initGame(e.target, "ñ"));

    const buttonO = document.createElement("button");
    buttonO.innerText = "o";
    tecladoDiv.appendChild(buttonO);
    buttonO.addEventListener("click", e => initGame(e.target, "o"));
    }

}



agarrarPalabra();