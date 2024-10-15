//Store the gameboard as an array inside of a Gameboard object. Players are going to be stored in objects.
//The main goal is to store as little global code as possible. 
//Think carefully about where each of logic should reside. Each little piece of functionality should be able to fit in the game, player, or gameboard objects.
//wrap gameboard, displaycontroller inside an IIFE.
//Logic -- 
//Tic tac toe is a board with 3 columns and 3 rows.
//X goes first, regardless of the player.
//Anytime a marker is placed, it should check whether that space in the object array to be empty.
//Whenever a marker is placed successfully, the board is updated to reflect the newly placed marker.
//The active player is switched, and so is the marker. The logic repeats until 3 contigious markers is found.
//if three contigious markers are found, the player with those markers is declared the winner, and the gameboard is reset with empty spaces.
//The logic repeats.

function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    let rowIndex;
    let colIndex;

    for(rowIndex = 0; rowIndex < rows; rowIndex++){
        board[rowIndex] = []
        for(colIndex = 0; colIndex < columns; colIndex++){
            board[rowIndex].push(Cell());
        }
    }
    const getBoard = () => board;
    

    function placeMarker(row, col, player) {
        board[row][col].addMarker(player);
    }

    const logBoard = () => {
        board.map(function(space, index){
            console.log(space);
        })
        
    }
    return {getBoard,
         placeMarker,
          logBoard
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

    // console.log(activePlayer.getName());

    const switchPlayer = () => {
        activePlayer = activePlayer == playerOne? playerTwo : playerOne;
    }
    const getActivePlayer = () => activePlayer;

    // console.log(activePlayer.getName());
    // console.log(playerOne.getName());
  
    const playRound = (row, col) => {
    
        board.placeMarker(row, col, activePlayer.getMarker())
        board.logBoard();
        switchPlayer();
        
    }

    return {
        getActivePlayer, 
        getBoard : board.getBoard,
         playRound, 
         switchPlayer, 
         logBoard: board.logBoard
        }
}

function DisplayController(){
    const game = GameController();     
    const boardDiv = document.querySelector('.board');
    const previousData = [];        

    const updateScreen = () => {
        boardDiv.textContent = '';
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board[i].length; j++) {
                const cellButton = document.createElement("button");
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

        game.playRound(selectedRow, selectedColumn);
        updateScreen();
    }
    game.playRound(0, 2);
    game.playRound(1, 1);
    game.playRound(1, 2);
   
    boardDiv.addEventListener("click", clickHandlerBoard)
    updateScreen();
} 
DisplayController();

