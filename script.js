const gameBoard = (() => {
    let game = ["x", "o", "o", "o", "x", "x", "o", "o", "x"];
    let players = [];
    return {
        game,
        players
    };
})();

const display = (() => {
    const _boxes = document.querySelectorAll(".box");
    let _activePlayer = true;
    function displayMoves(box, choice) {
        box.textContent = choice;
        gameBoard.game.push(choice);
        return box;
    }
    function playerMoves(p1Choice, p2Choice) {
        _boxes.forEach((box) => {
            box.addEventListener("click", () => {
                if (_activePlayer && !box.classList.contains("taken")) {
                    box = displayMoves(box, p1Choice);
                    box.classList.add("taken", "p1-color");
                    _activePlayer = false;
                    console.log("p1");
                } else if (!_activePlayer && !box.classList.contains("taken")) {
                    box = displayMoves(box, p2Choice);
                    box.classList.add("taken", "p2-color");
                    _activePlayer = true;
                    console.log("p2");
                }
            });
        });
    }
    function createPlayer(playerName, selection) {
        const player = Player(playerName, selection);
        gameBoard.players.push(player);
    }
    const p1Selection = document.querySelectorAll(".p1Selection");
    p1Selection.forEach((sel) => {
        sel.addEventListener("click", () => {
            sel.setAttribute("id", "p1-sel")
        });
    });
    const enterBtns = document.querySelectorAll(".submit-data");
    enterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const pName = document.getElementById("p1-name").value;
            const sel = document.getElementById("p1-sel").textContent;
            createPlayer(pName, sel);
            console.log(pName, sel);
        });
    });
    return {
        playerMoves,
    };
})();

const Player = (playerName, selection) => {};

display.playerMoves("X", "O");
