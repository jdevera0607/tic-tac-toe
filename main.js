//Store the gameboard as an array inside of a Gameboard object. Players are going to be stored in objects.
//The main goal is to store as little global code as possible. 
//Think carefully about where each of logic should reside. Each little piece of functionality should be able to fit in the game, player, or gameboard objects.
//wrap gameboard, displaycontroller inside an IIFE.
//Logic 1 

function Gameboard(){
    const rows = 3;                                                        
    const columns = 3;
    const board = [];

    for(let i = 0; i < rows; i++){                                          //For loop logic to create rows and columns of the tic-tac-toe gameboard
        board[i] = [];
        for(let j = 0; j < columns; j++){
            board[i].push(Cell());                                          //Calls Cell factory function to push the key value of the elements returned by Cell.
        }
    }   
    
    const placeMarker = () => {
        player = Player();
        board[0][0] = player.marker;
    }
    console.log(board);
  return {board}
}

function Cell() {
    let space = '';

    return{ space };
}
function Player() {
    playerOne = 'Jay';
    playerTwo = 'Franc';

    const players = [
        {
            name: playerOne,
            marker: 'X',
        },
        {
            name:playerTwo,
            marker: 'O',
        }
    ]
    return {players}
}

function GameController(){

}

const board = Gameboard();

