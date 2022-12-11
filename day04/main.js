const fs = require('fs');

// Read from input.txt
const getInput = () => fs.readFileSync(`${__dirname}/input.txt`).toString().split('\n');

// Solve the puzzle and output the solution
const main = () => {
    const lines = getInput();

    let duplicates = 0;
    let overlaps = 0;
    for (const line of lines) {
        const [range1, range2] = line.split(",");
        const [start1, end1] = range1.split("-").map(s => parseInt(s));
        const [start2, end2] = range2.split("-").map(s => parseInt(s));

        if ((start1 <= start2 && end1 >= end2) || (start2 <= start1 && end2 >= end1)) {
            duplicates += 1;
            overlaps += 1;
        } else if ((start1 <= start2 && end1 >= start2) || (start1 >= start2 && start1 <= end2)) {
            overlaps += 1;
        }
    }
    console.log(duplicates);
    console.log(overlaps);
}

main();