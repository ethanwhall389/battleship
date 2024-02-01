# battleship

Needed implementations:


Nice-to-have implemenations:


--computer attacks sequentially when it gets a hit.

--Button to start over on placing ships screen

--add option for user to randomly generate their ships' layout (easy)

--add a play again button after game over








**Issue Log**

CURRENT


--user can attack by clicking on a coordinate on their own board, which attacks that coordinate on opponent's board.

--user can attack a square that's already been attacked.


FIXED
--Every once in a while the computer will freeze while taking it's turn.
    I think this is caused by an issue in the await statement for the pTwoTurn computer attack. It seems once in a while the promise is never resolved.

--user can make attacks even when it isn't his turn.
    --fix: Inside the game loop, whenever it's one players turn, run a dom function that disables the other players' ability to input.

--user can start the game without placing any ships.

--when selecting a ship to place, the ship selections seem to "stack" on each other each time a new one is clicked. This can be seen by looking at the hover coordinates logged to the console.
    --fix
        add the event listener only the first time a ship is selected.
        from then on, every time a selection is made, only change the number of ships variable. The event listener is always active.



Refactoring:
-- change all of the vert and horiz in code to x and y

