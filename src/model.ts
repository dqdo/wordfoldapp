
import { config0, config1, config2, config3 } from './puzzle'

export class Coordinate {
    readonly row: number
    readonly column: number

    constructor(row: number, column: number) {
        this.row = row
        this.column = column
    }
}

export class Board {
    letters: string[][]
    selectedSquare: Coordinate | undefined

    constructor() {
        this.letters = []
        for (let r: number = 0; r < 5; r++) {
            this.letters[r] = []
            for (let c: number = 0; c < 5; c++) {
                this.letters[r][c] = ''
            }
        }
        this.selectedSquare = undefined
    }
}

export class Model {
    words: string[]
    board: Board
    readonly configs = [config0, config1, config2, config3]
    chosen: number
    moveCounter: number
    score: number
    emptySquares: number
    solutionChecked: boolean
    victory: boolean

    /** which is zero-based. */
    constructor(which: number) {
        this.chosen = which
        let puzzle = this.configs[this.chosen]
        let board = new Board()
        this.words = []
        this.moveCounter = 0
        this.score = 0
        this.emptySquares = 0
        this.solutionChecked = false
        this.victory = false

        for (let r: number = 0; r < 5; r++) {
            this.words[r] = puzzle.words[r]
            for (let c: number = 0; c < 5; c++) {
                board.letters[r][c] = puzzle.initial[r][c]
            }
        }
        this.board = board
    }

    updateConfig(config: number): boolean {
        this.chosen = config
        let puzzle = this.configs[this.chosen]
        let board = new Board()
        this.words = []
        this.moveCounter = 0
        this.score = 0
        this.emptySquares = 0
        this.solutionChecked = false
        this.victory = false

        if (config == 0) {
            return false;
        }

        for (let r: number = 0; r < 5; r++) {
            this.words[r] = puzzle.words[r]

            for (let c: number = 0; c < 5; c++) {
                board.letters[r][c] = puzzle.initial[r][c]
            }
        }
        this.board = board
        return true;
    }

    getConfig() {
        return this.chosen;
    }

    contents(row: number, column: number) {
        return this.board.letters[row][column]
    }

    isSquareEmpty(row: number, column: number): boolean {
        if (this.board.letters[row][column] == "") {
            return true;
        }
        return false;
    }

    setSelectedSquare(row: number, column: number): boolean {
        if (this.board.selectedSquare && this.board.selectedSquare.row === row && this.board.selectedSquare.column === column) {
            return false;
        }
        this.board.selectedSquare = new Coordinate(row, column);
        return true;
    }

    isSelected(row: number, column: number): boolean {
        if (this.board.selectedSquare && this.board.selectedSquare.row === row && this.board.selectedSquare.column === column) {
            return false;
        }
        return true;
    }

    getSelectedSquare(): Coordinate | undefined {
        return this.board.selectedSquare;
    }

    unselectSquare() {
        this.board.selectedSquare = undefined;
    }

    makeEmpty(row: number, column: number) {
        this.board.letters[row][column] = "";
        this.emptySquares++;
        console.log("Empty Squares: " + this.emptySquares)
    }

    appendContent(row: number, column: number, selected: Coordinate) {

        if ((this.contents(selected.row, selected.column).length + this.board.letters[row][column].length) > 6) {
            return false;
        }
        this.board.letters[row][column] = this.contents(selected.row, selected.column) + this.board.letters[row][column];
        this.moveCounter++;
    }

    moveContent(row: number, column: number, selected: Coordinate): boolean {
        this.appendContent(row, column, selected);
        this.makeEmpty(selected.row, selected.column);
        this.unselectSquare();
        this.calculateScore();
        return true;
    }

    isAdjacent(row: number, column: number, selectedRow: number, selectedColumn: number): boolean {
        const rowDiff = Math.abs(row - selectedRow);
        const colDiff = Math.abs(column - selectedColumn);
        if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
            return true;
        }
        return false;
    }

    appendedLessThanSixLetters(row: number, column: number, selected: Coordinate): boolean {
        if ((this.contents(selected.row, selected.column).length + this.board.letters[row][column].length) > 6) {
            return false;
        }
        return true;
    }

    canMove(row: number, column: number, selected: Coordinate): boolean {
        if (this.isAdjacent(row, column, selected.row, selected.column) && this.appendedLessThanSixLetters(row, column, selected) && this.isSelected(row, column)) {
            return true;
        }
        return false;
    }

    lessThanSixLetters(row: number, column: number): boolean {
        if (this.contents(row, column).length < 6) {
            return true;
        }
        return false;
    }

    calculateScore() {
        let temp = 0;
        const puzzle = this.configs[this.chosen];

        for (let r: number = 0; r < 5; r++) {
            for (let c: number = 0; c < 5; c++) {
                for (let i: number = 0; i < puzzle.words.length; i++) {
                    if (puzzle.words[i].includes(this.contents(r, c)) && this.contents(r, c).length > 1) {
                        console.log("Score: " + temp + " + " + this.contents(r, c).length)
                        temp += this.contents(r, c).length
                    }

                }
            }
        }
        this.score = temp;
    }

    checkWords(): boolean {
        const puzzle = this.configs[this.chosen]
        let currentWords: string[] = [];

        if (this.emptySquares == 20) {
            this.solutionChecked = true;
            for (let r: number = 0; r < 5; r++) {
                for (let c: number = 0; c < 5; c++) {
                    if (this.contents(r, c) != "") {
                        currentWords.push(this.contents(r, c))
                        console.log("Current words: " + currentWords)
                    }
                }
            }

            let sortedPuzzleWords = puzzle.words.sort();
            let sortedCurrentWords = currentWords.sort();
            console.log("Sorted solutions: " + sortedPuzzleWords)
            console.log("Sorted current words: " + sortedCurrentWords)

            for (let i: number = 0; i < puzzle.words.length; i++) {
                if (!currentWords[i].includes(puzzle.words[i])) {
                    console.log(currentWords[i] + " does not match with " + puzzle.words[i])
                    console.log("Defeat")
                    return false;
                }
            }
            console.log("Victory")
            this.victory = true;
            return true;
        }
        return false;
    }

}