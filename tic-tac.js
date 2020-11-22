const boardTiles = document.querySelectorAll('.boardTile')
const boardTokens = document.querySelectorAll('.boardToken')
const resetButton = document.querySelector('#resetButton')
const turnText = document.querySelector('#turnText')
const editNames = document.querySelector('#editNames')

const PlayerData = (() => {
    const Player = (name, token) => {
        let selections = [];
    
        return {name, selections, token}
    }
    
    const playerOne = Player('Player 1', 'X');
    const playerTwo = Player('Player 2', 'O');

    let currentPlayer = playerOne;
    
    return {
        playerOne,
        playerTwo,
        currentPlayer,
    }
})()

const gameSetup = (() => {
    
    function togglePlayer() {
        PlayerData.currentPlayer === PlayerData.playerOne ? PlayerData.currentPlayer = PlayerData.playerTwo : PlayerData.currentPlayer = PlayerData.playerOne;
        turnText.innerHTML = `It's ${PlayerData.currentPlayer.name}'s turn`;
    }

    function init() {
        
        turnText.innerHTML = `It's ${PlayerData.currentPlayer.name}'s turn`;
        
        //Adds event listeners to board tiles
            boardTiles.forEach((tile) => {
                function tokenPlacement() {
                    let boardToken = tile.querySelector('.boardToken');
                    let selection = tile.id;
                            
                    boardToken.innerHTML = PlayerData.currentPlayer.token;
                    PlayerData.currentPlayer.selections.push(Number(selection));
                    checkWinner(PlayerData.currentPlayer.selections);
                }
        
        //Prevents click events on tiles from happening more than once
            function onetime(node, type) {
                node.addEventListener('click', function(e) {
                    e.target.removeEventListener(e.type, tokenPlacement);
                    e.target.removeEventListener(e.type, togglePlayer);
                });
            }

            tile.addEventListener('click', tokenPlacement);
            tile.addEventListener('click', togglePlayer);
        
            onetime(tile, 'click');
        })
    }
    
    //Returns true if any combo of player selections array matches a winning combo
    function arrayEquals(a, b) {
        return Array.isArray(a) && 
        Array.isArray(b) && 
        a.every(item => b.indexOf(item) !== -1);
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
    
    //Announces winner
        winningCombos.forEach((combo) => {
            let currentSetup = PlayerData.currentPlayer.selections.sort();
    
            if(arrayEquals(combo, currentSetup)) {
                console.log(`Congrats ${PlayerData.currentPlayer.name} you win!`)
                alert(`Congrats ${PlayerData.currentPlayer.name} you win!`);
                reset();
            }
            else if(PlayerData.playerOne.selections.length === 5){
                alert(`It's a tie, you both lose!`);
                reset();
            }
            else {
                console.log('good good')
            }
        });
    }

    function reset() {
        window.location.reload();
    }

    function editName() {
        let newNameOne = prompt("What's the first player's name?");
        let newNameTwo = prompt("What's the second player's name?");
    
        PlayerData.playerOne.name = newNameOne;
        PlayerData.playerTwo.name = newNameTwo;
        turnText.innerHTML = `It's ${PlayerData.currentPlayer.name}'s turn`;
    }
    
    editNames.addEventListener('click', editName);
    resetButton.addEventListener('click', reset)
    init();

    return {
        checkWinner,
        arrayEquals,
        init,
        togglePlayer,
        reset,
        editName
    }
})();