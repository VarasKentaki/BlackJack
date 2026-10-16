const nuevoJuego = document.getElementById('NuevoJuego');
const pedirCarta = document.getElementById('PedirCarta');
const plantarse = document.getElementById('Plantarse');
const PuntuacionJugador = document.getElementById('PuntuacionJugador');
const MensajeJugador = document.getElementById('MensajeJugador');
const span = document.createElement('span');
plantarse.style.visibility = 'hidden';
let mazo = [];
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
  plantarse.style.visibility = 'hidden';
  pedirCarta.style.visibility = 'visible';
  span.remove();
  const cartas = document.querySelectorAll('#CartasJugador img');
  for (let i = 1; i < cartas.length; i++) {
    cartas[i].remove();
  }
  newMazo();
  barajar();
  PuntuacionJugador.textContent = 0;
}
function pedir(opcion) {
  if (plantarse.style.visibility == 'hidden')
    plantarse.style.visibility = 'visible';
  const carta = mazo.pop();
  if (carta) {
    const cartaNueva = document.createElement('img');
    cartaNueva.setAttribute('src', `cartas/${carta}.png`);
    document.getElementById(`${opcion}`).append(cartaNueva);
  }
  //2C o 10C
  numero = carta[0];
  switch (carta.length) {
    case 2:
      if (figuras.includes(numero)) {
        numero = 10;
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

  PuntuacionJugador.textContent = PuntuacionJugador.textContent * 1 + numero;
  numero = PuntuacionJugador.textContent;
  if (numero > 21) {
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
  const carta = mazo.pop();
  if (carta) {
    const cartaNueva = document.createElement('img');
    cartaNueva.setAttribute('src', `cartas/${carta}.png`);
    document.getElementById(`${opcion}`).append(cartaNueva);
  }
}

newMazo();
barajar();
nuevoJuego.addEventListener('click', nuevo);
pedirCarta.addEventListener('click', pedir);
plantarse.addEventListener('click', plantar);
console.log(mazo);
