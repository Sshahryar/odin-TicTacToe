const Gameboard = (function() {
    const board = ['', '', '', '', '', '', '', '', ''];
    const getBoard = () => board;
    const setField = (index, value) => { board[index] = value; };
    const reset = () => { board.fill(''); };
    return { getBoard, setField, reset };
})();

const Player = (name, marker) => {
    return { name, marker };
};

const GameController = (function() {
    const playerX = Player('Player X', 'X');
    const playerO = Player('Player O', 'O');
    let currentPlayer = playerX;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
    };

    const makeMove = (index) => {
        if (Gameboard.getBoard()[index] === '') {
            Gameboard.setField(index, currentPlayer.marker);
            document.querySelector(`[data-index="${index}"]`).textContent = currentPlayer.marker;
            if (checkWinner()) {
                document.getElementById('message').textContent = `${currentPlayer.name} wins!`;
            } else if (checkTie()) {
                document.getElementById('message').textContent = "It's a tie!";
            } else {
                switchPlayer();
                document.getElementById('message').textContent = `${currentPlayer.name}'s turn`;
            }
        }
    };

    const checkWinner = () => {
        const board = Gameboard.getBoard();
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    };

    const checkTie = () => {
        return Gameboard.getBoard().every(cell => cell !== '');
    };

    const resetGame = () => {
        currentPlayer = playerX;
        Gameboard.reset();
        document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
        document.getElementById('message').textContent = "Player X's turn";
    };

    return { makeMove, resetGame };
})();

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');
        GameController.makeMove(index);
    });
});

document.getElementById('reset').addEventListener('click', () => {
    GameController.resetGame();
});

