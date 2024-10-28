const Gameboard = (function() {
    const board = ['', '', '', '', '', '', '', '', ''];

    const getBoard = () => board;
    const setField = (index, value) => { board[index] = value; };
    return { getBoard, setField };
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
            if (checkWinner()) {
                console.log(`${currentPlayer.name} wins!`);
            } else if (checkTie()) {
                console.log("It's a tie!");
            } else {
                switchPlayer();
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

    const getCurrentPlayer = () => currentPlayer;
    return { makeMove, getCurrentPlayer };
})();

//Sample test game
GameController.makeMove(0);
GameController.makeMove(1);
GameController.makeMove(4);
GameController.makeMove(2);
GameController.makeMove(8);


