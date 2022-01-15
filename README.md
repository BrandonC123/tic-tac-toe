# tic-tac-toe
Tic tac toe game using JS. TOP. Currently supports player vs player and player vs AI (easy). Unbeatable AI using minimax still on hold. 

Displaying moves process:
    - The startBtn will only function after both players are correctly created and a play order is chosen.
    - After the startBtn is clicked the first round sets up the board with playerMoves() function which uses the moves() function.
    - moves() uses the box parameter to display X/O with displayMoves()/
    - _activePlayer boolean is alternated accordingly to distinguish player1 and 2.
    - Using i parameter the box is tested whether or not it causes a win/draw with gameDecider().
    - gameDecider() checks whether the corresponding boxes have either p1-color or p2-color class to determine whether or not the game is over.

