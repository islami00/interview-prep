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
 * Complete the 'appendAndDelete' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING s
 *  2. STRING t
 *  3. INTEGER k
 */

function appendAndDelete(s: string, t: string, k: number): string {
    // Write your code here
    // Two ops. append or delete.
    // Naive approach: delete all from s, and append every char in t to give k.
    // Hence, in constant time we can determine the number by counting the len of s and the len of t and adding them
    
    // const atMost =  s.length + t.length;
    // if( k < atMost) return "No";
    // else return "Yes";
    // Optimal: Check if s is has a substr of t.
    // If s does have a substr of t, then return the index where said substr starts. Or trim from that point to end to get num of dels.
    // Then trim from that point to end to get num of appends on t.
    // Check if s has a substr of t.
    // Find longest pattern.
    let lastMatchingIndex = 0;
    for( let i = 0; i < s.length; i++){
        if(s[i] == t[i]){
            lastMatchingIndex = i;
            continue;
        } else break;
    }
    // Use length diff to find number of dels.
    const numMatching = lastMatchingIndex + 1;
    const dels  =  s.length - numMatching;
    // Use length diff of t to find number of appends.
    const apps =  t.length - numMatching;
    // Optimized upper bd
    const upper =  apps + dels;
    if(k < upper) return "No";
    else return "Yes"
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const s: string = readLine();

    const t: string = readLine();

    const k: number = parseInt(readLine().trim(), 10);

    const result: string = appendAndDelete(s, t, k);

    ws.write(result + '\n');

    ws.end();
}
// https://www.hackerrank.com/challenges/append-and-delete/problem?isFullScreen=true&h_r=next-challenge&h_v=zen
