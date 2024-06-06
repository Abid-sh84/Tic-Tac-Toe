document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const statusText = document.getElementById('status');
    const restartButton = document.getElementById('restart');
    
    let currentPlayer = 'X';
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let isGameActive = true;
    
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    const handleCellClick = (e) => {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
        
        if (boardState[clickedCellIndex] !== '' || !isGameActive) {
            return;
        }
        
        boardState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        checkResult();
    };
    
    const checkResult = () => {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = boardState[winCondition[0]];
            let b = boardState[winCondition[1]];
            let c = boardState[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }
        
        if (roundWon) {
            statusText.textContent = `${currentPlayer} wins!`;
            isGameActive = false;
            return;
        }
        
        let roundDraw = !boardState.includes('');
        if (roundDraw) {
            statusText.textContent = 'Draw!';
            isGameActive = false;
            return;
        }
        
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `It's ${currentPlayer}'s turn`;
    };
    
    const restartGame = () => {
        currentPlayer = 'X';
        boardState = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        statusText.textContent = `It's ${currentPlayer}'s turn`;
        cells.forEach(cell => cell.textContent = '');
    };
    
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);
    
    statusText.textContent = `It's ${currentPlayer}'s turn`;
});
