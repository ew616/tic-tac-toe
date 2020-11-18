const boardTiles = document.querySelectorAll('.boardTile')
const boardTokens = document.querySelectorAll('.boardToken')
const resetButton = document.querySelector('#resetButton')

const PlayerData = (() => {
    const Player = (name, token) => {
        let selections = [];
    
        return {name, selections, token}
    }
    
    const playerOne = Player('Elias', 'X');
    const playerTwo = Player('David', 'O');

    let currentPlayer = playerTwo;
    
    return {
        playerOne,
        playerTwo,
        currentPlayer,
    }
})()

const gameSetup = (() => {
    
    function togglePlayer() {
        PlayerData.currentPlayer === PlayerData.playerOne ? PlayerData.currentPlayer = PlayerData.playerTwo : PlayerData.currentPlayer = PlayerData.playerOne;
    }

    function init() {

        //Adds event listeners to board tiles
            boardTiles.forEach((tile) => {
                function tokenPlacement() {
                    let boardToken = tile.querySelector('.boardToken');
                    let selection = tile.id;
                            
                    togglePlayer()

                    PlayerData.currentPlayer.selections.push(Number(selection))
                    boardToken.innerHTML = PlayerData.currentPlayer.token;
                    checkWinner(PlayerData.currentPlayer.selections);

                }
        
        //Prevents click events on tiles from happening more than once
            function onetime(node, type) {
                node.addEventListener('click', function(e) {
                    e.target.removeEventListener(e.type, tokenPlacement);
                });
            }
        
            tile.addEventListener('click', tokenPlacement);
        
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
                alert(`Congrats ${PlayerData.currentPlayer.name} you win!`)
            }
            else {
                console.log(`It's ${PlayerData.currentPlayer.name}'s turn`)
            }
        });
    }
    
    init();

    return {
        checkWinner,
        arrayEquals,
        init,
        togglePlayer
    }
})();

resetButton.addEventListener('click', () => {
    PlayerData.playerOne.selections = [];
    PlayerData.playerTwo.selections = [];

    boardTokens.forEach((token) => {
        token.innerHTML = '';
    })

    gameSetup.init();
    PlayerData.currentPlayer = PlayerData.playerTwo;

})