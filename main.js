//Store the gameboard as an array inside of a Gameboard object. Players are going to be stored in objects.
//The main goal is to store as little global code as possible. 
//Think carefully about where each of logic should reside. Each little piece of functionality should be able to fit in the game, player, or gameboard objects.
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
        // console.log(boardVals); for testing purposes only, logs the board array and shows the 2d and its markers
        return boardVals;
    }
    return {
        getCols,
        getRows,
        createBoard,
        getBoard,
        checkBoard,
        placeMarker,
        mapBoard,
    }
}
function Cell() {
    let value = '';
    const addMarker = (player) => {
      value = player;
    }
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
    
        const submitBtn = document.createElement('button');
        submitBtn.type = 'submit';
        submitBtn.textContent = 'Start!'
        form.appendChild(submitBtn);

        submitBtn.addEventListener("click", (e) => {
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
                players.push(playerOneName, playerTwoName);    //Push the form-created players to an array to destructure later
                const display = DisplayController()
                display.createScoreBoard();
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
    const players = (formCreation.getPlayers());
    const playerOne = Player(players[0], 'x');
    const playerTwo = Player(players[1], 'o');
    const board = Gameboard();

    let winner = null;                             //winner is null until a winner is hoisted by the checkWinner function
    let playerOneWins = 0;
    let playerTwoWins = 0;
    let activePlayer = playerOne;

    board.createBoard();

    const getPlayerOneWins = () => playerOneWins;
    const getPlayerTwoWins = () => playerTwoWins;
    
    const resetPlayer = () => {
        activePlayer = playerOne;
    }
    const switchPlayer = () => {
        activePlayer = activePlayer == playerOne? playerTwo : playerOne;
    }
    const getActivePlayer = () => activePlayer;
  
    const playRound = (row, col) => {
        activePlayer = getActivePlayer();
        let marker = activePlayer.getMarker();
        const boardChecker = board.checkBoard(row, col, marker);

        if(boardChecker == false){
            console.log('invalid move!')
            switchPlayer();                         //Due to the way the player is switched anytime a move is initiated, it will switch the player. 
        }                                           //Switching the player here allows for the player that made an invalid move the current active player. 

        const checkWin = checkWinner(row, col)
            if(checkWin !== false){
                winner = checkWin;
                resetPlayer();
                return true;
            }
        switchPlayer();
        return false;
    }
    const returnWinner = () => {
        if(winner === playerOne){
            playerOneWins++;;
        }
        else if(winner === playerTwo){
            playerTwoWins++;
        }
        return winner.getName();
    }
    const checkWinner = (row, col) => {
        const boardVals = board.mapBoard();
        const cols = board.getCols();
        const rows = board.getRows();
    
        let countX = 0;
        let countO = 0;

        //Horizontal check using counter
        for(let c = 0; c < cols; c++){      
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
        //These countX and countO reset the counter to 0. If these are not present, the counter is incremented anytime a marker is placed, 
        //declaring a winner regardless of whether it is 3 contigious markers or not
        countX = 0;
        countO = 0;

        //Vertical check using counter
        for(let r = 0; r < rows; r++){
            if(boardVals[r][col] === 'x'){      
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

        //anti-diagonal check top right to bottom left
        for(let r = 0; r < rows; r++){
            let c = col - row + r;
            if(c >= 0 && c < cols && boardVals[r][c] === 'x'){
                countX++;
            }else if(c >= 0 && c < cols && boardVals[r][c] === 'o'){
                countO++;
            }else{
                countX = 0;
                countO = 0;
            }
            if(countX === 3){
                console.log('Player One Wins!');
                winner = playerOne;
                return winner;
            } else if(countO === 3){
                console.log('Player Two Wins!');
                winner = playerTwo;
                return winner;
            }
        }
        //anti-diagonal check bottom left to top right
        for(let r = 0; r < rows; r++){
            let c = col + row - r;
            if (c >= 0 && c < cols && boardVals[r][c] === 'x'){
                countX++;
            } else if(c >= 0 && c < cols && boardVals[r][c] === 'o'){
                countO++;
            }else{
                countX = 0;
                countO = 0;
            }
            if(countX === 3){
                console.log('Player One Wins!');
                winner = playerOne;
                return winner;
            } else if (countO === 3){
                console.log('Player Two Wins!');
                winner = playerTwo;
                return winner;
            }
        }
        //The two algorithms above are similar in function to the next algorithm to traverse the 2D array
        //However, because the traversal of top-right to bottom-left, and bottom-left to top-right are mirrored in traversal, i.e (top-right starting = (-1,1)) and (bottom-left starting = (1, -1)), it requires two formulas to check for values and count the inputs.
    
        //The algorithm below requires only one formula because traversal between top-left to bottom-right, and bottom-right to top-left are inverse and constants. i.e. (top-left to bottom-right starting = (1,1)), (bottom-right to top-left starting = (-1, -1))
        // Check bottom-left to top-right diagonal

        for(let r = 0; r < rows; r++){
            let c = row + col - r; 
            if(c >= 0 && c < cols && boardVals[r][c] === 'x'){
                countX++;
            }else if(c >= 0 && c < cols && boardVals[r][c] === 'o'){
                countO++;
            }else{
                countX = 0;
                countO = 0;
            }
            if(countX === 3){
                console.log('Player One Wins!');
                winner = playerOne;
                return winner;
            }else if (countO === 3){
                console.log('Player Two Wins!');
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
        createBoard : board.createBoard,
        resetPlayer,
        returnWinner,
        getPlayerOneWins,
        getPlayerTwoWins,
    }
}

function DisplayController(){
    const game = GameController();
    const boardDiv = document.querySelector('.board');

    const createScoreBoard = () => {
        const winCounterEl = document.querySelector('.win-counter');
        const winnerH2 = document.createElement('h2');
        winnerH2.classList.add('winnerh2');
        const p1Counter = document.createElement('h3');
        p1Counter.classList.add('p1counter');
        const p2Counter = document.createElement('h3');
        p2Counter.classList.add('p2counter');
        
        document.body.appendChild(winnerH2);
        winCounterEl.appendChild(p1Counter);
        winCounterEl.appendChild(p2Counter);
            
    }
    const displayWinner = () => {
        const winnerEl = document.querySelector('.winnerh2')
        const getp1El = document.querySelector('.p1counter');
        const getp2El = document.querySelector('.p2counter');

        const getWinner = game.returnWinner();
        let p2Wins = game.getPlayerTwoWins();
        let p1Wins = game.getPlayerOneWins();

        winnerEl.textContent = `The winner of this round is ${getWinner}`;
        getp1El.textContent = `Player One Wins: ${p1Wins}`;
        getp2El.textContent = `Player Two Wins: ${p2Wins}`;
        }
       

    const createDelButton = (function(){
        const resetBtn = document.createElement('button');
        resetBtn.classList.add('reset-Btn');
        resetBtn.textContent = 'Reset';

        document.body.appendChild(resetBtn);
        resetBtn.addEventListener("click", resetButton);
    })();
    const updateScreen = () => {
        boardDiv.textContent = '';
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer().getName();
        container.classList.remove('hide')
        console.log(`${activePlayer}'s turn`)

        let i;
        let j;

        for( i = 0; i < board.length; i++){
            for( j = 0; j < board[i].length; j++) {
                cellButton = document.createElement('button');
                cellButton.classList.add('cell');
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
        const roundStart = game.playRound(selectedRow, selectedColumn);

       if(roundStart === true){ 
        displayWinner();
       }
       updateScreen();
    }
    function resetButton(e){                                            
        game.createBoard();
        game.resetPlayer();
        updateScreen();
    }
    boardDiv.addEventListener("click", clickHandlerBoard)
    updateScreen();

    return {
        createScoreBoard
    }
} 
const container = document.querySelector('.container');
container.classList.add('hide');