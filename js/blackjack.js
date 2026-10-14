const nuevoJuego = document.getElementById('NuevoJuego');
const pedirCarta = document.getElementById('PedirCarta');
const plantarse = document.getElementById('Plantarse');
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
  const cartas = document.querySelectorAll('#CartasJugador img');
  for (let i = 1; i < cartas.length; i++) {
    cartas[i].remove();
  }
  newMazo();
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
}
function plantar() {}
newMazo();
barajar();
nuevoJuego.addEventListener('click', nuevo);
pedirCarta.addEventListener('click', pedir);
plantarse.addEventListener('click', plantar);
console.log(mazo);
