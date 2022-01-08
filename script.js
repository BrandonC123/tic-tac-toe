const gameBoard = (() => {
    let game = [];
    let players = [];
    const boxes = document.querySelectorAll(".box");
    function gameDecider(num, playerClass) {
        if (num == 0 || num == 1 || num == 2) {
            if (winCheck(num, playerClass, 3)) {
                return true;
            }
            if (num == 0) {
                if (winCheck(num, playerClass, 4)) return true;
            }
            if (num == 2) {
                if (winCheck(num, playerClass, 2)) return true;
            }
        }
        if (num == 6 || num == 7 || num == 8) {
            if (winCheck(num, playerClass, -3)) {
                return true;
            }
            if (num == 6) {
                if (winCheck(num, playerClass, -2)) return true;
            }
            if (num == 8) {
                if (winCheck(num, playerClass, -4)) return true;
            }
        }
        if (num == 0 || num == 3 || num == 6) {
            if (winCheck(num, playerClass, 1)) return true;
        }
        if (num == 2 || num == 5 || num == 8) {
            if (winCheck(num, playerClass, -1)) return true;
        }
        if (num == 1 || num == 7) {
            if (horiCenter(num, playerClass)) return true;
        }
        if (num == 3 || num == 5) {
            if (vertCenter(num, playerClass)) return true;
        }
    }
    function winCheck(num, playerClass, value) {
        if (
            boxes[num].classList.contains(playerClass) &&
            boxes[num + value].classList.contains(playerClass) &&
            boxes[num + (value * 2)].classList.contains(playerClass)
        ) {
            return true;
        }
        return false;
    }
    function horiCenter(num, playerClass) {
        if (
            boxes[num].classList.contains(playerClass) &&
            boxes[num + 1].classList.contains(playerClass) &&
            boxes[num - 1].classList.contains(playerClass)
        ) {
            return true;
        }
        return false;
    }
    function vertCenter(num, playerClass) {
        if (
            boxes[num].classList.contains(playerClass) &&
            boxes[num + 3].classList.contains(playerClass) &&
            boxes[num - 3].classList.contains(playerClass)
        ) {
            return true;
        }
        return false;
    }
    return {
        game,
        players,
        gameDecider,
    };
})();

const Player = (playerName, selection, player) => {
    function getName() {
        return playerName;
    }
    function getSelection() {
        return selection;
    }
    function getPlayer() {
        return player;
    }
    return {
        getSelection,
        getName,
        getPlayer,
    };
};

const display = (() => {
    const _boxes = document.querySelectorAll(".box");
    let _activePlayer = true;
    function displayMoves(box, choice) {
        box.textContent = choice;
        gameBoard.game.push(choice);
        return box;
    }
    function playerMoves(p1Choice, p2Choice) {
        let color;
        for (let i = 0; i < _boxes.length; i++) {
            _boxes[i].addEventListener("click", () => {
                if (_activePlayer && !_boxes[i].classList.contains("taken")) {
                    _boxes[i] = displayMoves(_boxes[i], p1Choice);
                    _boxes[i].classList.add("taken", "p1-color");
                    _activePlayer = false;
                    color = "p1-color";
                } else if (
                    !_activePlayer &&
                    !_boxes[i].classList.contains("taken")
                ) {
                    _boxes[i] = displayMoves(_boxes[i], p2Choice);
                    _boxes[i].classList.add("taken", "p2-color");
                    _activePlayer = true;
                    color = "p2-color";
                }
                console.log(i);
                console.log(gameBoard.gameDecider(i, color));
            });
        }
    }
    function createPlayer(playerName, selection, p) {
        const player = Player(playerName, selection, p);
        gameBoard.players.push(player);
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
            const changeName = document.getElementById(p);
            changeName.textContent = pName;
            createPlayer(pName, sel, p);
        });
    });
    const turnBtns = document.querySelectorAll(".turn-btns");
    let activeTurn;
    for (let i = 0; i < turnBtns.length; i++) {
        turnBtns[i].addEventListener("click", () => {
            if (i == 0) {
                if (activeTurn != null) {
                    activeTurn.classList.remove("turn-p2");
                }
                _activePlayer = true;
                turnBtns[i].classList.add("turn-p1");
            } else {
                if (activeTurn != null) {
                    activeTurn.classList.remove("turn-p1");
                }
                _activePlayer = false;
                turnBtns[i].classList.add("turn-p2");
            }
            activeTurn = turnBtns[i];
        });
    }
    const startBtn = document.getElementById("start-btn");
    startBtn.addEventListener("click", () => {
        if (gameBoard.players.length == 2) {
            let p1 = gameBoard.players[0].getSelection();
            let p2 = gameBoard.players[1].getSelection();
            if (p1 != p2) {
                display.playerMoves(p1, p2);
            }
        }
    });
    return {
        playerMoves,
        createPlayer,
    };
})();
// const testPlayer1 = display.createPlayer("brandon", "X");
// const testPlayer2 = display.createPlayer("brando", "O");
