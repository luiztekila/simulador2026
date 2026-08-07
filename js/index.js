var pregunta = 1;
var bandera = "A";
var ultima = 0;
var respuesta = "";
var buena = 0;
var mala = 0;
var lectura = 0;
let malucas = [];
let miCheckbox;

// ===== NUEVO: variables para repaso de malas =====
var modoRepasoMalas = false;
var indiceRepaso = 0;
var preguntasMalas = [];

/* =========================================
   CONTADOR + BARRA DE PROGRESO
========================================= */
function actualizarContadorPregunta(actual, total) {
    if (total <= 0) total = 1;
    if (actual < 1) actual = 1;
    if (actual > total) actual = total;

    const contador = document.getElementById("contadorPreguntas");
    const porcentaje = document.getElementById("porcentajePreguntas");
    const barra = document.getElementById("barraPreguntas");

    const progreso = Math.round((actual / total) * 100);

    if (contador) contador.textContent = actual + " / " + total;
    if (porcentaje) porcentaje.textContent = progreso + "%";
    if (barra) barra.style.width = progreso + "%";
}

/* =========================================
   CONTAR PREGUNTAS DEL TXT
========================================= */
function contarLineas() {
    var textarea = document.getElementById('txtArea');
    var contenido = textarea.value;

    var lineas = contenido.split('\n');
    var lineasNoVacias = lineas.filter(function(linea) {
        return linea.trim() !== '';
    });

    ultima = Math.floor(lineasNoVacias.length / 10);

    alert('El tema tiene ' + ultima + ' Preguntas.');

    console.log("Total preguntas:", ultima);

    actualizarContadorPregunta(pregunta, ultima);

    // ocultar bloque de respuesta al iniciar si el check no está activo
    var check = document.getElementById("evaluarcheck");
    var bloqueRespuesta = document.getElementById("bloqueRespuesta");
    var parrafo = document.getElementById("respuesta");

    if (check && !check.checked) {
        if (parrafo) parrafo.hidden = true;
        if (bloqueRespuesta) bloqueRespuesta.style.display = "none";
    }
}

/* =========================================
   AVANZAR PREGUNTA
========================================= */
function siguiente() {

    // ===== SI ESTÁ EN MODO REPASO =====
    if (modoRepasoMalas) {
        indiceRepaso++;

        if (indiceRepaso >= preguntasMalas.length) {
            indiceRepaso = preguntasMalas.length - 1;
            alert("Terminó el repaso de preguntas malas.");
            return;
        }

        pregunta = preguntasMalas[indiceRepaso];
        copiarLinea();
        bandera = "A";
        detenerlectura();
        actualizarContadorPregunta(indiceRepaso + 1, preguntasMalas.length);
        return;
    }

    // ===== MODO NORMAL =====
    pregunta = pregunta + 1;

    if (pregunta > ultima) {
        pregunta = ultima;
        alert('Terminó el tema de estudio.\nAhora puedes repasar solo las preguntas malas.');

        var btnRepaso = document.getElementById("btnRepasarMalas");
        if (btnRepaso && malucas.length > 0) {
            btnRepaso.style.display = "inline-block";
        }

    } else {
        copiarLinea();
        bandera = "A";
        detenerlectura();
    }

    actualizarContadorPregunta(pregunta, ultima);
}

/* =========================================
   RETROCEDER PREGUNTA
========================================= */
function atras() {

    // ===== SI ESTÁ EN MODO REPASO =====
    if (modoRepasoMalas) {
        if (indiceRepaso <= 0) {
            alert("Llegó al inicio del repaso.");
            return;
        }

        indiceRepaso--;
        pregunta = preguntasMalas[indiceRepaso];
        copiarLinea();
        bandera = "A";
        detenerlectura();
        actualizarContadorPregunta(indiceRepaso + 1, preguntasMalas.length);
        return;
    }

    // ===== MODO NORMAL =====
    if (pregunta == 1) {
        alert('Llegó al Inicio');
    } else {
        pregunta = pregunta - 1;
        copiarLinea();
        bandera = "A";
        detenerlectura();
    }

    actualizarContadorPregunta(pregunta, ultima);
}

