 var pregunta;
 var bandera = "A";
 var ultima = 0;
 var respuesta = "";
 var buena = 0;
 var mala = 0;
// var ALEA=[];
// inicia funcion numeros aleatorios
function generarNumerosAleatorios(cantidad,fin) {
  const numeros = [];

  for (let i = 0; i < cantidad; i++) {
    const numero = Math.floor(Math.random()*fin) + 1;
    numeros.push(numero);
  }

  return numeros;
 
}
ALEA = generarNumerosAleatorios(100,3000);
document.write(ALEA[0]);
//termina sunmeros aleatorios
indice=0;
 function contarLineas() {
     var textarea = document.getElementById('txtArea');
     var contenido = textarea.value;
     // Dividir el contenido del textarea en líneas utilizando el salto de línea como separador
     var lineas = contenido.split('\n');
     // Eliminar líneas vacías del conteo
     var lineasNoVacias = lineas.filter(function(linea) {
         return linea.trim() !== '';
     });
     // Mostrar el número de líneas

     alert('Se generarán 100 preguntas de un total de ' + lineasNoVacias.length / 10 + ' Preguntas.');
     ultima = (contenido.match(/\n/g) || []).length / 10;

     
 }

 function siguiente() {
     indice = indice + 1;
     if (indice > 99) { alert('Terminó el tema de estudio'); } else {
         copiarLinea();
         bandera = "A";
     };
 }

 function atras() {
     if (indice == 0) { alert('Llegó al Inicio'); } else {
         indice = indice - 1;
         copiarLinea();
         bandera = "A";
     }
 }

 function copiarLinea() {
     pregunta=ALEA[indice];
      document.getElementById('nro_preg').textContent = `  Pregunta N°: ${indice+1}`;
     var textarea = document.getElementById('txtArea');
     var lineaDeseada = pregunta * 10; // Cambia esto al número de línea que deseas copiar
     var contenido = textarea.value;
     // Dividir el contenido del textarea en líneas utilizando el salto de línea como separador
     var lineas = contenido.split('\n');
     // Obtener la línea deseada por su índice
     var linea1 = lineas[lineaDeseada - 10] //índices comienzan en 0
     var linea2 = lineas[lineaDeseada - 9]
     var linea3 = lineas[lineaDeseada - 8]
     var linea4 = lineas[lineaDeseada - 7]
     var linea5 = lineas[lineaDeseada - 6]
     var linea6 = lineas[lineaDeseada - 5]
     var linea7 = lineas[lineaDeseada - 4];
     document.getElementById('parra1').textContent = linea1;
     document.getElementById('parra2').textContent = linea2;
     document.getElementById('parra3').textContent = linea3;
     document.getElementById('parra4').textContent = linea4;
     document.getElementById('parra5').textContent = linea5;
     document.getElementById('parra6').textContent = linea6;
     document.getElementById('parra7').textContent = linea7;
     if (linea2 == linea7) { respuesta = "A"; } else if (linea3 == linea7) { respuesta = "B"; } else if (linea4 == linea7) { respuesta = "C"; } else if (linea5 == linea7) { respuesta = "D"; } else if (linea6 == linea7) { respuesta = "E"; } else respuesta = "Error";
     document.getElementById('respuesta').textContent = respuesta;
    
     var radios = document.getElementsByName('opcion');
     for (var i = 0; i < radios.length; i++) {
         radios[i].checked = false;
     }
     document.getElementById('imagen1').src = "";
     document.getElementById('imagen2').src = "";
     document.getElementById('imagen3').src = "";
     document.getElementById('imagen4').src = "";
     document.getElementById('imagen5').src = "";

 }

 var responder = function(opcion) {

     var imag1 = document.getElementById('imagen1');
     var imag2 = document.getElementById('imagen2');
     var imag3 = document.getElementById('imagen3');
     var imag4 = document.getElementById('imagen4');
     var imag5 = document.getElementById('imagen5');
     var valor = document.querySelector('input[name=opcion]:checked').value; //encuetra el valor de radio button seleccionado
     // document.getElementById('seleccion').textContent = valor;
     // para contar las buenas y malas   
     //bandera=document.getElementById('verbandera');

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
     };

 }
 var buenas = function() {
     if (bandera == "A") {
         buena = buena + 1;
         document.getElementById("verbuenas").innerHTML = "Buenas : " + buena;
         bandera = "B";
     };
 }
 var malas = function() {
     if (bandera == "A") {
         mala = mala + 1;
         document.getElementById("vermalas").innerHTML = "Malas : " + mala;
         bandera = "B";
     };
 }

 window.onbeforeunload = function(e) {
     return '¿ Quieres salir?';
 };