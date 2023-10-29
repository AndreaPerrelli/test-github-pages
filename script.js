// Importa la libreria Chess.js
const Chess = require('chess.js');

// Crea una nuova istanza del gioco di scacchi
const game = new Chess();

// Funzione per creare la scacchiera
function creaScacchiera() {
    const scacchiera = document.querySelector('.scacchiera');
    
    for (let fila = 0; fila < 8; fila++) {
        for (let colonna = 0; colonna < 8; colonna++) {
            const casella = document.createElement('div');
            casella.classList.add((fila + colonna) % 2 === 0 ? 'bianco' : 'nero');
            casella.dataset.fila = fila;
            casella.dataset.colonna = colonna;
            casella.addEventListener('click', gestisciClic);
            scacchiera.appendChild(casella);
        }
    }
}

// Funzione per gestire il clic su una casella
function gestisciClic(event) {
    const fila = parseInt(event.target.dataset.fila);
    const colonna = parseInt(event.target.dataset.colonna);
    const posizione = `${String.fromCharCode(97 + colonna)}${8 - fila}`;
    
    // Esempio: muovi una pedina
    const mossa = game.move({
        from: 'e2',
        to: posizione,
        promotion: 'q', // Specifica la promozione (es. regina)
    });
    
    // Aggiorna la scacchiera
    aggiornaScacchiera();
    
    // Verifica se la partita è finita
    if (game.game_over()) {
        alert('La partita è finita!');
    }
}

// Funzione per aggiornare la scacchiera sulla base dello stato di gioco
function aggiornaScacchiera() {
    const scacchiera = document.querySelector('.scacchiera');
    const caselle = scacchiera.querySelectorAll('div');
    
    caselle.forEach(casella => {
        const fila = parseInt(casella.dataset.fila);
        const colonna = parseInt(casella.dataset.colonna);
        const posizione = `${String.fromCharCode(97 + colonna)}${8 - fila}`;
        const pezzo = game.get(posizione);
        
        if (pezzo === null) {
            casella.textContent = '';
        } else {
            casella.textContent = pezzo.type;
        }
    });
}

// Inizializza la scacchiera
creaScacchiera();
aggiornaScacchiera();
