'use client'                              // directive to clarify client-side. Place at top of ALL .tsx files
import React from 'react'

import { Coordinate, Model } from '../model'
import { config } from 'process'

export default function Home() {
  // initial instantiation of the Model comes from the first configuration
  const [model, setModel] = React.useState(new Model(0))
  const [redraw, forceRedraw] = React.useState(0)

  // helper function that forces React app to redraw whenever this is called.
  function andRefreshDisplay() {
    forceRedraw(redraw + 1)
  }

  function handleClick(row: number, column: number) {
    const selected = model.getSelectedSquare();

    if (model.getConfig() == 0) {
      console.log("Please select a configuration")
    }
    else if (model.isSquareEmpty(row, column)) {
      console.log("Cannot click on empty square")
      console.log("Selected Coordinates: (" + model.getSelectedSquare()?.row + "," + model.getSelectedSquare()?.column + ")")
      console.log("Selected Content: " + model.contents(row, column))
      andRefreshDisplay();
    }
    else if (selected && model.isSelected(row, column) && model.isAdjacent(row, column, selected.row, selected.column) && model.appendedLessThanSixLetters(row, column,selected)) {
      moveContent(row, column, selected);
      andRefreshDisplay();
    }
    else if (model.lessThanSixLetters(row, column)) {
      model.setSelectedSquare(row, column);
      andRefreshDisplay()
      console.log("Selected Coordinates: (" + model.getSelectedSquare()?.row + "," + model.getSelectedSquare()?.column + ")")
      console.log("Selected Content: " + model.contents(row, column))
    }
  }

  function moveContent(row: number, column: number, selected: Coordinate) {
    model.appendContent(row, column, selected);
    model.makeEmpty(selected.row, selected.column);
    model.unselectSquare();
  }

  // creates a new model when a configuration is chosen. Changes the current
  // current configuration based on what was chosen.
  function setConfig(config: number) {
    model.updateConfig(config);
    andRefreshDisplay();
    console.log("Current Configuration #" + model.chosen);
  }

  // resets the configuration to its initial state by creating a new model.
  function resetGame(config: number) {
    if (!model.updateConfig(config)) {
      console.log("A configuration must be selected.")
    }
    else {
      model.updateConfig(config)
      andRefreshDisplay();
      console.log("Resetted Configuration #" + model.chosen);
    }
  }

  // change the style for the given square based on model. Space separated string.
  // So "square" is a regular square, while "square selected" is a selected square. Find
  // these CSS definitions inside the global.css file
  function css(row: number, column: number) {
    const selected = model.getSelectedSquare();

    if (selected && selected.row === row && selected.column === column && model.contents(row, column).length > 3) {
      return "square selected adjusted";
    } else if (model.contents(row, column).length > 3) {
      return "square adjusted";
    } else if (selected && selected.row === row && selected.column === column) {
      return "square selected";
    }
    return "square";

  }

  return (
    <div>
      <div className="board-container">
        <div className="board">
          <div className="button-container">
            <button data-testid="0,0" className={css(0, 0)} onClick={() => handleClick(0, 0)}>{model.contents(0, 0)}</button>
            <button data-testid="0,1" className={css(0, 1)} onClick={() => handleClick(0, 1)}>{model.contents(0, 1)}</button>
            <button data-testid="0,2" className={css(0, 2)} onClick={() => handleClick(0, 2)}>{model.contents(0, 2)}</button>
            <button data-testid="0,3" className={css(0, 3)} onClick={() => handleClick(0, 3)}>{model.contents(0, 3)}</button>
            <button data-testid="0,4" className={css(0, 4)} onClick={() => handleClick(0, 4)}>{model.contents(0, 4)}</button>
          </div>
          <div className="button-container">
            <button data-testid="1,0" className={css(1, 0)} onClick={() => handleClick(1, 0)}>{model.contents(1, 0)}</button>
            <button data-testid="1,1" className={css(1, 1)} onClick={() => handleClick(1, 1)}>{model.contents(1, 1)}</button>
            <button data-testid="1,2" className={css(1, 2)} onClick={() => handleClick(1, 2)}>{model.contents(1, 2)}</button>
            <button data-testid="1,3" className={css(1, 3)} onClick={() => handleClick(1, 3)}>{model.contents(1, 3)}</button>
            <button data-testid="1,4" className={css(1, 4)} onClick={() => handleClick(1, 4)}>{model.contents(1, 4)}</button>
          </div>
          <div className="button-container">
            <button data-testid="2,0" className={css(2, 0)} onClick={() => handleClick(2, 0)}>{model.contents(2, 0)}</button>
            <button data-testid="2,1" className={css(2, 1)} onClick={() => handleClick(2, 1)}>{model.contents(2, 1)}</button>
            <button data-testid="2,2" className={css(2, 2)} onClick={() => handleClick(2, 2)}>{model.contents(2, 2)}</button>
            <button data-testid="2,3" className={css(2, 3)} onClick={() => handleClick(2, 3)}>{model.contents(2, 3)}</button>
            <button data-testid="2,4" className={css(2, 4)} onClick={() => handleClick(2, 4)}>{model.contents(2, 4)}</button>
          </div>
          <div className="button-container">
            <button data-testid="3,0" className={css(3, 0)} onClick={() => handleClick(3, 0)}>{model.contents(3, 0)}</button>
            <button data-testid="3,1" className={css(3, 1)} onClick={() => handleClick(3, 1)}>{model.contents(3, 1)}</button>
            <button data-testid="3,2" className={css(3, 2)} onClick={() => handleClick(3, 2)}>{model.contents(3, 2)}</button>
            <button data-testid="3,3" className={css(3, 3)} onClick={() => handleClick(3, 3)}>{model.contents(3, 3)}</button>
            <button data-testid="3,4" className={css(3, 4)} onClick={() => handleClick(3, 4)}>{model.contents(3, 4)}</button>
          </div>
          <div className="button-container">
            <button data-testid="4,0" className={css(4, 0)} onClick={() => handleClick(4, 0)}>{model.contents(4, 0)}</button>
            <button data-testid="4,1" className={css(4, 1)} onClick={() => handleClick(4, 1)}>{model.contents(4, 1)}</button>
            <button data-testid="4,2" className={css(4, 2)} onClick={() => handleClick(4, 2)}>{model.contents(4, 2)}</button>
            <button data-testid="4,3" className={css(4, 3)} onClick={() => handleClick(4, 3)}>{model.contents(4, 3)}</button>
            <button data-testid="4,4" className={css(4, 4)} onClick={() => handleClick(4, 4)}>{model.contents(4, 4)}</button>
          </div>
        </div>


        <div className="score-moves-container">
          <label className="score"> {"Score: " + "GOES HERE"}</label>
          <label className="numMoves">{"Number of Moves: " + model.moveCounter}</label>
        </div>
      </div>

      <select className="chooseConfigButton" onChange={(e) => setConfig(Number(e.target.value))}>
        <option value="" disabled selected> Choose a Configuration </option>
        <option value="1"> Configuration #1 </option>
        <option value="2"> Configuration #2 </option>
        <option value="3"> Configuration #3 </option>
      </select>

      <div className='check-reset-container'>
        <button className="resetGameButton" onClick={() => resetGame(model.chosen)}> {"Reset Game"} </button>
        <button className='checkSolutionButton'> {"Check Solution"} </button>
      </div>
    </div>
  )

}
