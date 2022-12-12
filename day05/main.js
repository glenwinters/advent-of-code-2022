const fs = require('fs');

// Read from input.txt
const getInput = () => fs.readFileSync(`${__dirname}/input.txt`).toString().split('\n');

// Solve the puzzle and output the solution
const main = () => {
    const lines = getInput();

    const colCount = (lines[0].length + 1) / 4;

    const towers = [];
    
    const towerInput = lines.slice(0, lines.indexOf("") - 1);
    towerInput.reverse();
    
    for (const line of towerInput) {
        for (let col = 0; col < colCount; col++) {
            const val = line[1 + col * 4];
            if (val !== " ") {
                if (towers[col] !== undefined) {
                    towers[col].push(val)
                } else {
                    towers[col] = [val]
                }
            }
        }
    }

    const towers2 = JSON.parse(JSON.stringify(towers))

    const commands = lines.slice(lines.indexOf("") + 1);

    for (const command of commands) {
        const [, count, , src, , dst] = command.split(" ");
        const towers2Move = [];
        for (let i = 0; i < count; i++) {
            const item = towers[src - 1].pop();
            towers[dst - 1].push(item);

            const item2 = towers2[src - 1].pop()
            towers2Move.push(item2);
        }
        for (const item of towers2Move.reverse()) {
            towers2[dst - 1].push(item);
        }
    }
    const tops = towers.map(col => col[col.length - 1]);
    const tops2 = towers2.map(col => col[col.length - 1]);
    console.log(tops.join(""))
    console.log(tops2.join(""))
}

main();