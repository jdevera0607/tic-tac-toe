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

    const placeMarker = (col, row, player) => {
        if(board[col][row] == val){
            board[col][row] = player;
        }else{
           console.log('invalid move');
           const re = GameController();
           re.switchPlayer();
        }
        return board;
    }

    const logBoard = () => {
        console.log(board);
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

    const playRound = (col, row) => {
        board.placeMarker(col, row, getActivePlayer().getMarker())

        getActivePlayer();
        switchPlayer();
    }
        
    return {getActivePlayer, getBoard : board.getBoard, playRound, switchPlayer, logBoard: board.logBoard}
    
}

function DisplayController(){

}
const game = GameController();
game.playRound(0, 1)
game.playRound(0, 0)
game.logBoard();
game.playRound(0, 1)
game.playRound(0, 2)
game.logBoard();

