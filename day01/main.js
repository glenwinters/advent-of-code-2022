const fs = require('fs');

// Read from input.txt
const getInput = () => fs.readFileSync(`${__dirname}/input.txt`).toString().split('\n');

const sum = (arr) => arr.reduce((memo, n) => (memo + n), 0)

// Solve the puzzle and output the solution
const main = () => {
    const lines = getInput();

    let totals = [];
    let total = 0;
    for (const line of lines) {
        console.log(line)
        if (line === "") {
            totals.push(total)
            total = 0;
        } else {
            total += parseInt(line)
        }
    }
    totals.sort()
    console.log(Math.max(...totals))
    console.log(sum(totals.slice(-3)))
}

main();
