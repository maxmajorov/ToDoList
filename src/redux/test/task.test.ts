import { mathOperationReducer } from "./task";

test("should sum numbers", () => {
  const state = 0;
  const sumAction = {
    type: "SUM-OPERANDS",
    payload: 5,
  };

  const result = mathOperationReducer(state, sumAction);

  expect(result).toBe(5);
});

test("should sub numbers", () => {
  const state = 1000;
  const subAction = {
    type: "SUB-OPERANDS",
    payload: 300,
  };

  const result = mathOperationReducer(state, subAction);
  expect(result).toBe(700);
});

test("should mult numbers", () => {
  const state = 10;
  const multAction = {
    type: "MULT-OPERANDS",
    payload: 5,
  };

  const result = mathOperationReducer(state, multAction);
  expect(result).toBe(50);
});

test("should div numbers", () => {
  const state = 30;
  const divAction = {
    type: "DIV-OPERANDS",
    payload: 3,
  };

  const result = mathOperationReducer(state, divAction);
  expect(result).toBe(10);
});
