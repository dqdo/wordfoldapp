import { expect, test } from 'vitest'
import { render, fireEvent, cleanup, getByText, getByTestId } from '@testing-library/react'

import React from 'react'
import Home from './page'

// to write this kind of test, we need to be able to render canvas, so we need 
// to simply run (once) npm install canvas. Tricky for GUI but these have to 
// be async functions that are cleaned up afterwards. Only for REACT gui
test('Home', async () => {
  const { getByTestId } = render(<Home />)

  const b00 = getByTestId('0,0')
  expect(b00.textContent).toBe("")

  cleanup()
})

test('renders initial configuration message', () => {
  const { getByText } = render(<Home />);
  expect(getByText("Choose a Configuration")).not.toBeNull
  cleanup();
});

test('displays initial score and move count labels', () => {
  const { getByTestId } = render(<Home />);
  
  const scoreLabel = getByTestId('score-label').textContent;
  const movesLabel = getByTestId('num-moves-label').textContent;

  expect(scoreLabel).toContain("Score: 0");
  expect(movesLabel).toContain("Number of Moves: 0"); 

  cleanup();
});

test('reset button resets the game state', () => {
  const { getByTestId, getByText } = render(<Home />);

  const changeConfig = getByTestId("changeConfig") as HTMLSelectElement;

  fireEvent.change(changeConfig, { target: { value: "1" } });
  fireEvent.click(getByTestId('1,0'));
  fireEvent.click(getByTestId('0,0'));

  fireEvent.click(getByTestId('reset-game-button'));

  const scoreLabel = getByTestId('score-label').textContent;
  const movesLabel = getByTestId('num-moves-label').textContent;
  const configMessage = getByText("Choose a Configuration");

  expect(scoreLabel).toContain("Score: 0");
  expect(movesLabel).toContain("Number of Moves: 0");
  expect(configMessage).not.toBeNull();

  cleanup();
});

test("updates configuration when config 1 is selected", () => {
  const { getByTestId, getByText } = render(<Home />);
  
  const changeConfig = getByTestId("changeConfig") as HTMLSelectElement;

  expect(changeConfig.value).toBe("");

  fireEvent.change(changeConfig, { target: { value: "1" } });
  
  expect(changeConfig.value).toBe("1");

  cleanup();

});

test("updates configuration when config 2 is selected", () => {
  const { getByTestId, getByText } = render(<Home />);
  
  const changeConfig = getByTestId("changeConfig") as HTMLSelectElement;

  expect(changeConfig.value).toBe("");

  fireEvent.change(changeConfig, { target: { value: "2" } });
  
  expect(changeConfig.value).toBe("2");

  cleanup();

});

test("calculates score and updates moves correctly in config 1", () => {
  const { getByTestId, getByText } = render(<Home />);

  const changeConfig = getByTestId("changeConfig") as HTMLSelectElement;

  fireEvent.change(changeConfig, { target: { value: "1" } });
  
  fireEvent.click(getByTestId('1,0'));
  fireEvent.click(getByTestId('0,0'));

  const scoreLabel = getByTestId('score-label').textContent;
  const movesLabel = getByTestId('num-moves-label').textContent;

  expect(scoreLabel).toContain("Score: 2");
  expect(movesLabel).toContain("Number of Moves: 1");

  cleanup();

})

test("calculates score and updates move when YELLOW is made for config 1", () => {

  const { getByTestId, getByText } = render(<Home />);

  const changeConfig = getByTestId("changeConfig") as HTMLSelectElement;

  fireEvent.change(changeConfig, { target: { value: "1" } });
  
  // YE
  fireEvent.click(getByTestId('1,0'));
  fireEvent.click(getByTestId('0,0'));
  fireEvent.click(getByTestId('0,0'));

  // YEL
  fireEvent.click(getByTestId('0,1'));
  fireEvent.click(getByTestId('0,1'));

  // YELL
  fireEvent.click(getByTestId('1,1'));
  fireEvent.click(getByTestId('1,1'));

  // YELLO
  fireEvent.click(getByTestId('1,2'));
  fireEvent.click(getByTestId('1,2'));

  // YELLOW
  fireEvent.click(getByTestId('0,2'));

  const scoreLabel = getByTestId('score-label').textContent;
  const movesLabel = getByTestId('num-moves-label').textContent;
  expect(scoreLabel).toContain("Score: 6");
  expect(movesLabel).toContain("Number of Moves: 5");

  cleanup();
}
)

test("calculates score and updates move when FIG is made for config 3", () => {
  const { getByTestId, getByText } = render(<Home />);

  const changeConfig = getByTestId("changeConfig") as HTMLSelectElement;

  fireEvent.change(changeConfig, { target: { value: "3" } });

  // FI
  fireEvent.click(getByTestId('3,0'));
  fireEvent.click(getByTestId('4,0'));

  // FIG
  fireEvent.click(getByTestId('4,0'));
  fireEvent.click(getByTestId('4,1'));

  const scoreLabel = getByTestId('score-label').textContent;
  const movesLabel = getByTestId('num-moves-label').textContent;
  expect(scoreLabel).toContain("Score: 3");
  expect(movesLabel).toContain("Number of Moves: 2");

  cleanup()
}
)

test("calculates score to lose points for config 2", () => {
  const { getByTestId, getByText } = render(<Home />);

  const changeConfig = getByTestId("changeConfig") as HTMLSelectElement;

  fireEvent.change(changeConfig, { target: { value: "2" } });

  fireEvent.click(getByTestId('0,3'));
  fireEvent.click(getByTestId('0,4'));

  fireEvent.click(getByTestId('1,3'));
  fireEvent.click(getByTestId('1,4'));

  const scoreLabel1 = getByTestId('score-label').textContent;
  const movesLabel1 = getByTestId('num-moves-label').textContent;
  expect(scoreLabel1).toContain("Score: 4");
  expect(movesLabel1).toContain("Number of Moves: 2");

  fireEvent.click(getByTestId('1,4'));
  fireEvent.click(getByTestId('0,4'));

  const scoreLabel2 = getByTestId('score-label').textContent;
  const movesLabel2 = getByTestId('num-moves-label').textContent;
  expect(scoreLabel2).toContain("Score: 0");
  expect(movesLabel2).toContain("Number of Moves: 3");

  cleanup()
}
)

test("change between configs", () => {
  const { getByTestId, getByText } = render(<Home />);

  const changeConfig = getByTestId("changeConfig") as HTMLSelectElement;

  fireEvent.change(changeConfig, { target: { value: "1" } });
  expect(changeConfig.value).toBe("1");
  fireEvent.change(changeConfig, { target: { value: "2" } });
  expect(changeConfig.value).toBe("2");

  cleanup()
}
)
