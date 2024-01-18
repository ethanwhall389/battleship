# battleship

Needed implementations:

--hide enemy board's ships from user - done 
--homescreen for entering player name -done 
--system for adding ships (drag and drop?)
--A way for showing the user when a ship has been sunk.

Edge cases:

--user can make attacks even when it isn't his turn.

--user can attack by clicking on a coordinate on their own board, which attacks that coordinate on opponent's board.

--Every once in a while the computer will freeze while taking it's turn.
    I think this is caused by an issue in the await statement for the pTwoTurn computer attack. It seems once in a while the promise is never resolved.


Issue Log

--when selecting a ship to place, the ship selections seem to "stack" on each other each time a new one is clicked. This can be seen by looking at the hover coordinates logged to the console.
    --fix
        add the event listener only the first time a ship is selected.
        from then on, every time a selection is made, only change the number of ships variable. The event listener is always active.




Refactoring:
-- change all of the vert and horiz in code to x and y

