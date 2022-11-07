# Advent of Code 2022

These are my solutions to the puzzles on [adventofcode.com](https://adventofcode.com/) for 2022.

## Setup

1. Install [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) to manage node versions
2. Install node LTS
   ```
   nvm install --lts
   nvm use --lts
   ```
3. Check that node works
   ```
   node --version
   ```

## Usage

### Viewing solutions

In any dayXX folder, run the script to output the puzzle's solutions:

```
node main.js
```

### Setting up a new day

On a new day, copy the skeleton and fetch the input when it's available.

```bash
# Copy the skeleton
mkdir day99
cp -r day00 day99

# Fetch input (the positional arg is the day number)
node getInput.js 99 > day99/input.txt
```
