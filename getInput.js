// Usage: node ./getInput.js 1 > day01/input.txt

// Before running the script, replace SESSION_TOKEN with your cookie value from adventofcode.com
const SESSION_TOKEN = '';

const https = require('https');

// Verify 1 numeric positional arg for the day
if (process.argv.length != 3 || !process.argv[2].match(/\d+/)) {
    console.error('Usage: node getInput.js <day>')
    process.exit(0);
}
const day = process.argv[2];

const inputUrl = `https://adventofcode.com`

https.get({
    hostname: 'adventofcode.com',
    port: 443,
    path: `/2022/day/${day}/input`,
    headers: {
        Cookie: `session=${SESSION_TOKEN}`
    }
}, (res) => {
    let data = [];

    res.on('data', chunk => data.push(chunk));

    res.on('end', () => {
        const input = Buffer.concat(data).toString();
        console.log(input);
    })
});
