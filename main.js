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
    let val = '';

    let rowIndex;
    let colIndex;

    for(rowIndex = 0; rowIndex < rows; rowIndex++){
        board[rowIndex] = []
        for(colIndex = 0; colIndex < columns; colIndex++){
            board[rowIndex][colIndex] = val;
        }
    }
    const getBoard = () => board;

    function placeMarker(col, row, player) {
        board[col][row] == val
        board[col][row] = player;
        return board;
        
    }

    const logBoard = () => {
        board.map(function(space, index){
            console.log(space);
        })
        
    }
    return {getBoard, placeMarker, logBoard}
}

function Player(name, marker){
    const players = [{name, marker}];
    const getName = () => name;
    const getMarker = () => marker;

    return {getName, getMarker};
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
    let previousVals = {};

    const playRound = (row, col) => {
    previousVals = [row, col];

        for(const val in previousVals){
            if(previousVals = [row, col]){                                      
        //TODO : Create a new private function to check the previous vals then pass the col, row variables to the playRound() from the new function
                return
            }
        }
 
        board.placeMarker(row, col, activePlayer.getMarker())
        switchPlayer();
        // console.log(previousVals)
        // board.logBoard();
    }
    
    playRound(1, 1);
    playRound(1, 1);
    // playRound(1, 2);
    // playRound(2, 2);
    // playRound(0,0)
    return {getActivePlayer, getBoard : board.getBoard, playRound, switchPlayer, logBoard: board.logBoard}
}

function DisplayController(){
    const game = GameController();     
    const boardDiv = document.createElement("board");        

    const updateScreen = () => {
        boardDiv.textContent = 'Yes'
    }

    //Check connectfour skeleton and understand how to render the data into the document

} 
DisplayController();

