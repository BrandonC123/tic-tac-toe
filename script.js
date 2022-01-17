const gameBoard = (() => {
    let game = [];
    const _boxes = document.querySelectorAll(".box");

    function gameDecider(num, playerClass) {
        if (num == 0 || num == 1 || num == 2) {
            if (_winCheck(num, playerClass, 3)) {
                return true;
            }
            if (num == 0) {
                if (_winCheck(num, playerClass, 4)) return true;
            }
            if (num == 2) {
                if (_winCheck(num, playerClass, 2)) return true;
            }
        }
        if (num == 6 || num == 7 || num == 8) {
            if (_winCheck(num, playerClass, -3)) {
                return true;
            }
            if (num == 6) {
                if (_winCheck(num, playerClass, -2)) return true;
            }
            if (num == 8) {
                if (_winCheck(num, playerClass, -4)) return true;
            }
        }
        if (num == 0 || num == 3 || num == 6) {
            if (_winCheck(num, playerClass, 1)) return true;
        }
        if (num == 2 || num == 5 || num == 8) {
            if (_winCheck(num, playerClass, -1)) return true;
        }
        if (num == 1 || num == 7) {
            if (_winCheckCenter(num, playerClass, 1)) return true;
        }
        if (num == 3 || num == 5) {
            if (_winCheckCenter(num, playerClass, 3)) return true;
        }
        if (num == 4) {
            if (_winCheckCenter(num, playerClass, 3)) return true;
            if (_winCheckCenter(num, playerClass, 4)) return true;
            if (_winCheckCenter(num, playerClass, 1)) return true;
            if (_winCheckCenter(num, playerClass, 2)) return true;
        }
    }

    //Checks for the outer _boxes in the horizontal/vertical direction
    function _winCheck(num, playerClass, value) {
        if (
            _boxes[num + value].classList.contains(playerClass) &&
            _boxes[num + value * 2].classList.contains(playerClass)
        ) {
            return true;
        }
        return false;
    }

    //Checks for diagnols and center pieces
    function _winCheckCenter(num, playerClass, value) {
        if (
            _boxes[num + value].classList.contains(playerClass) &&
            _boxes[num - value].classList.contains(playerClass)
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
    const _status = document.getElementById("status");
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

    const _welcomeScreen = document.querySelector(".welcome-screen");
    const _goBtn = document.getElementById("go");
    _goBtn.addEventListener("click", () => {
        _welcomeScreen.classList.add("close-welcome");
    });

    const _playerSelect = document.getElementById("wselect-player");
    _playerSelect.addEventListener("click", () => {
        if (_aiSelectCont.classList.contains("ai-select-open")) {
            _aiSelectCont.classList.remove("ai-select-open");
        }
        _aiSelect.classList.remove("btn-pressed");
        _playerSelect.classList.add("btn-pressed");
        ai = false;
    });

    const _aiSelect = document.getElementById("wselect-ai");
    const _aiSelectCont = document.querySelector(".ai-select-cont");
    _aiSelect.addEventListener("click", () => {
        _aiSelectCont.classList.add("ai-select-open");
        _playerSelect.classList.remove("btn-pressed");
        _aiSelect.classList.add("btn-pressed");
        createAiPlayer();
        ai = true;
    });

    const _aiSelections = document.querySelectorAll(".ai-select");
    function createAiPlayer() {
        for (let i = 0; i < _aiSelections.length; i++) {
            _aiSelections[i].addEventListener("click", () => {
                //Updating information on screen
                document.getElementById("p2-name").value = "Computer";
                const changeName = document.getElementById("p2");
                changeName.textContent = "Computer";
                if (i == 0) {
                    _selection[3].removeAttribute("id");
                    _createPlayer("Computer", "X", "p2");
                    _selection[2].setAttribute("id", "p2-sel");
                    activeP2 = _selection[2];
                } else {
                    _selection[2].removeAttribute("id");
                    _createPlayer("Computer", "O", "p2");
                    _selection[3].setAttribute("id", "p2-sel");
                    activeP2 = _selection[3];
                }
            });
        }
    }

    for (let i = 0; i < _aiSelections.length; i++) {
        _aiSelections[i].addEventListener("click", () => {
            if (i == 0) {
                _aiSelections[i + 1].classList.remove("btn-pressed");
            } else {
                _aiSelections[i - 1].classList.remove("btn-pressed");
            }
            _aiSelections[i].classList.add("btn-pressed");
        });
    }

    //Generates random number for box position. If that position is filled
    //it recursively calls till it finds one that is not filled or is tied.
    function _getEasyAiMove(count) {
        let aiMove = Math.floor(Math.random() * 9);
        if (!_boxes[aiMove].classList.contains("taken")) {
            _moves(_boxes[aiMove], aiMove);
        } else if (count < 9) {
            _getEasyAiMove(count);
        }
    }

    function _displayMoves(box, choice) {
        box.textContent = choice;
        gameBoard.game.push(choice);
        return box;
    }

    const _popup = document.querySelector(".win-popup");

    function _moves(box, i) {
        let color;
        const text = document.getElementById("win-text");
        if (_activePlayer && !box.classList.contains("taken")) {
            box = _displayMoves(box, player1.getSelection());
            box.classList.add("taken", "p1-color");
            _activePlayer = false;
            color = "p1-color";
            _status.textContent = `Status: ${player2.getName()} turn`;
            count++;
            tester();
            if (ai && !tester()) {
                _getEasyAiMove(count);
            }
        } else if (!_activePlayer && !box.classList.contains("taken")) {
            box = _displayMoves(box, player2.getSelection());
            box.classList.add("taken", "p2-color");
            _activePlayer = true;
            color = "p2-color";
            _status.textContent = `Status: ${player1.getName()} turn`;
            count++;
            tester();
        }

        function tester() {
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
                _popup.classList.add("win-open");
                _boxes.forEach((boxDel) => {
                    if (!boxDel.classList.contains("taken")) {
                        boxDel.classList.add("taken");
                    }
                });
                return true;
            } else if (count == 9) {
                text.textContent = "Tie!";
                _popup.classList.add("win-open");
                return true;
            }
            return false;
        }
    }

    function playerMoves() {
        for (let i = 0; i < _boxes.length; i++) {
            _boxes[i].addEventListener("click", () => {
                _moves(_boxes[i], i);
            });
        }
    }

    function _clearScreen() {
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

    function _openScreen() {
        _boxes.forEach((box) => {
            box.classList.remove("taken");
        });
        _popup.classList.remove("win-open");
        _popup.classList.remove("win-close");
        newRound = false;
    }

    function _createPlayer(playerName, selection, p) {
        if (p == "p1") {
            player1 = Player(playerName, selection, p);
            _turnBtns[0].textContent = `${player1.getName()} plays first`;
        } else {
            player2 = Player(playerName, selection, p);
            _turnBtns[1].textContent = `${player2.getName()} plays first`;
        }
    }

    const _selection = document.querySelectorAll(".selection");
    for (let i = 0; i < _selection.length; i++) {
        _selection[i].addEventListener("click", () => {
            if (i <= 1) {
                if (activeP1 != null) {
                    activeP1.removeAttribute("id");
                }
                _selection[i].setAttribute("id", "p1-sel");
                activeP1 = _selection[i];
            } else {
                if (activeP2 != null) {
                    activeP2.removeAttribute("id");
                }
                _selection[i].setAttribute("id", "p2-sel");
                activeP2 = _selection[i];
            }
        });
    }

    const _exitBtn = document.getElementById("exit-win");
    _exitBtn.addEventListener("click", () => {
        _popup.classList.add("win-close");
        _clearScreen();
        _status.textContent = "Status: Press start to begin";
    });

    const _enterBtns = document.querySelectorAll(".submit-data");
    _enterBtns.forEach((btn) => {
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
                _createPlayer(pName, sel, p);
            } catch (error) {
                _status.textContent = "Status: Select every option!";
            }
        });
    });

    function _newPlayer(p, player) {
        if (!activeGame) {
            document.getElementById(p).textContent = player;
            document.getElementById(p + "-name").value = null;
            const pSelection = document.querySelectorAll(`.${p}Selection`);
            pSelection[0].removeAttribute("id");
            pSelection[1].removeAttribute("id");
            return true;
        }
    }

    const _newPlayerP1 = document.getElementById("new-p1");
    _newPlayerP1.addEventListener("click", () => {
        if (_newPlayer("p1", "Player1")) player1 = null;
    });

    const _newPlayerP2 = document.getElementById("new-p2");
    _newPlayerP2.addEventListener("click", () => {
        if (_newPlayer("p2", "Player2")) player2 = null;
    });

    const _turnBtns = document.querySelectorAll(".turn-btns");
    for (let i = 0; i < _turnBtns.length; i++) {
        _turnBtns[i].addEventListener("click", () => {
            if (!activeGame) {
                if (i == 0) {
                    if (activeTurn != null) {
                        activeTurn.style.border = "2px solid black";
                    }
                    _turnBtns[i].classList.add("turn-p1");
                    _updateTurn(_turnBtns[i]);
                } else {
                    if (activeTurn != null) {
                        activeTurn.style.border = "2px solid black";
                    }
                    _turnBtns[i].classList.add("turn-p2");
                    _updateTurn(_turnBtns[i]);
                }
                activeTurn = _turnBtns[i];
            }
        });
    }

    function _updateTurn(turn) {
        try {
            let p1Name = player1.getName();
            let p2Name = player2.getName();
            if (turn.classList.contains("turn-p1")) {
                _activePlayer = true;
                _status.textContent = `Status: ${p1Name} first`;
                turn.style.border = "solid 3px royalblue";
            }
            if (turn.classList.contains("turn-p2")) {
                _activePlayer = false;
                _status.textContent = `Status: ${p2Name} first`;
                turn.style.border = "solid 3px rgb(209, 46, 46)";
            }
            return true;
        } catch (error) {
            _status.textContent =
                "Status: Please create both player1 and player2";
        }
    }

    let _firstRound = true;
    const _startBtn = document.getElementById("start-btn");
    _startBtn.addEventListener("click", () => {
        if (
            player1 != null &&
            player2 != null &&
            activeTurn != null &&
            activeGame == false
        ) {
            let p1 = player1.getSelection();
            let p2 = player2.getSelection();
            if (p1 == p2) {
                _status.textContent = "Status: Cannot have same X/O!";
                activeTurn.style.border = "2px solid black";
                return;
            }
            if (_firstRound) {
                playerMoves();
                _firstRound = false;
            } else if (newRound) {
                _openScreen();
                _updateTurn(activeTurn);
            }
            if (ai && !_activePlayer) {
                _getEasyAiMove();
            }
            activeGame = true;
            _startBtn.classList.add("start-pressed");
        }
    });

    _startBtn.addEventListener("transitionend", () => {
        _startBtn.classList.remove("start-pressed");
    });

    const _resetBtn = document.getElementById("reset");
    _resetBtn.addEventListener("click", () => {
        _clearScreen();
        _status.textContent = "Status: Press start to begin";
    });

    return {
        playerMoves,
    };
})();
