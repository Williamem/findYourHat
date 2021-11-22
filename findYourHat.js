const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this.field = field;
    }
    static generateField(height, width, percentHoles) {
        /*let height = height;
        let width = width;
        let percentHoles = percentHoles;*/
        let numCharacters = height * width;
        let numHoles = numCharacters * (percentHoles / 100);
        let numFieldCharacters = numCharacters - numHoles - 2;
        let fieldArray = ['*', '^'];
        let fieldArrays = [];
        //create array with all characters to use
        //push holes into character array
        for(let i=0; i<numHoles; i++) {
            fieldArray.push(hole);
        }
        //push fieldCharacters into character array
        for(let i = 0; i<numFieldCharacters; i++) {
            fieldArray.push(fieldCharacter)
        }
        //randomize fieldArray
        for (let i = fieldArray.length - 1; i > 1; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [fieldArray[i], fieldArray[j]] = [fieldArray[j], fieldArray[i]];
        }
        console.log(fieldArray);
        //ovanför fungerar, nedanför är experiemnt
        //spit into multiple arrays
        for(let i=0; i<fieldArray.length; i+=height) {
            fieldArrays.push(fieldArray.slice(i, i+width));
        }
        console.log(fieldArrays.join(''));
    }
}

const myField = new Field(Field.generateField(10, 10, 10));
