/*eslint-disable no-undef*/
import { Ship } from "../modules/ship.js";

const destroyer = Ship(3);

describe("Ship Pieces", () => {
  test("TimesHit increased by 1 after hit", () => {
    destroyer.hit();
    expect(destroyer.timesHit).toBe(1);
  });

  test("isSunk returns defined value", () => {
    expect(destroyer.isSunk()).toBeDefined();
  })

  test("Not sunk after 1 hit", () => {
    expect(destroyer.isSunk()).toBeFalsy();
  });

  test("Ship not sunk - length not same as timesHit", () => {
    destroyer.hit();
    expect(destroyer.isSunk()).toBeFalsy();
  });

  test("Times hit increases accordingly - Ship sunk", () => {
    destroyer.hit();
    expect(destroyer.isSunk()).toBeTruthy();
  })
});