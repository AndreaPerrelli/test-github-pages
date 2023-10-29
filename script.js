const boardElement = document.querySelector('.board');
const game = new Chess(); // Crea una nuova partita con chess.js
let selectedSquare = null;

function renderBoard() {
    boardElement.innerHTML = ''; // Pulisci la scacchiera

    const squares = game.fen().split(' ')[0].split('/').reverse().join('/').split('/').map(row => row.split(''));

    squares.forEach((row, rowIndex) => {
        row.forEach((piece, colIndex) => {
            const square = document.createElement('div');
            square.classList.add('square');
            if ((rowIndex + colIndex) % 2 === 0) {
                square.classList.add('white');
            } else {
                square.classList.add('black');
            }
            if (piece !== '-') {
                const pieceElement = document.createElement('div');
                pieceElement.classList.add('piece');
                pieceElement.textContent = pieces[piece];
                square.appendChild(pieceElement);
            }
            square.dataset.square = String.fromCharCode(97 + colIndex) + (8 - rowIndex); // ad es. "e2"
            boardElement.appendChild(square);
        });
    });
}

boardElement.addEventListener('click', e => {
    const clickedSquare = e.target.closest('.square').dataset.square;
    const clickedPiece = game.get(clickedSquare);

    if (selectedSquare) {
        // Prova a muovere il pezzo
        const move = game.move({ from: selectedSquare, to: clickedSquare });

        if (move) {
            renderBoard(); // Aggiorna la scacchiera se la mossa è valida
        }

        selectedSquare = null;
    } else if (clickedPiece) {
        selectedSquare = clickedSquare; // Seleziona il pezzo se è valido
    }
});

renderBoard(); // Inizializza la scacchiera
