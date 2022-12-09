const fs = require('fs');

// Read from input.txt
const getInput = () => fs.readFileSync(`${__dirname}/input.txt`).toString().split('\n');

const sum = (arr) => arr.reduce((memo, n) => (memo + n), 0)

// Solve the puzzle and output the solution
const main = () => {
    const lines = getInput();

    // part 1
    const priorities1 = [];
    for (const line of lines) {
        const size = line.length;
        const comp1 = line.slice(0, size / 2).split("")
        const comp2 = line.slice(size / 2).split("")
        const same = comp1.filter(c => comp2.includes(c))[0]
        const code = same.charCodeAt(0);
        const priority = code < 97 ?  code - 38 : code - 96;
        priorities1.push(priority);
    }

    // part 2
    const priorities2 = [];
    let group = [];
    for (const i in lines) {
        const line = lines[i];
        group.push(line);
        if (i % 3 === 2) {
            const common = group[0]
                .split("")
                .filter(c => group[1].split("").includes(c))
                .filter(c => group[2].split("").includes(c))[0];
            const code = common.charCodeAt(0);
            const priority = code < 97 ?  code - 38 : code - 96;
            priorities2.push(priority)
            group = []
        }
    }

    console.log(sum(priorities1))
    console.log(sum(priorities2))
}

main();
