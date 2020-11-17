const boardTiles = document.querySelectorAll('.boardTile')
const boardTokens = document.querySelectorAll('.boardToken')

const gameBoard = (() => {
    board: [[1, 2, 3], 
            [4, 5, 6], 
            [7, 8, 9]]

    //init game
    //sets up listeners
    
})()

const PlayerData = (() => {
    const Player = (name, token) => {
        let selections = [];
    
        return {name, selections, token}
    }
    
    const playerOne = Player('Elias', 'X');
    const playerTwo = Player('David', 'O');

    let currentPlayer = playerOne;

    return {
        playerOne,
        playerTwo,
        currentPlayer
    }
})()


//gets initialized in gameboard setup?
boardTiles.forEach((tile) => {
    function tokenPlacement() {
        let boardToken = tile.querySelector('.boardToken');
        let selection = tile.id;
    
        PlayerData.currentPlayer === PlayerData.playerOne ? PlayerData.currentPlayer = PlayerData.playerTwo : PlayerData.currentPlayer = PlayerData.playerOne;
    
        PlayerData.currentPlayer.selections.push(Number(selection))
        boardToken.innerHTML = PlayerData.currentPlayer.token;
        checkWinner(PlayerData.currentPlayer.selections);
    }

    function onetime(node, type) {
        // create event
        node.addEventListener('click', function(e) {
            // remove event
            e.target.removeEventListener(e.type, tokenPlacement);
        });
    }

    tile.addEventListener('click', tokenPlacement);

    onetime(tile, 'click');
})



//things that need to be modulized
function arrayEquals(a, b) {
  return Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index]);
}

function checkWinner() {
    const winningCombos = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ]

    
    winningCombos.forEach((combo) => {
        let currentSetup = PlayerData.currentPlayer.selections.sort();

        if(arrayEquals(combo, currentSetup)) {
            alert(`Congrats ${PlayerData.currentPlayer.name} you win!`)
        }
        else {
            console.log('not so well')
        }
    });
}