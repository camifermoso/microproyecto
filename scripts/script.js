
const monigote = document.querySelector(".ahorcado");
const mostrarPalabra = document.querySelector(".mostrar-palabra");
const textoAdivinar = document.querySelector(".intentos");
const tecladoDiv = document.querySelector(".teclado");
const estadoJuego = document.querySelector(".estado-juego");
const jugarDeNuevo = document.querySelector(".jugar-denuevo");
const reiniciar = document.querySelector(".reiniciar");

var bien = new Audio("correct.mp3");

let palabraActual, letrasCorrectas, equivocaciones, victorias = 0, puntos = 0;
const maxEquivocaciones = 7;

const resetearJuego = () => {
    letrasCorrectas = [];
    equivocaciones = 0;
    textoAdivinar.innerText = `Intentos: ${equivocaciones} / ${maxEquivocaciones}`;
    mostrarPalabra.innerHTML = palabraActual.split("").map(() => '<li class="letra"></li>').join("");
    estadoJuego.classList.remove("show");

    // Ocultar todas las partes del cuerpo del monigote
    const partesCuerpo = ["head", "body", "left-arm", "right-arm", "left-leg", "right-leg", "lazo"];
    partesCuerpo.forEach(parte => {
        document.getElementById(parte).style.display = "none";
    });

    // Habilitar todos los botones del teclado
    const botones = tecladoDiv.querySelectorAll("button");
    botones.forEach(button => {
        button.disabled = false;
    });

    // Actualizar contador de victorias y puntos
    document.querySelector(".victorias").innerText = `Victorias: ${victorias}`;
    document.querySelector(".puntos").innerText = `Puntos: ${puntos}`;
}

// Para agarrar una palabra de la lista de palabras de forma aleatoria
const agarrarPalabra = () => {
    const { palabra, pista } = listaPalabras[Math.floor(Math.random() * listaPalabras.length)];
    palabraActual = palabra;
    console.log(palabra);
    document.querySelector(".pista b").innerText = pista;
    resetearJuego();
}

// Cuando queremos hacer un reincio
const paraReiniciar = () => {
    victorias = 0
    puntos = 0
    const { palabra, pista } = listaPalabras[Math.floor(Math.random() * listaPalabras.length)];
    palabraActual = palabra;
    console.log(palabra);
    document.querySelector(".pista b").innerText = pista;
    resetearJuego();
}

const actualizarMonigote = () => {
    const partesCuerpo = ["head", "body", "left-arm", "right-arm", "left-leg", "right-leg", "lazo"];
    partesCuerpo.slice(0, equivocaciones).forEach(parte => {
        document.getElementById(parte).style.display = "block";
    });
};

const gameOver = (isVictory) => {
    // Después de 300ms del final del juego, mostrar el modal con los detalles relevantes
    setTimeout(() => {
        const modalText = isVictory ? `Encontraste la palabra:` : `La palabra correcta era:`;
        estadoJuego.querySelector("img").src = `imagenes/${isVictory ? 'mariehappy' : 'mariemean'}.gif`;
        estadoJuego.querySelector("h4").innerText = `${isVictory ? '¡Felicidades!' : '¡Juego Terminado!'}`;
        estadoJuego.querySelector("p").innerHTML = `${modalText} <b>${palabraActual}</b>`;
        estadoJuego.classList.add("show");

        if (isVictory) {
            victorias++;
            puntos += 5; // Añadir puntos por victoria
        } else {
            puntos -= 5; // Restar puntos por derrota
        }
        document.querySelector(".victorias").innerText = `Victorias: ${victorias}`;
        document.querySelector(".puntos").innerText = `Puntos: ${puntos}`;
    }, 300);
}



const initGame = (button, clickedLetter) => {
    // Revisa si la letra elegida está o no en la palabra
    console.log(button, clickedLetter);
    if (palabraActual.includes(clickedLetter)) {
        [...palabraActual].forEach((letra, index) => {
            if (letra === clickedLetter) {
                if (!letrasCorrectas.includes(letra)) {
                    letrasCorrectas.push(letra);
                    puntos++; // Añadir un punto por letra correcta
                    bien.play(); //Suena que esta bien
                }
                mostrarPalabra.querySelectorAll("li")[index].innerText = letra;
                mostrarPalabra.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
        document.querySelector(".puntos").innerText = `Puntos: ${puntos}`;
    } else {
        equivocaciones++;
        actualizarMonigote();
        if (equivocaciones === maxEquivocaciones) {
            gameOver(false);
        }
    }
    button.disabled = true;
    textoAdivinar.innerText = `${equivocaciones} / ${maxEquivocaciones}`;

    // El juego se termina si se cumple alguna de estas condiciones
    if (letrasCorrectas.length === new Set(palabraActual).size) {
        gameOver(true);
    }
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
jugarDeNuevo.addEventListener("click", agarrarPalabra);
reiniciar.addEventListener("click", paraReiniciar);