const PlayerFactory = (name, symbol) => {
  return { name, symbol };
};

const gameBoard = (() => {
  // Private
  let _gameBoardArray = ["", "", "", "", "", "", "", "", ""];
  let _winner = null;

  // Public
  const reset = () => {
    _gameBoardArray = ["", "", "", "", "", "", "", "", ""];
    _winner = null;
  };

  const insertAt = (index, symbol) => {
    _gameBoardArray[index] = symbol;
  };

  const getGameBoardArray = () => _gameBoardArray;
  const getWinner = () => _winner;

  const isGameOver = () => {
    winnerInColumnOne =
      _gameBoardArray[0] != "" &&
      _gameBoardArray[0] == _gameBoardArray[3] &&
      _gameBoardArray[0] == _gameBoardArray[6];

    winnerInColumnTwo =
      _gameBoardArray[1] != "" &&
      _gameBoardArray[1] == _gameBoardArray[4] &&
      _gameBoardArray[1] == _gameBoardArray[7];

    winnerInColumnThree =
      _gameBoardArray[2] != "" &&
      _gameBoardArray[2] == _gameBoardArray[5] &&
      _gameBoardArray[2] == _gameBoardArray[8];

    winnerInRowOne =
      _gameBoardArray[0] != "" &&
      _gameBoardArray[0] == _gameBoardArray[1] &&
      _gameBoardArray[0] == _gameBoardArray[2];

    winnerInRowTwo =
      _gameBoardArray[3] != "" &&
      _gameBoardArray[3] == _gameBoardArray[4] &&
      _gameBoardArray[3] == _gameBoardArray[5];

    winnerInRowThree =
      _gameBoardArray[6] != "" &&
      _gameBoardArray[6] == _gameBoardArray[7] &&
      _gameBoardArray[6] == _gameBoardArray[8];

    winnerInDiagonalTopLeft =
      _gameBoardArray[0] != "" &&
      _gameBoardArray[0] == _gameBoardArray[4] &&
      _gameBoardArray[0] == _gameBoardArray[8];

    winnerInDiagonalTopRight =
      _gameBoardArray[2] != "" &&
      _gameBoardArray[2] == _gameBoardArray[4] &&
      _gameBoardArray[2] == _gameBoardArray[6];

    isGameTied = _gameBoardArray.every((element) => element != "");

    if (winnerInColumnOne || winnerInRowOne || winnerInDiagonalTopLeft) {
      _winner = _gameBoardArray[0];
      return true;
    } else if (winnerInColumnTwo) {
      _winner = _gameBoardArray[1];
      return true;
    } else if (winnerInColumnThree || winnerInDiagonalTopRight) {
      _winner = _gameBoardArray[2];
      return true;
    } else if (winnerInRowTwo) {
      _winner = _gameBoardArray[3];
      return true;
    } else if (winnerInRowThree) {
      _winner = _gameBoardArray[6];
      return true;
    } else if (isGameTied) {
      _winner = "tie";
      return true;
    } else {
      return false;
    }
  };

  // Return Module
  return { reset, insertAt, getWinner, isGameOver, getGameBoardArray };
})();

const displayController = (() => {
  // Private
  const _playerOne = PlayerFactory("Player One", "x");
  const _playerTwo = PlayerFactory("Player Two", "o");
  let _currentPlayer = null;

  const _DOMGrid = document.querySelectorAll("[data-index]");

  const _addClickListenerToGrid = () => {
    _DOMGrid.forEach((gridItem) => {
      gridItem.addEventListener("click", _gridClickHandler);
    });
  };

  const _removeClickListenerFromGrid = () => {
    _DOMGrid.forEach((gridItem) => {
      gridItem.removeEventListener("click", _gridClickHandler);
    });
  };

  const _nextTurn = () => {
    _currentPlayer = _currentPlayer === _playerOne ? _playerTwo : _playerOne;
  };

  const _gridClickHandler = (e) => {
    const gridIndex = Number(e.target.dataset.index);
    // Only allow to be clicked if that slot is empty
    if (e.target.innerText != "") return;

    gameBoard.insertAt(gridIndex, _currentPlayer.symbol);
    console.log(gameBoard.isGameOver());
    renderGameBoard();
    _nextTurn();
  };

  // Public
  const renderGameBoard = () => {
    const gameBoardArray = gameBoard.getGameBoardArray();

    _DOMGrid.forEach((gridItem, index) => {
      gridItem.textContent = gameBoardArray[index];
    });
  };

  const startGame = () => { 
    _currentPlayer = _playerOne;
  };

  startGame();
  _addClickListenerToGrid();

  // Return Module
  return { renderGameBoard, startGame, _removeClickListenerFromGrid };
})();
