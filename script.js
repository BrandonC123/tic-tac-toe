const gameBoard = (() => {
    let game = ["x", "o", "o", "o", "x", "x", "o", "o", "x"];
    let players = [];
    return {
        game,
    };
})();

const display = (() => {
    const boxes = document.querySelectorAll(".box");
    let activePlayer = true;
    function displayMoves() {
        for (let i = 0; i < 9; i++) {
            boxes[i].textContent = gameBoard.game[i];
        }
    }
    function playerMoves(p1Choice, p2Choice) {
        boxes.forEach((box) => {
            box.addEventListener("click", () => {
                if (activePlayer && !box.classList.contains("taken")) {
                    box.textContent = p1Choice;
                    box.classList.add("taken");
                    activePlayer = false;
                    console.log("p1");
                } else if (!activePlayer && !box.classList.contains("taken")) {
                    box.textContent = p2Choice;
                    box.classList.add("taken");
                    activePlayer = true;
                    console.log("p2");
                }
            });
        });
    }
    return {
        displayMoves,
        playerMoves,
    };
})();

display.playerMoves("X", "O");
