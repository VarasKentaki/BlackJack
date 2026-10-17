const nuevoJuego = document.getElementById('NuevoJuego');
const pedirCarta = document.getElementById('PedirCarta');
const plantarse = document.getElementById('Plantarse');
const PuntuacionJugador = document.getElementById('PuntuacionJugador');
const PuntuacionComputadora = document.getElementById('PuntuacionComputadora');
const MensajeJugador = document.getElementById('MensajeJugador');
const MensajeComputadora = document.getElementById('MensajeComputadora');
const span = document.createElement('span');

plantarse.style.visibility = 'hidden';
let mazo = [];
let contadorAs = 0;
let puntosJugador = 0;
const palos = ['D', 'H', 'S', 'C'];
const figuras = ['A', 'J', 'Q', 'K'];
function newMazo() {
  mazo = [];
  palos.forEach((palo) => {
    for (let i = 2; i <= 10; i++) {
      mazo.push(`${i}${palo}`);
    }
    figuras.forEach((letra) => {
      mazo.push(`${letra}${palo}`);
    });
  });
}
function barajar() {
  // Empezamos final del mazo
  // Cogemos la ultima carta y vamos a generar un numero que sea
  //0-51 e intercambiamos la posicion
  // repetimos esto hasta lelgar al a primera carta
  let barajas = [];
  for (let i = mazo.length - 1; i >= 0; i--) {
    const posicion = Math.floor(Math.random() * 52);
    const cartaTemporal = mazo[posicion];
    mazo[posicion] = mazo[i];
    mazo[i] = cartaTemporal;
  }
}
function nuevo() {
  // * Reiniciamos los puntos del jugador
  puntosJugador = 0;
  plantarse.style.visibility = 'hidden';
  pedirCarta.style.visibility = 'visible';
  span.remove();
  const cartas = document.querySelectorAll('#CartasJugador img');
  const cartasC = document.querySelectorAll('#CartasComputadora img');
  for (let i = 1; i < cartas.length; i++) {
    cartas[i].remove();
  }
  for (let i = 1; i < cartasC.length; i++) {
    cartasC[i].remove();
  }
  newMazo();
  barajar();
  PuntuacionJugador.textContent = 0;
  PuntuacionComputadora.textContent = 0;
  MensajeComputadora.textContent = '';
  MensajeJugador.textContent = '';
  MensajeComputadora.removeAttribute('class');
  MensajeJugador.removeAttribute('class');
  contadorAs = 0;
}
function pedir() {
  if (plantarse.style.visibility == 'hidden')
    plantarse.style.visibility = 'visible';
  const carta = mazo.pop();
  if (carta) {
    const cartaNueva = document.createElement('img');
    cartaNueva.setAttribute('src', `cartas/${carta}.png`);
    document.getElementById('CartasJugador').append(cartaNueva);
  }
  //2C o 10C
  numero = carta[0];
  switch (carta.length) {
    case 2:
      if (figuras.includes(numero)) {
        switch (numero[0]) {
          case 'A':
            numero = 1;
            contadorAs++;
            break;
          default:
            numero = 10;
            break;
        }
      } else {
        numero *= 1;
      }
      break;
    case 3:
      numero = 10;
      break;
    default:
      console.log('Algo mal');
  }
  // ! Problemas con el AS CUANDO VALE  11
  //  * El As Tiene 2 valores 1 y 11 necesitamos un contador para saber las veces que entra en el as
  // * El As cambiara dependiendo de lo que le beneficie al jugador.
  // * Cada numero me lo guardo a los puntos

  puntosJugador += numero; // * el as entra como 1

  let total = puntosJugador;
  if (contadorAs > 0 && puntosJugador + 10 <= 21) {
    total = puntosJugador + 10; // ? un as vale 11 como se le sumo antes el 1 pues solo sumariamos 10
  }
  // * Si no sale ningun As o con el As a 11 es mayor que 21 pues no le suma 10 y lo usa como 1 (Si saliese algun As)
  PuntuacionJugador.textContent = total;

  if (total > 21) {
    span.style.visibility = 'visible';
    plantarse.style.visibility = 'hidden';
    pedirCarta.style.visibility = 'hidden';
    span.classList.add('perder');
    span.textContent = 'Te pasaste';
    const zonaJugador = document.getElementById('Jugador');
    zonaJugador.insertBefore(span, document.getElementById('CartasJugador'));
  }
}

function plantar() {
  // * Esto es igual con jugador pero las tenemos que reiniciar cada vez que nos plantemos o cuando empecemos partida es igual
  let puntosPC = 0;
  let asesPC = 0;
  let totalPC = 0;
  do {
    const carta = mazo.pop();

    if (carta) {
      const cartaNueva = document.createElement('img');
      cartaNueva.setAttribute('src', `cartas/${carta}.png`);
      document.getElementById('CartasComputadora').append(cartaNueva);
    }
    numero = carta[0];
    switch (carta.length) {
      case 2:
        if (figuras.includes(numero)) {
          switch (numero[0]) {
            case 'A':
              numero = 1;
              asesPC++;
              break;
            default:
              numero = 10;
              break;
          }
        } else {
          numero *= 1;
        }
        break;
      case 3:
        numero = 10;
        break;
      default:
        console.log('Algo mal');
    }
    puntosPC += numero; // * el as entra como 1

    let totalPC = puntosPC;
    if (asesPC > 0 && puntosPC + 10 <= 21) {
      totalPC = puntosPC + 10; // ? un as vale 11 como se le sumo antes el 1 pues solo sumariamos 10
    }

    PuntuacionComputadora.textContent = totalPC;
  } while (PuntuacionComputadora.textContent * 1 <= 17);
  if (
    PuntuacionComputadora.textContent * 1 > 21 ||
    PuntuacionJugador.textContent * 1 > PuntuacionComputadora.textContent * 1
  ) {
    MensajeJugador.className = 'ganar';
    MensajeComputadora.className = 'perder';
    MensajeJugador.textContent = 'GANASTE!!!';
    MensajeComputadora.textContent = 'PERDISTE!!!';
  } else if (
    PuntuacionJugador.textContent * 1 <
    PuntuacionComputadora.textContent * 1
  ) {
    MensajeComputadora.className = 'ganar';
    MensajeJugador.className = 'perder';
    MensajeComputadora.textContent = 'GANASTE!!!';
    MensajeJugador.textContent = 'PERDISTE!!!';
  } else {
    MensajeComputadora.className = 'perder';
    MensajeJugador.className = 'perder';
    MensajeComputadora.textContent = 'EMPATE!!!';
    MensajeJugador.textContent = 'EMPATE!!!';
  }
  plantarse.style.visibility = 'hidden';
  pedirCarta.style.visibility = 'hidden';
}

newMazo();
barajar();
nuevoJuego.addEventListener('click', nuevo);
pedirCarta.addEventListener('click', pedir);
plantarse.addEventListener('click', plantar);
console.log(mazo);
