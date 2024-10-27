//Store the gameboard as an array inside of a Gameboard object. Players are going to be stored in objects.
//The main goal is to store as little global code as possible. 
//Think carefully about where each of logic should reside. Each little piece of functionality should be able to fit in the game, player, or gameboard objects.
//wrap gameboard, displaycontroller inside an IIFE.
//Tic tac toe is a board with 3 columns and 3 rows.
//X goes first, regardless of the player.
//Anytime a marker is placed, it should check whether that space in the object array to be empty.
//Whenever a marker is placed successfully, the board is updated to reflect the newly placed marker.
//The active player is switched, and so is the marker. The logic repeats until 3 contigious markers is found.
//if three contigious markers are found, the player with those markers is declared the winner, and the gameboard is reset with empty spaces.
//The logic repeats.

//Check to see if there are 3 consecutive markers
//Winning patterns :
//[0,1,2],[3,4,5],[7,8,9]
//[0,3,7],[1,4,8],[2,5,9]
//[0,4,9],[7,4,2]

function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    let rowIndex;
    let colIndex;

    const createBoard = () => {
        for(rowIndex = 0; rowIndex < rows; rowIndex++){
            board[rowIndex] = []
            for(colIndex = 0; colIndex < columns; colIndex++){
                board[rowIndex].push(Cell());
            }
        }
    }
    const getBoard = () => board;

    function checkBoard(row, col, player) {
        const check = board[row][col].getValue();
        if(check == 'x' || check == 'o'){
            return false;
        }else{
            placeMarker(row, col, player);
        }
    }

    function placeMarker(row, col, player){
        board[row][col].addMarker(player);
    }
  
    const logBoard = () => {
        const boardVals = board.map((space) => space.map((cell) => cell.getValue()))
        console.log(boardVals);
    }
    const clearBoard = () => {
        createBoard();
    }
    return {
        createBoard,
        getBoard,
        checkBoard,
        placeMarker,
        logBoard,
        clearBoard,
    }
}
function Cell() {
    let value = '';
    const addMarker = (player) => {
      value = player;
    };
    const getValue = () => value;

    return {
        addMarker,
        getValue
    }
}
function Player(name, marker){
    const players = [{name, marker}];
    const getName = () => name;
    const getMarker = () => marker;

    return {
        getName,
        getMarker
    };
}
function GameController(){
    const board = Gameboard();
    const playerOne = Player('Jay', 'x');  
    const playerTwo = Player('Franc', 'o');
    let activePlayer = playerOne;

    board.createBoard();
    const resetPlayer = () => {
        activePlayer = playerOne;
    }
    const switchPlayer = () => {
        activePlayer = activePlayer == playerOne? playerTwo : playerOne;
    }
    const getActivePlayer = () => activePlayer;
  
    const playRound = (row, col) => {
        const boardChecker = board.checkBoard(row, col, getActivePlayer().getMarker());
        if(boardChecker == false){
            console.log('invalid move!')
            switchPlayer();
        }
        // board.logBoard();
        switchPlayer();
  
        // checkWinner();
    }
    const checkWinner = () => {
        //Winning conditions
        const array = [
         // horizontal win conditions
         [0][0],[0][1],[0][2]
         [1][0],[1][1],[1][2] 
         [2][0],[2][1],[2][2]
         //vertical win conditions
         [0][0],[1][0],[2][0]
         [0][1],[1][1],[2][1]
         [0][2],[1][2],[2][2]
         //diagnol win conditions
         [0][0],[1][1],[2][2]
         [0][2],[1][1],[2][0]
        ]
    [['jay']['franc']] = array;
    }
    return {
        getActivePlayer, 
        getBoard : board.getBoard,
        playRound, 
        switchPlayer, 
        logBoard: board.logBoard,
        clearBoard : board.clearBoard,
        resetPlayer,
    }
}

function DisplayController(){
    const game = GameController();     
    const boardDiv = document.querySelector('.board');    
    const resetBtn = document.querySelector('.reset-btn');   
  
    const updateScreen = () => {
        boardDiv.textContent = '';
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer().getName();
       
        console.log(`${activePlayer}'s turn`)

        let i;
        let j;

        for( i = 0; i < board.length; i++){
            for( j = 0; j < board[i].length; j++) {
                cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.textContent = board[i][j].getValue();
                cellButton.dataset.column = j;
                cellButton.dataset.row = i;
                boardDiv.appendChild(cellButton);
            }
        } 
    }
    function clickHandlerBoard(e){
        const selectedColumn = e.target.dataset.column;
        const selectedRow = e.target.dataset.row;

        if(!selectedRow || !selectedColumn){
            return;
        }
        game.playRound(selectedRow, selectedColumn);
        updateScreen();
    }

    function buttonHandler(e){
        game.clearBoard();
        game.resetPlayer();
        updateScreen();
    }
    resetBtn.addEventListener("click", buttonHandler);
    boardDiv.addEventListener("click", clickHandlerBoard)
  
    updateScreen(); 
} 
DisplayController();


        // //if statement hell

        // if(boardVals[0][0] && boardVals[0][1] && boardVals[0][2] === 'x'){
        //     console.log('win');
        // }
        //     boardVals[1][0] && boardVals[1][1] && boardVals[1][2] ||
        //     boardVals[2][0] && boardVals[2][1] && boardVals[2][2] ||

        //     boardVals[0][0] && boardVals[1][0] && boardVals[2][0] ||
        //     boardVals[0][1] && boardVals[1][1] && boardVals[2][1] ||
        //     boardVals[0][2] && boardVals[1][2] && boardVals[2][2] ||

        //     boardVals[0][0] && boardVals[1][1] && boardVals[2][2] ||
        //     boardVals[0][2] && boardVals[1][1] && boardVals[2][0]  
        // ){
        //     console.log('win');
        // }
        // else if(
        //     boardVals[0][0] && boardVals[0][1] && boardVals[0][2] ||
        //     boardVals[1][0] && boardVals[1][1] && boardVals[1][2] ||
        //     boardVals[2][0] && boardVals[2][1] && boardVals[2][2] ||

        //     boardVals[0][0] && boardVals[1][0] && boardVals[2][0] ||
        //     boardVals[0][1] && boardVals[1][1] && boardVals[2][1] ||
        //     boardVals[0][2] && boardVals[1][2] && boardVals[2][2] ||

        //     boardVals[0][0] && boardVals[1][1] && boardVals[2][2] ||
        //     boardVals[0][2] && boardVals[1][1] && boardVals[2][0]  === 'o'  
        // ){
        //     console.log('win')