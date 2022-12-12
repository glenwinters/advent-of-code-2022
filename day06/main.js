const fs = require('fs');

// Read from input.txt
const getInput = () => fs.readFileSync(`${__dirname}/input.txt`).toString().split('\n');

// Solve the puzzle and output the solution
const main = () => {
    const signal = getInput()[0];
    for (let i = 3; i < signal.length; i++) {
        if (new Set([signal[i - 3], signal[i - 2], signal[i - 1], signal[i]]).size === 4) {
            console.log(i + 1)
            break;
        }
    }

    for (let i = 13; i < signal.length; i++) {
        if (new Set([
            signal[i - 13],
            signal[i - 12],
            signal[i - 11],
            signal[i - 10],
            signal[i - 9],
            signal[i - 8],
            signal[i - 7],
            signal[i - 6],
            signal[i - 5],
            signal[i - 4],
            signal[i - 3],
            signal[i - 2],
            signal[i - 1],
            signal[i]]).size === 14) {
            console.log(i + 1)
            break;
        }
    }
}

main();