// const sum = (a: number, b: number) => a + b;
// const sub = (a: number, b: number) => a - b;
// const mult = (a: number, b: number) => a * b;
// const div = (a: number, b: number) => a / b;

export type ActionsType = {
  type: "SUM-OPERANDS" | "SUB-OPERANDS" | "MULT-OPERANDS" | "DIV-OPERANDS";
  payload: number;
};

// const actionCreator = (type: string, payload: number) => {
//   return {
//     type: type,
//     payload: payload,
//   };
// };

// const mathOperationAction: MathOperationActionType = {
//   SUM_OPERANDS: "SUM-OPERANDS",
//   SUB_OPERANDS: "SUB-OPERANDS",
//   MULT_OPERANDS: "MULT-OPERANDS",
//   DIV_OPERANDS: "DIV-OPERANDS",
// };

const initialState: number = 0;

export const mathOperationReducer = (
  state: number = initialState,
  action: ActionsType
) => {
  switch (action.type) {
    case "SUM-OPERANDS": {
      return state + action.payload;
    }
    case "SUB-OPERANDS": {
      return state - action.payload;
    }
    case "MULT-OPERANDS": {
      return state * action.payload;
    }
    case "DIV-OPERANDS": {
      return state / action.payload;
    }
    default: {
      return state;
    }
  }
};
