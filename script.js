const gameBoard = (() => {
    let game = [];
    let players = [];
    const boxes = document.querySelectorAll(".box");
    function gameDecider(num, playerClass) {
        if (num == 0 || num == 1 || num == 2) {
            return horiDown(num, playerClass);
        }
        if (num == 6 || num == 7 || num == 8) {
            return horiUp(num, playerClass);
        }
        if (num == 0 || num == 3 || num == 6) {
            return vertR(num, playerClass);
        }
        if (num == 2 || num == 5 || num == 8) {
            return vertL(num, playerClass);
        }
    }
        function horiDown(num, playerClass) {
            if (boxes[num].classList.contains(playerClass) && 
            boxes[num + 3].classList.contains(playerClass) && 
            boxes[num + 6].classList.contains(playerClass)) {
                return true;
            }
        }
        function horiUp(num, playerClass) {
            if (boxes[num].classList.contains(playerClass) && 
            boxes[num - 3].classList.contains(playerClass) && 
            boxes[num - 6].classList.contains(playerClass)) {
                return true;
            }
        }
        function vertR(num, playerClass) {
            if (boxes[num].classList.contains(playerClass) && 
            boxes[num + 1].classList.contains(playerClass) && 
            boxes[num + 2].classList.contains(playerClass)) {
                return true;
            }
        }
        function vertL(num, playerClass) {
            if (boxes[num].classList.contains(playerClass) && 
            boxes[num - 1].classList.contains(playerClass) && 
            boxes[num - 2].classList.contains(playerClass)) {
                return true;
            }
        }
    return {
        game,
        players,
        gameDecider,
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
        let count = 0;
        _boxes.forEach((box) => {
            box.addEventListener("click", () => {
                if (_activePlayer && !box.classList.contains("taken")) {
                    box = displayMoves(box, p1Choice);
                    box.classList.add("taken", "p1-color");
                    _activePlayer = false;
                    console.log(gameBoard.gameDecider(count, "p1-color"));
                    // console.log("p1");
                } else if (!_activePlayer && !box.classList.contains("taken")) {
                    box = displayMoves(box, p2Choice);
                    box.classList.add("taken", "p2-color");
                    _activePlayer = true;
                    console.log(gameBoard.gameDecider(count, "p2-color"));
                    // console.log("p2");
                }
                count++;
            });
        });
    }
    function createPlayer(playerName, selection) {
        const player = Player(playerName, selection);
        gameBoard.players.push(player);
        if (gameBoard.players.length == 2) {
            let p1 = gameBoard.players[0].getSelection();
            let p2 = gameBoard.players[1].getSelection();
            if (p1 != p2) {
                display.playerMoves(p1, p2);
            } 
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
    function getName() {
        return playerName;
    }
    function getSelection() {
        return selection;
    }
    return {
        getSelection,
        getName,
    };
};
