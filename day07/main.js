const fs = require('fs');

// Read from input.txt
const getInput = () => fs.readFileSync(`${__dirname}/input.txt`).toString().split('$ ').slice(1);

const sum = (arr) => arr.reduce((memo, n) => (memo + n), 0)

const ls = (folder, output) => {
    for (line of output) {
        const [first, second] = line.split(" ")
        if (first === "dir") {
            folder.value.push({
                type: "dir",
                name: second,
                value: [],
                parent: folder
            })
        } else {
            folder.value.push({
                type: "file",
                name: second,
                value: parseInt(first),
                parent: folder
            })
        }
    }
}

const folderSizes = [];

const folderSize = (folder) => {
    let currentSize = 0;
    for (const item of folder.value) {
        if (item.type === "file") {
            currentSize += item.value;
        } else if (item.type === "dir") {
            currentSize += folderSize(item)
        } else {
            throw new Error("kaboom")
        }
    }
    folderSizes.push({
        name: folder.name,
        size: currentSize
    })
    return currentSize
}

// Solve the puzzle and output the solution
const main = () => {
    const commands = getInput();

    const filesystem = {
        type: "dir",
        name: "/",
        value: [],
        parent: null
    };
    
    let current = filesystem;
    for (const command of commands.slice(1)) {
        const commandParts = command.trim().split("\n");
        if (commandParts[0] === 'ls') {
            ls(current, commandParts.slice(1))
        } else if (commandParts.length === 1) {
            const [command, arg] = commandParts[0].split(" ")
            if (command === "cd") {
                if (arg === "..") {
                    current = current.parent;
                } else {
                    for (const item of current.value) {
                        if (item.name === arg) {
                            current = item;
                            break;
                        }
                    }
                }  
            }
        }
    }

    folderSize(filesystem);

    // part 1
    const smallEnough = folderSizes.filter(s => s.size <= 100000)
    const result = sum(smallEnough.map(s => s.size))
    console.log(result)

    // part 2
    const free = 70000000 - folderSizes[folderSizes.length - 1].size;
    const toFree = 30000000 - free;
    const sizes = folderSizes.map(s => s.size);
    sizes.sort((a, b) => a - b)
    for (const size of sizes) {
        if (size >= toFree) {
            console.log(size);
            break;
        }
    }
}

main();