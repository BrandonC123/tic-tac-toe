const gameBoard = (() => {
    let game = [];
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
            if (winCheckCenter(num, playerClass, 1)) return true;
        }
        if (num == 3 || num == 5) {
            if (winCheckCenter(num, playerClass, 3)) return true;
        }
        if (num == 4) {
            if (winCheckCenter(num, playerClass, 3)) return true;
            if (winCheckCenter(num, playerClass, 4)) return true;
            if (winCheckCenter(num, playerClass, 1)) return true;
            if (winCheckCenter(num, playerClass, 2)) return true;
        }
    }
    function winCheck(num, playerClass, value) {
        if (
            boxes[num + value].classList.contains(playerClass) &&
            boxes[num + value * 2].classList.contains(playerClass)
        ) {
            return true;
        }
        return false;
    }
    function winCheckCenter(num, playerClass, value) {
        if (
            boxes[num + value].classList.contains(playerClass) &&
            boxes[num - value].classList.contains(playerClass)
        ) {
            return true;
        }
        return false;
    }
    return {
        game,
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
    const status = document.getElementById("status");
    let _activePlayer = true;
    let player1;
    let player2;
    function displayMoves(box, choice) {
        box.textContent = choice;
        gameBoard.game.push(choice);
        return box;
    }
    let newGame = false;
    function playerMoves(p1Choice, p2Choice) {
        let color;
        let count = 0;
        for (let i = 0; i < _boxes.length; i++) {
            _boxes[i].addEventListener("click", function moves() {
                if (_activePlayer && !_boxes[i].classList.contains("taken")) {
                    _boxes[i] = displayMoves(_boxes[i], p1Choice);
                    _boxes[i].classList.add("taken", "p1-color");
                    _activePlayer = false;
                    color = "p1-color";
                    status.textContent = `Status: ${player2.getName()} turn`;
                } else if (
                    !_activePlayer &&
                    !_boxes[i].classList.contains("taken")
                ) {
                    _boxes[i] = displayMoves(_boxes[i], p2Choice);
                    _boxes[i].classList.add("taken", "p2-color");
                    _activePlayer = true;
                    color = "p2-color";
                    status.textContent = `Status: ${player1.getName()} turn`;
                }
                count++;
                const text = document.getElementById("win-text");
                const popup = document.querySelector(".win-popup");
                if (gameBoard.gameDecider(i, color)) {
                    if (color == "p1-color") {
                        text.textContent =
                            document.getElementById("p1").textContent +
                            " is the winner!";
                    } else {
                        text.textContent =
                            document.getElementById("p2").textContent +
                            " is the winner!";
                    }
                    popup.classList.add("win-open");
                } else if (count == 9) {
                    text.textContent = "Tie!";
                    popup.classList.add("win-open");
                }
            });
        }
    }
    const exitBtn = document.getElementById("exit-win");
    exitBtn.addEventListener("click", () => {
        const popup = document.querySelector(".win-popup");
        popup.classList.add("win-close");
        clearScreen();
        status.textContent = "Status: press start for new game";
    });
    function clearScreen() {
        _boxes.forEach((box) => {
            box.textContent = "";
            box.classList.remove("p1-color");
            box.classList.remove("p2-color");
            if (!box.classList.contains("taken")) {
                box.classList.add("taken");
            }
        });
        newGame = true;
    }
    function openScreen() {
        _boxes.forEach((box) => {
                box.classList.remove("taken");
        });
        newGame = false;
    }
    function createPlayer(playerName, selection, p) {
        if (p == "p1") {
            player1 = Player(playerName, selection, p);
        } else {
            player2 = Player(playerName, selection, p);
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
            try {
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
            } catch (error) {
                status.textContent = "Status: Select every option!";
            }
        });
    });
    const turnBtns = document.querySelectorAll(".turn-btns");
    let activeTurn;
    for (let i = 0; i < turnBtns.length; i++) {
        turnBtns[i].addEventListener("click", () => {
            try {
                let p1Name = player1.getName();
                let p2Name = player2.getName();
                if (i == 0) {
                    if (activeTurn != null) {
                        activeTurn.classList.remove("turn-p2");
                    }
                    _activePlayer = true;
                    turnBtns[i].classList.add("turn-p1");
                    status.textContent = `Status: ${p1Name} first`;
                } else {
                    if (activeTurn != null) {
                        activeTurn.classList.remove("turn-p1");
                    }
                    _activePlayer = false;
                    turnBtns[i].classList.add("turn-p2");
                    status.textContent = `Status: ${p2Name} first`;
                }
                activeTurn = turnBtns[i];
            } catch (error) {
                status.textContent =
                    "Status: Please create both player1 and player2";
            }
        });
    }
    const startBtn = document.getElementById("start-btn");
    startBtn.addEventListener("click", () => {
        if (player1 != null && player2 != null) {
            let p1 = player1.getSelection();
            let p2 = player2.getSelection();
            if (newGame) {
                openScreen();
            }
            if (p1 != p2) {
                if (player1.getPlayer() == "p1") {
                    display.playerMoves(p1, p2);
                } else {
                    display.playerMoves(p2, p1);
                }
            } else {
                status.textContent = "Status: Cannot have same X/O!";
            }
        }
        startBtn.classList.add("start-pressed");
    });
    startBtn.addEventListener("transitionend", () => {
        startBtn.classList.remove("start-pressed");
    });
    const resetBtn = document.getElementById("reset");
    resetBtn.addEventListener("click", () => {
        clearScreen();
    });
    return {
        playerMoves,
        createPlayer,
    };
})();
// const testPlayer1 = display.createPlayer("brandon", "X");
// const testPlayer2 = display.createPlayer("brando", "O");
