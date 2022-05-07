'use strict';

import { WriteStream, createWriteStream } from "fs";
process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString: string = '';
let inputLines: string[] = [];
let currentLine: number = 0;

process.stdin.on('data', function(inputStdin: string): void {
    inputString += inputStdin;
});

process.stdin.on('end', function(): void {
    inputLines = inputString.split('\n');
    inputString = '';

    main();
});

function readLine(): string {
    return inputLines[currentLine++];
}

/*
 * Complete the 'squares' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER a
 *  2. INTEGER b
 */

function squares(a: number, b: number): number {
    // Write your code here
    // https://math.stackexchange.com/q/548043/1023113
    //  The first comment says:  hb n = int( sqrt(b) ) - int( sqrt(a) ) ?
    // The idea is: 
    /**
     *  Take 1,2,3,4,5,6,.. and then take exponent of 2 of those numbers: 1,4,9,16,25,36,etc. Notice that the number of perfect squares between two given numbers, is the same number as the number of numbers between the sqrt of the two. There are 5 numbers between 6 and 1, and so there are 5 perfect squares between 36 and 1. That's it. You just need to round down the sqrt (this I am not 100% sure, but seems to be good enough approach).
     */
    const aOrigin = Math.sqrt(a);
    const bOrigin= Math.sqrt(b);
    // This didn't work. Was one less for 3,9
    // let count =  Math.floor(bOrigin -  aOrigin); // Numbers between a and b including b.
    const aFloored = Math.floor(aOrigin);
    const bFloored = Math.floor(bOrigin);
    let count  =  bFloored-aFloored;
    if(aOrigin % 1 == 0) count+=1; // Include a in range if applicable.
    return count;
    // O(1) time and space.
   }

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const q: number = parseInt(readLine().trim(), 10);

    for (let qItr: number = 0; qItr < q; qItr++) {
        const firstMultipleInput: string[] = readLine().replace(/\s+$/g, '').split(' ');

        const a: number = parseInt(firstMultipleInput[0], 10);

        const b: number = parseInt(firstMultipleInput[1], 10);

        const result: number = squares(a, b);

        ws.write(result + '\n');
    }

    ws.end();
}
 
