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

function Gameboard(){                                                     
    const rows = 3;                                                        
    const columns = 3;
    const board = [];

    for(let i = 0; i < rows; i++){                                          //For loop logic to create rows and columns of a 2D array to store objects.
        board[i] = [];
        for(let j = 0; j < columns; j++){
            board[i].push(Cell());                                          //Calls Cell factory function to push the key value of the elements returned by Cell.
        }
    }   
    const getBoard =  () => board;
   
    const placeMarker = (column, row, player) => {

        board[column][row].addMarker(player);
    }
    const printBoard = () => {
        const boardWithMarkers = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithMarkers)
    }
    return {getBoard, placeMarker, printBoard}
}

function Cell() {                                                           //pushes either empty cell or new cell depending on the player's turn.
    let value = '';                                                          
    const addMarker = (player) => {                                         
        value = player;
    }
    const getValue = () => value;

    return{ getValue, addMarker };
}
function GameController(  
    playerOne = 'Jay',
    playerTwo = 'Franc'
){  
    const board = Gameboard();                                             //Initializes the gameboard object to create and update the board.

    const players = [
        {
            name: playerOne,
            marker: 'X',
        },
        {
            name:playerTwo,
            marker: 'O',
        }
    ];
    let activePlayer = players[0];

    const switchPlayerTurn = () => {

        if(activePlayer === players[0]){
            activePlayer = players[1];
            return activePlayer;

        }else if(activePlayer === players[1]){
            activePlayer = players[0];
            return activePlayer;
        }
    }
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
    }
    const playRound = (column, row) => {
        board.placeMarker(column, row, getActivePlayer().marker)
        switchPlayerTurn();
        printNewRound();
    }
    playRound([0],[1]);
    playRound([2],[1]);
    playRound([0],[2]);
    playRound([1],[1]);
    switchPlayerTurn();
    printNewRound();
    return {getActivePlayer, playRound}
}

const game = GameController();

