const board = $('#setBoard')
const tile = $('.cell');
let winningCombo = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows win
    [1, 4, 7], [2, 5, 8], [3, 6, 9], // columns win
    [1, 5, 9], [3, 5, 7]              // diagonals win
];

let Player_1 = 'X';
let gameWon = false;

$('#start').on('click', restartGame);

for (let i = 0; i < tile.length; i++) {
    tile[i].addEventListener('click', () => {
        if (gameWon || tile[i].textContent !== '') {
            return;
        }

        tile[i].textContent = Player_1;
        const winnerCombo = whoWon(Player_1);
        if (winnerCombo) {
            gameWon = true;
            displayWinner(Player_1, winnerCombo);
            return;
        }

        if (aTie()) {
            $('#winMessage').text("Game is tied, no winner").show();
            return;
        }

        Player_1 = Player_1 === 'X' ? 'O' : 'X';
        $('#winMessage').text(`${Player_1}'s turn`).show();
    });
}

function whoWon(Player_1) {
    for (let i = 0; i < winningCombo.length; i++) {
        let [a, b, c] = winningCombo[i];
        if (tile[a - 1].textContent === Player_1 && tile[b - 1].textContent === Player_1 && tile[c - 1].textContent === Player_1) {
            return [a,b, c];
        }
    }
    return null;
}

function displayWinner(player, combo) {
    $('#winMessage').text(`${player} wins with ${combo.join(':')}`).show();
  
       // const winnerName = $('#winMessage').text(`${player} with a combo of ${combo} WINS`).show();
       
}


function aTie() {
    for (let i = 0; i < tile.length; i++) {
        if (tile[i].textContent === '') {
            return false;
        }
    }
    return true;
}

function restartGame() {
    for (let i = 0; i < tile.length; i++) {
        tile[i].textContent = "";
    }
    Player_1 = 'X';
    gameWon = false;
    $('#winMessage').text(`${Player_1}'s turn`).show();
}

$('#restart').on('click', restartGame);

