import { expect, test } from 'vitest'
import { Model } from './model'

test('Home', async () => {
        let m:Model = new Model(1)     // start with first configuration
        expect(m.board.letters[0][0]).toBe("E")
    }
)