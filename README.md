# Conway's Game of Life

Conway's Game of Life is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states: **live** or **dead** (or **populated** and **unpopulated**).

## Rules

The game progresses in steps, also known as generations. At each step, the state of each cell is determined by the state of its eight neighbors, which are the cells that are horizontally, vertically, or diagonally adjacent. The following transitions occur:

1. **Underpopulation**: Any live cell with fewer than two live neighbours dies, as if by underpopulation.
2. **Survival**: Any live cell with two or three live neighbours lives on to the next generation.
3. **Overpopulation**: Any live cell with more than three live neighbours dies, as if by overpopulation.
4. **Reproduction**: Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

These simple rules lead to complex and often unpredictable patterns, making the Game of Life a fascinating study in emergent behavior.

## How It Works

- The game starts with an initial configuration of live and dead cells on a grid.
- Each cell's state is updated simultaneously based on the rules above, leading to a new generation.
- The process repeats indefinitely, or until a stable pattern emerges.

## Example Patterns

The Game of Life can generate a variety of interesting patterns, including:

- **Still lifes**: Stable patterns that do not change from one generation to the next.
- **Oscillators**: Patterns that cycle through a set of states over multiple generations.
- **Spaceships**: Patterns that move across the grid over time.

## Usage

To play the Game of Life, set up an initial configuration of live and dead cells on the grid and let the simulation run. You can experiment with different initial configurations to see how they evolve over time.

## License

This project is licensed under the MIT License.
