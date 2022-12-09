const fs = require('fs');

// Read from input.txt
const getInput = () => fs.readFileSync(`${__dirname}/input.txt`).toString().split('\n');

const sum = (arr) => arr.reduce((memo, n) => (memo + n), 0)

// key is player + opponent
const resultsByPlay = {
    "RR": "draw",
    "PP": "draw",
    "SS": "draw",
    "SP": "win",
    "RS": "win",
    "PR": "win",
    "PS": "lose",
    "SR": "lose",
    "RP": "lose"
}

const pointsPerResult = {
    "lose": 0,
    "draw": 3,
    "win": 6
}
const pointsPerOption = {
    "R": 1,
    "P": 2,
    "S": 3
}

// 0 lost, 3 draw, 6 win
const points1 = (opponent, player) => {
    const options = ["R", "P", "S"]
    const opponentOption = options[opponent.charCodeAt(0) - 65];
    const playerOption = options[player.charCodeAt(0) - 88];

    return pointsPerOption[playerOption] + pointsPerResult[resultsByPlay[playerOption + opponentOption]];
}

const points2 = (opponent, expected) => {
    const options = ["R", "P", "S"];
    const results = ["lose", "draw", "win"];
    const opponentOption = options[opponent.charCodeAt(0) - 65];
    const expectedResult = results[expected.charCodeAt(0) - 88];


    let playerOption = null;
    for (const option of options) {
        const play =  option + opponentOption;
        if (resultsByPlay[play] === expectedResult) {
            playerOption = option;
            break;
        }
    }

    return pointsPerOption[playerOption] + pointsPerResult[expectedResult];
}

// Solve the puzzle and output the solution
const main = () => {
    const lines = getInput();

    // A - rock, B - paper, C - scissors
    // X - rock, Y - paper, Z - scissors
    // score 1 for rock, 2 for paper, 3 for scissors
    // score 0 if lost, 3 if draw, 6 if you won
    const results1 = [];
    const results2 = [];
    for (const line of lines) {
        results1.push(points1(...line.split(" ")))
        results2.push(points2(...line.split(" ")))
    }
    console.log(sum(results1))
    console.log(sum(results2))
}

main();