const juego=(()=>{

const palos=["C", "H", "S", "D"],
      figuras=["A", "J", "Q", "K"],
      cartas=[],      
      PuntuacionJugador=document.querySelector("#PuntuacionJugador"),
      PuntuacionComputadora=document.querySelector("#PuntuacionComputadora"),
      CartasJugador=document.querySelector("#CartasJugador"),
      CartasComputadora=document.querySelector("#CartasComputadora"),
      MensajeJugador=document.querySelector("#MensajeJugador"),
      MensajeComputadora=document.querySelector("#MensajeComputadora"),
      BotonPedirCarta=document.querySelector("#PedirCarta"),
      BotonPlantarse=document.querySelector("#Plantarse");

let BocaAbajo=document.querySelector("#BocaAbajo"),
    BocaAbajo2=document.querySelector("#BocaAbajo2"),
    puntosJugador=0,
    puntosComputadora=0,
    mazo=mazoJugador=mazoComputadora=[];
    

function shuffle(array) {
    let currentIndex = array.length,  randomIndex; 
    while (currentIndex != 0) {       
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;       
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}


const descargarCartas= ()=>{    
    if (cartas.length<1 )
    {   
        mazo.forEach(carta=>{
            const imagen_carta=document.createElement("img");
            imagen_carta.src=`cartas/${carta}.png`;
            cartas.pop(imagen_carta);
        });
    }
};


const crearMazo=()=>{
    mazo=[];
    for(let palo of palos){
        for(let i=2;i<=10;i++)
            mazo.push(i + palo);
        for(let figura of figuras)
            mazo.push(figura + palo);
    }
    shuffle(mazo);
    descargarCartas();
}

const valorCarta=(carta)=>{
    let valor=carta.substring(0,carta.length-1);
    return isNaN(valor)? (valor==="A")? 11: 10
    : parseInt(valor);
}

const revisar21=(mazoRevisar)=>{
    let puntos=0;
    
    mazoRevisar.forEach(elemento=>puntos+=valorCarta(elemento));
    
    for (let i of mazoRevisar)
    {
        i=i.substring(0,i.length-1);
        if(i==="A"){
            puntos-=10;
            if(puntos<=21)
                break;
        }
    }
    return puntos;
}

const dibujarCarta=(lugar, cartaBocaAbajo)=>{
    const imagen_carta=document.createElement("img");
    imagen_carta.src=`cartas/${carta}.png`;
    cartaBocaAbajo=lugar.replaceChild(imagen_carta,cartaBocaAbajo);
    lugar.append(cartaBocaAbajo);
    return cartaBocaAbajo;    
}

const pedirCarta=()=>{
    carta=mazo.pop();
    mazoJugador.push(carta);

    puntosJugador+=valorCarta(carta);
    PuntuacionJugador.textContent=puntosJugador;    

    BocaAbajo=dibujarCarta(CartasJugador,BocaAbajo);
    BotonPlantarse.removeAttribute("disabled");    

    if(puntosJugador>21)
    {
        puntosJugador=revisar21(mazoJugador);
        PuntuacionJugador.textContent=puntosJugador; 

        if(puntosJugador>21){
            MensajeJugador.classList.add("perder");
            MensajeJugador.textContent="Te pasaste!!";
            BotonPedirCarta.setAttribute("disabled","true");
            BotonPlantarse.setAttribute("disabled","true");
            turnoComputadora();
        }
    }
    
    if(puntosJugador==21)
    {
        if (mazoJugador.length==2){
            MensajeJugador.classList.add("blackjack");
            MensajeJugador.textContent="BlackJack!!";
        }
        else{
            MensajeJugador.classList.add("ganar");
            MensajeJugador.textContent="21!!";
        }
        BotonPedirCarta.setAttribute("disabled","true");
        BotonPlantarse.setAttribute("disabled","true");
        turnoComputadora();
    }    
}

const nuevoJuego=()=>{
    crearMazo();
    
    mazoJugador=[];
    puntosJugador=0;
    CartasJugador.innerHTML="";
    CartasJugador.append(BocaAbajo);
    MensajeJugador.textContent="";
    MensajeJugador.className="";
    PuntuacionJugador.textContent=puntosJugador;
    
    mazoComputadora=[];
    puntosComputadora=0;
    CartasComputadora.innerHTML="";
    CartasComputadora.append(BocaAbajo2);
    MensajeComputadora.textContent="";
    MensajeComputadora.className="";
    PuntuacionComputadora.textContent=puntosComputadora;

    BotonPedirCarta.removeAttribute("disabled");
    BotonPlantarse.setAttribute("disabled","true");  
}

const turnoComputadora=()=>{
    BotonPedirCarta.setAttribute("disabled","true");
    BotonPlantarse.setAttribute("disabled","true");
    
    do{
        carta=mazo.pop();
        mazoComputadora.push(carta);

        puntosComputadora+=valorCarta(carta);
        PuntuacionComputadora.textContent=puntosComputadora;
       
        BocaAbajo2=dibujarCarta(CartasComputadora,BocaAbajo2);
            
        if (puntosComputadora>21)
        {
            puntosComputadora=revisar21(mazoComputadora);
            PuntuacionComputadora.textContent=puntosComputadora;
        }        
    } while(puntosComputadora<puntosJugador && puntosJugador<=21) 

    if(puntosComputadora>21){
        MensajeComputadora.classList.add("ganar");
        MensajeComputadora.textContent="Ganaste!!";
    }
    else if (puntosComputadora==puntosJugador)
    {        
        if(puntosJugador==21 && mazoJugador.length==2 && mazoComputadora.length>2){
            MensajeComputadora.classList.add("ganar");
            MensajeComputadora.textContent="Ganaste!!";
        }
        else if (puntosJugador==21 && mazoJugador.length!=2 && mazoComputadora.length==2){
            MensajeComputadora.classList.add("perder");
            MensajeComputadora.textContent="BlackJack - Perdiste!!";
        }
        else{
            MensajeComputadora.classList.add("perder");
            MensajeComputadora.textContent="Empate!!";
        }
    }
    else
    {
        MensajeComputadora.classList.add("perder");
        MensajeComputadora.textContent="Perdiste!!";
    }
}

BotonPlantarse.setAttribute("disabled","true");
crearMazo();

return {nuevoJuego, turnoComputadora, pedirCarta}
})();


