const fs = require('fs');

// Read from input.txt
const getInput = () => fs.readFileSync(`${__dirname}/input.txt`).toString().split('\n');

// Solve the puzzle and output the solution
const main = () => {
    const lines = getInput();
    console.log(lines);
}

main();