const gameBoard = (() => {
    let game = ["x", "o", "o", "o", "x", "x", "o", "o", "x"];
    let players = [];
    return {
        game,
        players,
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
        if (gameBoard.players.length == 2) {
            display.playerMoves(
                gameBoard.players[0].getSelection(),
                gameBoard.players[1].getSelection()
            );
        }
    }
    const selection = document.querySelectorAll(".selection");
    let activeP1;
    let activeP2;
    for (let i = 0; i < selection.length; i++) {
        selection[i].addEventListener("click", () => {
            if (i <= 1) {
                if (activeP1 != null) {
                    activeP1.removeAttribute("id");
                }
                selection[i].setAttribute("id", "p1-sel");
                activeP1 = selection[i];
            } else {
                if (activeP2 != null) {
                    activeP2.removeAttribute("id");
                }
                selection[i].setAttribute("id", "p2-sel");
                activeP2 = selection[i];
            }
        });
    }
    const enterBtns = document.querySelectorAll(".submit-data");
    enterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            let p;
            if (btn.classList.contains("p1")) {
                p = "p1";
            } else {
                p = "p2";
            }
            const pName = document.getElementById(p + "-name").value;
            const sel = document.getElementById(p + "-sel").textContent;
            createPlayer(pName, sel);
            console.log(pName, sel);
        });
    });
    return {
        playerMoves,
    };
})();

const Player = (playerName, selection) => {
    function getSelection() {
        return selection;
    }
    return {
        getSelection,
    };
};
