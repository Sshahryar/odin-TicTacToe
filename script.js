const Gameboard = (function() {
    const board = ['', '', '', '', '', '', '', '', ''];
    
    const getBoard = () => board;
    const setField = (index, value) => { board[index] = value; };

    return { getBoard, setField };
})();

const Player = (name, marker) => {
    return { name, marker };
};
