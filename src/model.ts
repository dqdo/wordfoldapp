
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

    /** which is zero-based. */
    constructor(which: number) {
        this.chosen = which
        let puzzle = this.configs[this.chosen]
        let board = new Board()
        this.words = []
        this.moveCounter = 0
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

    unselectSquare(): boolean {
        this.board.selectedSquare = undefined;
        return true;
    }

    makeEmpty(row: number, column: number): boolean {
        this.board.letters[row][column] = "";
        return true;
    }

    appendContent(row: number, column: number, selected: Coordinate): boolean {

        if ((this.contents(selected.row, selected.column).length + this.board.letters[row][column].length) > 6){
            return false;
        }
        this.board.letters[row][column] = this.contents(selected.row, selected.column) + this.board.letters[row][column];
        this.moveCounter++;
        return true;
    }

    isAdjacent(row: number, column: number, selectedRow: number, selectedColumn: number) : boolean {
        const rowDiff = Math.abs(row - selectedRow);
        const colDiff = Math.abs(column - selectedColumn);
        return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
    }

    appendedLessThanSixLetters(row: number, column: number, selected: Coordinate): boolean {
        if ((this.contents(selected.row, selected.column).length + this.board.letters[row][column].length) > 6){
            return false;
        }
        return true;
    }

    lessThanSixLetters(row: number, column: number): boolean{
        if (this.contents(row, column).length < 6){
            return true;
        }
        return false;
    }

}