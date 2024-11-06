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
    const board = [];

    const getRows = () => 3;
    const getCols = () => 3;
    

    let rowIndex;
    let colIndex;
    const createBoard = () => {
        const rows = getRows();
        const columns = getCols();

        for(rowIndex = 0; rowIndex < rows; rowIndex++){
            board[rowIndex] = []
            for(colIndex = 0; colIndex < columns; colIndex++){
                board[rowIndex].push(Cell());
            }
        }
    }
    const getBoard = () => board;

    function checkBoard(row, col, player) {
        const cell = board[row][col].getValue();
        if(cell === 'x' || cell === 'o'){
            return false;
        }else{
            placeMarker(row, col, player);
        }
    }

    function placeMarker(row, col, player){
        board[row][col].addMarker(player);
    }
  
    const mapBoard = () => {
        const boardVals = board.map((space) => space.map((cell) => cell.getValue()))
        return boardVals;
        //console.log(boardVals); - logs the board values for testing purposes
    }
    const clearBoard = () => {
        createBoard();
    }
    return {
        getCols,
        getRows,
        createBoard,
        getBoard,
        checkBoard,
        placeMarker,
        mapBoard,
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

const formCreation = (function() {
    const players = [];
    const getPlayers = () => players;
    const newPlayerForm = () => {

        const form = document.createElement('form');
        form.id = 'playerNames'
        document.body.appendChild(form);
    
        const playerOne = document.createElement('input')
        playerOne.type = 'text';
        playerOne.name = 'playerOne';
        playerOne.placeholder = 'John';
        form.appendChild(playerOne);
    
        const playerTwo = document.createElement('input')
        playerTwo.type = 'text';
        playerTwo.name = 'playerTwo';
        playerTwo.placeholder = 'Jane';
        form.appendChild(playerTwo);
    
        const button = document.createElement('button');
        button.type = 'submit';
        button.textContent = 'Start!'
        form.appendChild(button);

        button.addEventListener("click", (e) => {
            e.preventDefault();
            form.classList.add("hide")
            const formData = new FormData(form);
            const playerOneName = formData.get('playerOne');
            const playerTwoName = formData.get('playerTwo');
            if(playerOneName === '' && playerTwoName === ''){
                alert('Please insert names for players!')
            }else if(playerOneName === ''){
                alert('Player One has no name!');
            }else if(playerTwoName === ''){
                alert('Player Two has no name!');
            }
            else{
                players.push(playerOneName, playerTwoName);
                DisplayController();
            }
        })
    }
    newPlayerForm();
    return {
        getPlayers,
    }
})();
function Player(name, marker){
    const getName = () => name;
    const getMarker = () => marker;
  
     return {
        getName,
        getMarker
     };
}
function GameController(){
    const board = Gameboard();
    const players = (formCreation.getPlayers());

    const playerOne = Player(players[0], 'x');
    const playerTwo = Player(players[1], 'o');

    let activePlayer = playerOne;
    let winner = null;

    board.createBoard();
    const resetPlayer = () => {
        activePlayer = playerOne;
    }
    const switchPlayer = () => {
        activePlayer = activePlayer == playerOne? playerTwo : playerOne;
    }
    const getActivePlayer = () => activePlayer;
  
    const playRound = (row, col) => {
        let playerOneWins = 0;
        let playerTwoWins = 0;

        activePlayer = getActivePlayer();
        const boardChecker = board.checkBoard(row, col, activePlayer.getMarker());
        if(boardChecker == false){
            console.log('invalid move!')
            switchPlayer();                         //forces player to switch to ensure that a player that makes an invalid move still has a turn.
        }
        board.mapBoard();
        switchPlayer();
        let marker = activePlayer.getMarker();
        const roundCheck = checkWinner(row, col);
        if(roundCheck === playerOne){
            playerOneWins++
            return {playerOneWins, roundCheck};
        }
        if(roundCheck === playerTwo){
            playerTwoWins++;
            return {playerTwoWins, roundCheck};
        }
    }
    const checkWinner = (row, col) => {
        const boardVals = board.mapBoard();
        const cols = board.getCols();
        const rows = board.getRows();

        let countX = 0;
        let countO = 0;

        for(let c = 0; c < cols; c++){      //Horizontal check using counter
            if(boardVals[row][c]  === 'x'){
                countX++
            }
            
            else if(boardVals[row][c] === 'o'){
                countO++;
            }else{
                countX = 0;
                countO = 0;
            }
            if(countX === 3){
                console.log('Player One Wins!')
                winner = playerOne;
                return winner;
            } 
            else if(countO === 3){
                console.log('Player Two Wins!')
                winner = playerTwo;
                return winner;
            }
        } 
        countX = 0;
        countO = 0;
        for(let r = 0; r < rows; r++){
            if(boardVals[r][col] === 'x'){      //Vertical check using counter
                countX++;
            }else if(boardVals[r][col] === 'o'){
                countO++;
            }else {
                countX = 0;
                countO = 0;
            }
            if(countX === 3){
                console.log('Player One Wins!')
                winner = playerOne;
                return winner;
            }
            else if(countO === 3){
                console.log('Player Two Wins!')
                winner = playerTwo;
                return winner;
            } 
            
        }
        countX = 0;
        countO = 0;
        for(let r = 0; r < rows; r++){
            let c = row + col - r;
            if(c >= 0 && c < cols && boardVals[r][c] === 'x'){
                countX++;
            }else if(c >= 0 && c < cols && boardVals[r][c] === 'o'){
                countO++;
            }else {
                countX = 0;
                countO = 0;
            }
            if(countX === 3){
                console.log('Player One Wins!')
                winner = playerOne;
                return winner;
            } 
            else if(countO === 3){
                console.log('Player Two Wins!')
                winner = playerTwo;
                return winner;
            }
        }
        for(let r = 0; r < rows; r++){
            let c = col - row + r;
            if(c >= 0 && c < cols && boardVals[r][c] === 'x'){
                countX++;
            }else if(c >= 0 && c < cols && boardVals[r][c] === 'o'){
                countO++;
            }else {
                countX = 0;
                countO = 0;
            }
            if(countX === 3){
                console.log('Player One Wins!')
                winner = playerOne;
                return winner;
            } 
            else if(countO === 3){
                console.log('Player Two Wins!')
                winner = playerTwo;
                return winner;
            }
        }
       return false;
    }
    return {
        getActivePlayer, 
        getBoard : board.getBoard,
        playRound, 
        switchPlayer, 
        mapBoard: board.mapBoard,
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
        const winDisplay = game.playRound(selectedRow, selectedColumn);
        displayWinner(winDisplay);
        updateScreen();
    }
    function displayWinner(winner){
        console.log(winner.roundCheck)
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