/* =========================================
   CARGAR PREGUNTA ACTUAL
========================================= */
function copiarLinea() {
    var textarea = document.getElementById('txtArea');
    var lineaDeseada = pregunta * 10;
    var contenido = textarea.value;

    // Dividir el contenido del textarea en líneas
    var lineas = contenido.split('\n');

    // Obtener líneas de la pregunta actual
    var linea1 = lineas[lineaDeseada - 10] || "";
    var linea2 = lineas[lineaDeseada - 9] || "";
    var linea3 = lineas[lineaDeseada - 8] || "";
    var linea4 = lineas[lineaDeseada - 7] || "";
    var linea5 = lineas[lineaDeseada - 6] || "";
    var linea6 = lineas[lineaDeseada - 5] || "";
    var linea7 = lineas[lineaDeseada - 4] || "";

    document.getElementById('parra1').textContent = "Pregunta (" + pregunta + "): " + linea1;
    document.getElementById('parra2').textContent = linea2;
    document.getElementById('parra3').textContent = linea3;
    document.getElementById('parra4').textContent = linea4;
    document.getElementById('parra5').textContent = linea5;
    document.getElementById('parra6').textContent = linea6;
    document.getElementById('parra7').textContent = linea7;

    if (linea2 == linea7) {
        respuesta = "A";
    } else if (linea3 == linea7) {
        respuesta = "B";
    } else if (linea4 == linea7) {
        respuesta = "C";
    } else if (linea5 == linea7) {
        respuesta = "D";
    } else if (linea6 == linea7) {
        respuesta = "E";
    } else {
        respuesta = "Error";
    }

    document.getElementById('respuesta').textContent = respuesta;

    // limpiar radios
    var radios = document.getElementsByName('opcion');
    for (var i = 0; i < radios.length; i++) {
        radios[i].checked = false;
    }

    // limpiar íconos
    document.getElementById('imagen1').src = "";
    document.getElementById('imagen2').src = "";
    document.getElementById('imagen3').src = "";
    document.getElementById('imagen4').src = "";
    document.getElementById('imagen5').src = "";

    // contador según el modo
    if (modoRepasoMalas) {
        actualizarContadorPregunta(indiceRepaso + 1, preguntasMalas.length);
    } else {
        actualizarContadorPregunta(pregunta, ultima);
    }
}

/* =========================================
   RESPONDER
========================================= */
var responder = function(opcion) {

    var imag1 = document.getElementById('imagen1');
    var imag2 = document.getElementById('imagen2');
    var imag3 = document.getElementById('imagen3');
    var imag4 = document.getElementById('imagen4');
    var imag5 = document.getElementById('imagen5');

    var seleccionado = document.querySelector('input[name=opcion]:checked');
    if (!seleccionado) return;

    var valor = seleccionado.value;

    switch (valor) {
        case "A":
            if (respuesta == "A") {
                imag1.src = 'img/buena.png';
                buenas();
            } else {
                imag1.src = 'img/mala.png';
                malas();
            }
            break;

        case "B":
            if (respuesta == "B") {
                imag2.src = 'img/buena.png';
                buenas();
            } else {
                imag2.src = 'img/mala.png';
                malas();
            }
            break;

        case "C":
            if (respuesta == "C") {
                imag3.src = 'img/buena.png';
                buenas();
            } else {
                imag3.src = 'img/mala.png';
                malas();
            }
            break;

        case "D":
            if (respuesta == "D") {
                imag4.src = 'img/buena.png';
                buenas();
            } else {
                imag4.src = 'img/mala.png';
                malas();
            }
            break;

        case "E":
            if (respuesta == "E") {
                imag5.src = 'img/buena.png';
                buenas();
            } else {
                imag5.src = 'img/mala.png';
                malas();
            }
            break;

        default:
            break;
    }
};

