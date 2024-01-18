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


Issue Log

--when selecting a ship to place, the ship selections seem to "stack" on each other each time a new one is clicked. This can be seen by looking at the hover coordinates logged to the console.
    --fix
        every time a new ship is clicked, remove the event listeners

