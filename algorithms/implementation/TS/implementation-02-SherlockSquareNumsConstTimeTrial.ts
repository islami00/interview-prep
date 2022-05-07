// https://www.hackerrank.com/challenges/sherlock-and-squares/problem?utm_campaign=challenge-recommendation&utm_medium=email&utm_source=24-hour-campaign
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
    /**
     * If one were to generate a complete sequence of squares, would it follow this pattern? I.e starting with the basic integers - 0-9, select the perfect squares existing in the series, and then generate a GP sequence for each root of perfect square i.e (1,2(excluding two itself),3(excluding 3 itself), 5 (Excluding 5 itself), etc. 
     */
    const count =  a<=1 ? 1:0;
    // next, we start generating our sequence of ints from base 2-10. (There might be more square bases that are primes, not just 10)
    // It is impossible to generate such a base set statically because of numbers whose roots are prime integers of which are infinitely many.

    const base  = [2,3,5,6,7,10]; 
    const uB = base.findIndex((x)=> x > b);
    const cleanedUp = uB != -1 ? base.slice(0,uB) : base;
    // Generate seq. sum.
    const listOfNs = cleanedUp.map((each) => {
                // Check for the nth term of each the num is starting at the num itself.
                // Special id is a =r
                let a0  =  each;
                let r = a0;
                let aN = b;
                if(a0 > aN) return 0;
                let loga =  Math.log(a0);
                let logr = loga;
                let logaN = Math.log(aN);
                let nWithErr = ((logaN - loga)/logr) + 1;
                // Only half the range matters
                let atoAn = Math.floor(nWithErr/2);
                
                // Check for nth term for a
                aN = a;
                // if(a0 > aN) return 0; Impossible because b > a
                logaN = Math.log(aN);
                nWithErr = ((logaN - loga)/logr) + 1;
                let nToA0 = Math.floor(nWithErr / 2);
                const n = atoAn - nToA0;
                return n;
    });
    const final =  listOfNs.reduce((prev,curr)=> curr+prev,count);
    return final;
    // O(n) time. n being the number of els in the array. O(k) space. k being length of array at each step.
    
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

