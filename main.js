const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(height, width, difficuly) {
        this.field = Field.fieldGenerator(height, width, difficuly);
        this.height = height;
        this.width = width;
        this.difficulty = difficuly;
        //console.log(this.field);
    }
    //generate the field
    static fieldGenerator(height, width, difficulty) {
        let tempField = [hat];
        //calculate total number of characters to use
        const fieldSize = height * width;
        //calculate number of holes
        const numHoles = fieldSize * (difficulty / 100);
        //calculate number of fieldCharacters
        const numFieldCharacters = fieldSize - numHoles - 2;
        //empty array to store the final field array
        let field = [];
        //generate field characters
        for(let i=0; i<numFieldCharacters; i++) {
            tempField.push(fieldCharacter);
        }
        //generate holes
        for(let i=0; i<numHoles; i++) {
            tempField.push(hole);
        }
        //randomize field
        for(let i=tempField.length-1; i>1; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tempField[i], tempField[j]] = [tempField[j], tempField[i]];
        }
        //add a path character at beginning of array
        tempField.unshift(pathCharacter);
        //split inoto multiple arrays and save as field
        for(let i=0; i<tempField.length; i+=width) {
            field.push(tempField.slice(i, i+width));
        }
        return field;
    }
    print() {
        for(let i=0; i<this.height; i++) {
            console.log(this.field[i].join(' '));
        }
    }
    play(userInput) {
        let x = 0;
        let y = 0;
        //handle user inputs
        switch(userInput) {
            case 'r': x+=1;
            break;
            case 'l': x-=1;
            break;
            case 'd': y+=1;
            break;
            case 'u': y-=1;
            default: console.log('Use "u" for up, "r" for right and so on');
        }
        //check if move is possible
        if(x<0 || y<0 || x>this.height || y>this.height) {
            console.log('You fell off the playing field, sorry.')
        } else if(this.field[y][x] === hole) {
            console.log('Oops, you fell into a hole');
        } else {
            
        }
        //check if move is possible
        /*if(userInput === 'r') {
            x +=1;
        } else if(userInput === 'l') {
            x -= 1;
        } else if(userInput === 'd') {
            y += 1;
        } else if(userInput === 'u') {
            y -= 1;
        } else {
            console.log('Use "u" for up, "r" for right and so on');
        }*/
    }
}
//create a field
const myField = new Field(20, 5, 90);
//promt user for input
let userInput = prompt('type the direction in which you wish to travel');
myField.play(userInput);
myField.print();