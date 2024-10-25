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
            switchPlayer();
        }
    };

    const getCurrentPlayer = () => currentPlayer;

    return { makeMove, getCurrentPlayer };
})();