/* =========================================
   SUMAR BUENAS
========================================= */
var buenas = function() {
    if (bandera == "A") {
        buena = buena + 1;
        document.getElementById("verbuenas").innerHTML = "Buenas : " + buena;
        bandera = "B";
    }
};

/* =========================================
   SUMAR MALAS
========================================= */
var malas = function() {
    if (bandera == "A") {

        // guardar solo una vez cada pregunta mala
        if (!malucas.includes(pregunta)) {
            malucas.push(pregunta);
        }

        mala = mala + 1;
        document.getElementById("vermalas").innerHTML = "Malas : " + mala;
        document.getElementById("malucas").innerHTML = malucas.join(", ");
        bandera = "B";
    }
};

/* =========================================
   REPASAR SOLO PREGUNTAS MALAS
========================================= */
function repasarMalas() {
    if (malucas.length === 0) {
        alert("No hay preguntas malas para repasar. ¡Excelente trabajo!");
        return;
    }

    preguntasMalas = [...new Set(malucas)];

    modoRepasoMalas = true;
    indiceRepaso = 0;

    // cargar la primera pregunta mala
    pregunta = preguntasMalas[indiceRepaso];
    copiarLinea();

    // mostrar botón salir repaso
    var btnSalirRepaso = document.getElementById("btnSalirRepaso");
    if (btnSalirRepaso) btnSalirRepaso.style.display = "inline-block";

    alert("Modo repaso activado. Se cargarán solo las preguntas incorrectas.");
}

/* =========================================
   SALIR DEL REPASO DE MALAS
========================================= */
function salirRepasoMalas() {
    modoRepasoMalas = false;
    indiceRepaso = 0;
    preguntasMalas = [];

    var btnSalirRepaso = document.getElementById("btnSalirRepaso");
    if (btnSalirRepaso) btnSalirRepaso.style.display = "none";

    alert("Saliste del repaso de preguntas malas.");

    actualizarContadorPregunta(pregunta, ultima);
}

/* =========================================
   AVISO AL SALIR
========================================= */
window.onbeforeunload = function(e) {
    return '¿ Quieres salir?';
};

/* =========================================
   AUDIO DE PREGUNTA Y ALTERNATIVAS
========================================= */
function leerparrafos() {
    const etiquetas = [
        "",
        "Alternativa A",
        "Alternativa B",
        "Alternativa C",
        "Alternativa D",
        "Alternativa E"
    ];

    const parrafos = document.querySelectorAll("p");
    const frases = [];

    for (let i = 0; i < 6 && i < parrafos.length; i++) {
        const texto = parrafos[i].textContent.trim();
        if (texto) {
            frases.push(etiquetas[i]);
            frases.push(texto);
        }
    }

    if (frases.length === 0) {
        alert("No hay párrafos para leer.");
        return;
    }

    let idx = 0;

    function leerSiguiente() {
        if (idx >= frases.length) return;

        let utterance = new SpeechSynthesisUtterance(frases[idx]);
        utterance.lang = "es-ES";

        utterance.onend = function() {
            idx++;
            leerSiguiente();
        };

        speechSynthesis.speak(utterance);
    }

    speechSynthesis.cancel();
    leerSiguiente();
}

/* =========================================
   DETENER AUDIO
========================================= */
function detenerlectura() {
    speechSynthesis.cancel();
}

/* =========================================
   MODO REPASO / VER RESPUESTA
========================================= */
function micheck(check) {
    const parrafo = document.getElementById("respuesta");
    const bloqueRespuesta = document.getElementById("bloqueRespuesta");

    if (check.checked) {
        alert("El checkbox está ACTIVADO - Está en modo repaso, se mostrarán las respuestas ✅");
        
        if (parrafo) parrafo.hidden = false;
        if (bloqueRespuesta) bloqueRespuesta.style.display = "flex";

    } else {
        alert("El checkbox está DESACTIVADO - Está en modo examen ❌");
        
        if (parrafo) parrafo.hidden = true;
        if (bloqueRespuesta) bloqueRespuesta.style.display = "none";
    }
}