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
    let activeP1;
    let activeP2;
    let newRound = false;
    let activeGame = false;
    let activeTurn;
    let count = 0;
    let ai = false;

    const welcomeCont = document.querySelector(".welcome-container");
    const goBtn = document.getElementById("go");
    goBtn.addEventListener("click", () => {
        welcomeCont.classList.add("close-welcome");
    });

    const playerSelect = document.getElementById("wselect-player");
    playerSelect.addEventListener("click", () => {
        if (aiSelectCont.classList.contains("ai-select-open")) {
            aiSelectCont.classList.remove("ai-select-open");
        }
    });

    const aiSelect = document.getElementById("wselect-ai");
    const aiSelectCont = document.querySelector(".ai-select-cont");
    aiSelect.addEventListener("click", () => {
        aiSelectCont.classList.add("ai-select-open");
        createEasyAi();
        ai = true;
    });

    const aiSelections = document.querySelectorAll(".ai-select");
    function createEasyAi() {
        for (let i = 0; i < aiSelections.length; i++) {
            aiSelections[i].addEventListener("click", () => {
                document.getElementById("p2-name").value = "Computer";
                const changeName = document.getElementById("p2");
                changeName.textContent = "Computer";
                if (i == 0) {
                    createPlayer("Computer", "X", "p2");
                    selection[2].setAttribute("id", "p2-sel");
                } else {
                    createPlayer("Computer", "O", "p2");
                    selection[3].setAttribute("id", "p2-sel");
                }
            });
        }
    }

    function getEasyAiMove(count) {
        let aiMove = Math.floor(Math.random() * 9);
        console.log(aiMove);
        if (!_boxes[aiMove].classList.contains("taken")) {
            moves(player1.getSelection(), player2.getSelection(), 
            _boxes[aiMove], aiMove);
        } else if (count <= 9) {
            getEasyAiMove();
        }
    }

    function displayMoves(box, choice) {
        box.textContent = choice;
        gameBoard.game.push(choice);
        return box;
    }
    const popup = document.querySelector(".win-popup");

    function moves(p1Choice, p2Choice, box, i) {
        let color;
        if (_activePlayer && !box.classList.contains("taken")) {
            box = displayMoves(box, p1Choice);
            box.classList.add("taken", "p1-color");
            _activePlayer = false;
            color = "p1-color";
            status.textContent = `Status: ${player2.getName()} turn`;
            count++;
            if (ai) {
                getEasyAiMove(count);
            }
        } else if (!_activePlayer && !box.classList.contains("taken")) {
            box = displayMoves(box, p2Choice);
            box.classList.add("taken", "p2-color");
            _activePlayer = true;
            color = "p2-color";
            status.textContent = `Status: ${player1.getName()} turn`;
            count++;
        }
        const text = document.getElementById("win-text");
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
            _boxes.forEach((boxDel) => {
                if (!boxDel.classList.contains("taken")) {
                    boxDel.classList.add("taken");
                }
            });
        } else if (count == 9) {
            text.textContent = "Tie!";
            popup.classList.add("win-open");
        }
    }
    function playerMoves(p1Choice, p2Choice) {
        for (let i = 0; i < _boxes.length; i++) {
            _boxes[i].addEventListener("click", () => {
                moves(p1Choice, p2Choice, _boxes[i], i);
            });
        }
    }
    function clearScreen() {
        _boxes.forEach((box) => {
            box.textContent = "";
            box.classList.remove("p1-color");
            box.classList.remove("p2-color");
            if (!box.classList.contains("taken")) {
                box.classList.add("taken");
            }
        });
        activeGame = false;
        newRound = true;
        count = 0;
    }
    function openScreen() {
        _boxes.forEach((box) => {
            box.classList.remove("taken");
        });
        popup.classList.remove("win-open");
        popup.classList.remove("win-close");
        newRound = false;
    }
    function createPlayer(playerName, selection, p) {
        if (p == "p1") {
            player1 = Player(playerName, selection, p);
            turnBtns[0].textContent = `${player1.getName()} plays first`;
        } else {
            player2 = Player(playerName, selection, p);
            turnBtns[1].textContent = `${player2.getName()} plays first`;
        }
    }

    const selection = document.querySelectorAll(".selection");
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

    const exitBtn = document.getElementById("exit-win");
    exitBtn.addEventListener("click", () => {
        popup.classList.add("win-close");
        clearScreen();
        status.textContent = "Status: Press start to begin";
    });

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

    function newPlayer(p, player) {
        if (!activeGame) {
            document.getElementById(p).textContent = player;
            document.getElementById(p + "-name").value = null;
            const pSelection = document.querySelectorAll(`.${p}Selection`);
            pSelection[0].removeAttribute("id");
            pSelection[1].removeAttribute("id");
            return true;
        }
    }

    const newPlayerP1 = document.getElementById("new-p1");
    newPlayerP1.addEventListener("click", () => {
        if (newPlayer("p1", "Player1")) player1 = null;
    });

    const newPlayerP2 = document.getElementById("new-p2");
    newPlayerP2.addEventListener("click", () => {
        if (newPlayer("p2", "Player2")) player2 = null;
    });

    const turnBtns = document.querySelectorAll(".turn-btns");
    for (let i = 0; i < turnBtns.length; i++) {
        turnBtns[i].addEventListener("click", () => {
            if (!activeGame) {
                if (i == 0) {
                    if (activeTurn != null) {
                        activeTurn.style.border = "2px solid black";
                    }
                    turnBtns[i].classList.add("turn-p1");
                    updateTurn(turnBtns[i]);
                } else {
                    if (activeTurn != null) {
                        activeTurn.style.border = "2px solid black";
                    }
                    turnBtns[i].classList.add("turn-p2");
                    updateTurn(turnBtns[i]);
                }
                activeTurn = turnBtns[i];
            }
        });
    }

    function updateTurn(turn) {
        try {
            let p1Name = player1.getName();
            let p2Name = player2.getName();
            if (turn.classList.contains("turn-p1")) {
                _activePlayer = true;
                status.textContent = `Status: ${p1Name} first`;
                turn.style.border = "solid 3px royalblue";
            }
            if (turn.classList.contains("turn-p2")) {
                _activePlayer = false;
                status.textContent = `Status: ${p2Name} first`;
                turn.style.border = "solid 3px rgb(209, 46, 46)";
            }
            return true;
        } catch (error) {
            status.textContent =
                "Status: Please create both player1 and player2";
        }
    }

    let t = true;
    const startBtn = document.getElementById("start-btn");
    startBtn.addEventListener("click", () => {
        if (
            player1 != null &&
            player2 != null &&
            activeTurn != null &&
            activeGame == false
        ) {
            let p1 = player1.getSelection();
            let p2 = player2.getSelection();
            if (newRound && p1 != p2) {
                openScreen();
                t = false;
                updateTurn(activeTurn);
                activeGame = true;
            }
            if (p1 != p2 && t) {
                if (player1.getPlayer() == "p1") {
                    playerMoves(p1, p2);
                } else {
                    playerMoves(p2, p1);
                }
                activeGame = true;
            }
            // if (ai && !_activePlayer) {
            //     getEasyAiMove();
            // }
            if (p1 == p2) {
                status.textContent = "Status: Cannot have same X/O!";
                activeTurn.style.border = "2px solid black";
            }
            startBtn.classList.add("start-pressed");
        }
    });

    startBtn.addEventListener("transitionend", () => {
        startBtn.classList.remove("start-pressed");
    });

    const resetBtn = document.getElementById("reset");
    resetBtn.addEventListener("click", () => {
        clearScreen();
        status.textContent = "Status: Press start to begin";
    });
    return {
        playerMoves,
        createPlayer,
    };
})();
// const testPlayer1 = display.createPlayer("brandon", "X");
// const testPlayer2 = display.createPlayer("brando", "O");
