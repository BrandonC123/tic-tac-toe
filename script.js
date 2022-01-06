const gameBoard = (() => {
    let game = [];
    let players = [];
    const boxes = document.querySelectorAll(".box");
    function gameDecider(num, playerClass) {
        if (num == 0 || num == 1 || num == 2) {
            if (horiDown(num, playerClass)) {
                return true;
            }
            if (num == 0) {
                if (cross0(num, playerClass)) return true;
            }
            if (num == 2) {
                if (cross2(num, playerClass)) return true;
            }
        }
        if (num == 6 || num == 7 || num == 8) {
            if (horiUp(num, playerClass)) {
                return true;
            }
            if (num == 6) {
                if (cross6(num,playerClass)) return true;
            }
            if (num == 8) {
                if (cross8(num,playerClass)) return true;
            }
        }
        if (num == 0 || num == 3 || num == 6) {
            if (vertR(num, playerClass)) return true;
        }
        if (num == 2 || num == 5 || num == 8) {
            if (vertL(num, playerClass)) return true;
        }
        if (num == 1 || num == 7) {
            if (horiCenter(num, playerClass)) return true;
        }
        if (num == 3 || num == 5) {
            if (vertCenter(num, playerClass)) return true;
        }
    }
    function horiDown(num, playerClass) {
        if (
            boxes[num].classList.contains(playerClass) &&
            boxes[num + 3].classList.contains(playerClass) &&
            boxes[num + 6].classList.contains(playerClass)
        ) {
            return true;
        }
        return false;
    }
    function horiUp(num, playerClass) {
        if (
            boxes[num].classList.contains(playerClass) &&
            boxes[num - 3].classList.contains(playerClass) &&
            boxes[num - 6].classList.contains(playerClass)
        ) {
            return true;
        }
        return false;
    }
    function vertR(num, playerClass) {
        if (
            boxes[num].classList.contains(playerClass) &&
            boxes[num + 1].classList.contains(playerClass) &&
            boxes[num + 2].classList.contains(playerClass)
        ) {
            return true;
        }
        return false;
    }
    function vertL(num, playerClass) {
        if (
            boxes[num].classList.contains(playerClass) &&
            boxes[num - 1].classList.contains(playerClass) &&
            boxes[num - 2].classList.contains(playerClass)
        ) {
            return true;
        }
        return false;
    }
    function cross2(num, playerClass) {
        if (
            boxes[num].classList.contains(playerClass) &&
            boxes[num + 2].classList.contains(playerClass) &&
            boxes[num + 4].classList.contains(playerClass)
        ) {
            return true;
        }
        return false;
    }
    function cross6(num, playerClass) {
        if (
            boxes[num].classList.contains(playerClass) &&
            boxes[num - 2].classList.contains(playerClass) &&
            boxes[num - 4].classList.contains(playerClass)
        ) {
            return true;
        }
        return false;
    }
    function cross0(num, playerClass) {
        if (
            boxes[num].classList.contains(playerClass) &&
            boxes[num + 4].classList.contains(playerClass) &&
            boxes[num + 8].classList.contains(playerClass)
        ) {
            return true;
        }
        return false;
    }
    function cross8(num, playerClass) {
        if (
            boxes[num].classList.contains(playerClass) &&
            boxes[num - 4].classList.contains(playerClass) &&
            boxes[num - 8].classList.contains(playerClass)
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
                    // console.log("p1");
                } else if (
                    !_activePlayer &&
                    !_boxes[i].classList.contains("taken")
                ) {
                    _boxes[i] = displayMoves(_boxes[i], p2Choice);
                    _boxes[i].classList.add("taken", "p2-color");
                    _activePlayer = true;
                    color = "p2-color";
                    // console.log("p2");
                }
                console.log(i);
                console.log(gameBoard.gameDecider(i, color));
            });
        }
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
        createPlayer,
    };
})();
const testPlayer1 = display.createPlayer("brandon", "X");
const testPlayer2 = display.createPlayer("brando", "O");
