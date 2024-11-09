import { expect, test } from 'vitest'
import { Coordinate, Model } from './model'
import exp from 'constants'

test('Home', async () => {
    let m: Model = new Model(0)
    expect(m.board.letters[0][0]).toBe("")
}
)

test('UpdateConfig should reset board and words when changed', () => {
    const model = new Model(0)

    const initialWords = [...model.words] 
    model.updateConfig(1) 

    expect(model.words).not.toEqual(initialWords) 
    expect(model.board.letters).not.toEqual([]) 
})


test('updateConfig should change to configuration 1', () => {
    let m: Model = new Model(0)
    m.updateConfig(1)
    expect(m.board.letters[0][1]).toBe("L")
    expect (m.contents(0,1)).toBe("L")
    expect(m.getConfig()).toBe(1)
}
)

test('updateConfig should change to configuration 2', () => {
    let m: Model = new Model(0)
    m.updateConfig(2)
    expect(m.board.letters[0][1]).toBe("K")
    expect (m.contents(0,1)).toBe("K")
    expect(m.getConfig()).toBe(2)
}
)

test('updateConfig should change to configuration 2', () => {
    let m: Model = new Model(0)
    m.updateConfig(3)
    expect(m.board.letters[0][1]).toBe("C")
    expect (m.contents(0,1)).toBe("C")
    expect(m.getConfig()).toBe(3)
}
)

test('moveContent used to 0,1 and 0,0, should append to EL and empty selected square', () => {
    let m: Model = new Model(1)
    let row: number = 0
    let column: number = 1
    m.setSelectedSquare(0,0)
    let selected = m.getSelectedSquare()
    if(selected){
    m.moveContent(row, column, selected)
    }
    expect(m.contents(0,1)).toBe("EL")
    expect(m.contents(0,0)).toBe("")
}
)

test('setSelectedSquare should update the selected square', () => {
    const model = new Model(1)

    const result1 = model.setSelectedSquare(0, 0)
    expect(result1).toBe(true) 

    const selected = model.board.selectedSquare
    expect(selected).toBeInstanceOf(Coordinate)
    expect(selected?.row).toBe(0)
    expect(selected?.column).toBe(0)

    const result2 = model.setSelectedSquare(0, 0)
    expect(result2).toBe(false) 
})

test('isAdjacent should return true for adjacent squares', () => {
    const model = new Model(1)
    expect(model.isAdjacent(0, 0, 0, 1)).toBe(true) 
    expect(model.isAdjacent(0, 0, 1, 0)).toBe(true)
    expect(model.isAdjacent(0, 0, 1, 1)).toBe(false) 
})

test('isSquareEmpty should return true for empty squares', () => {
    const model = new Model(0)

    expect(model.isSquareEmpty(0, 0)).toBe(true)
    model.board.letters[0][0] = 'A'
    expect(model.isSquareEmpty(0, 0)).toBe(false)
})

test('isSelected', () => {
    const model = new Model(1)
    model.setSelectedSquare(0, 0)
    expect(model.isSelected(0,0)).toBe(false)
}
)