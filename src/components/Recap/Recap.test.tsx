import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import { Results } from "../../models/models";

import { Recap } from "./Recap";

it("render results", () => {

  const fakeNewGame = jest.fn();
  const fakeResultData: Results = { likes: 1, dislikes: 2, skipped: 3, seen: 6 };

  render(<Recap manageNewGame={fakeNewGame} resultData={fakeResultData} />);
  const likeText = screen.getByTestId('likes').textContent ?? '0';
  expect(parseInt(likeText)).toBe(fakeResultData.likes);

  const dislikeText = screen.getByTestId('dislikes').textContent ?? '0';
  expect(parseInt(dislikeText)).toBe(fakeResultData.dislikes);

  const skippedText = screen.getByTestId('skipped').textContent ?? '0';
  expect(parseInt(skippedText)).toBe(fakeResultData.skipped);

  const seenText = screen.getByTestId('seen').textContent ?? '0';
  expect(parseInt(seenText)).toBe(fakeResultData.seen);
});

it("fire restart", () => {

  const fakeNewGame = jest.fn();
  const fakeResultData: Results = { likes: 1, dislikes: 2, skipped: 3, seen: 6 };

  render(<Recap manageNewGame={fakeNewGame} resultData={fakeResultData} />);
  const newGameBtn = screen.getByRole('button')
  fireEvent.click(newGameBtn);
  expect(fakeNewGame).toBeCalled();
});