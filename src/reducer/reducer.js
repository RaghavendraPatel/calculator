export const ACTIONS = {
  ADD_NUMBER: "add-number",
  CHOOSE_OPERATION: "choose-operation",
  MINUS_OPERATION: "minus-operation",
  DECIMAL: "decimal",
  CALCULATE: "calculate",
  CLEAR: "clear",
  BACKSPACE: "backspace",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_NUMBER:
      //if clearScreen is true, then we want to clear the screen and start a new number
      if (state.clearScreen) {
        return {
          ...state,
          currentOperand: action.payload.digit,
          clearScreen: false,
        };
      }
      //if currentOperand is null, then we want to start a new number
      if (state.currentOperand === null) {
        return {
          ...state,
          currentOperand: action.payload.digit,
        };
      }
      //if currentOperand is not null, then we want to add a digit to the current number
      if (state.currentOperand.length < 10) {
        //if currentOperand is 0, then we want to replace it with the digit
        if (state.currentOperand === "0") {
          return {
            ...state,
            currentOperand: action.payload.digit,
          };
        } else {
          //if currentOperand is not 0, then we want to append the digit to the currentOperand
          return {
            ...state,
            currentOperand: `${state.currentOperand || ""}${
              action.payload.digit
            }`,
          };
        }
      }
      //if currentOperand is not null and has 10 digits, then we want to ignore the digit
      return state;

    case ACTIONS.DECIMAL:
      //if clearScreen is true, then we want to clear the screen and start a new number
      if (state.clearScreen) {
        return {
          ...state,
          currentOperand: "0.",
          clearScreen: false,
        };
      }
      //if current operand already has a decimal, then we want to ignore the decimal
      if (state.currentOperand?.includes(".")) {
        return state;
      }
      //add a decimal to the current operand
      return {
        ...state,
        currentOperand: `${state.currentOperand || "0"}.`,
      };

    case ACTIONS.MINUS_OPERATION:
      // '-' is a special case, so we need to handle it separately
      // as it can be used to negate a number or to subtract two numbers

      // if clearScreen is true, then we want to clear the screen and start a new number
      if (state.clearScreen) {
        return {
          ...state,
          currentOperand: "-",
          clearScreen: false,
        };
      }

      // if currentOperand is null and previousOperand is null, we want to neate a number
      if (state.currentOperand == null && state.previousOperand == null) {
        return {
          ...state,
          currentOperand: "-",
        };
      }

      if (state.currentOperand == null) {
        //if operation is '-', then we want to ignore the operation
        if (state.operation === "-" || state.operation === null) {
          return state;
        }
        //if operation is '+', then we want to change the operation to '-'
        if (state.operation === "+") {
          return {
            ...state,
            operation: "-",
          };
        }
        return {
          ...state,
          currentOperand: "-",
        };
      }

      if (state.previousOperand == null) {
        // if currentOperand is '-', then we want to ignore the operation
        if (state.currentOperand === "-") {
          return state;
        }
        //if previousOperand is null, then we want to set previousOperand to currentOperand and clear currentOperand  and set operation to '-'
        return {
          ...state,
          operation: "-",
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      //previousOperand is not null and currentOperand is not null evaluate the expression and set previousOperand to the result and clear currentOperand and set operation to '-'
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: "-",
        currentOperand: null,
      };

    case ACTIONS.CHOOSE_OPERATION:
      //if previousOperand is null and currentOperand is null, then we want to ignore the operation
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }
      //if currentOperand is null amd previousOperand is not null, then we want to set the operation
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: action.payload.operation,
        };
      }

      if (state.previousOperand == null) {
        //if previousOperand is null and currentOperand is '-', then we want to ignore the operation
        if (state.currentOperand === "-") {
          return state;
        }
        //if previousOperand is null, then we want to set previousOperand to currentOperand and clear currentOperand and set operation to the operation
        return {
          ...state,
          operation: action.payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      if (state.currentOperand === "-") {
        //if previousOperand is not null and currentOperand is '-', then we want to change the operation
        return {
          ...state,
          currentOperand: null,
          operation: action.payload.operation,
        };
      }
      //previousOperand is not null and currentOperand is not null evaluate the expression and set previousOperand to the result and clear currentOperand and set operation to the operation
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: action.payload.operation,
        currentOperand: null,
      };

    case ACTIONS.CALCULATE:
      //if any of the required fields are null, then we want to ignore the operation
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }
      //set clearScreen to true, set currentOperand to the result of the expression, set operation to null and clear previousOperand
      return {
        ...state,
        clearScreen: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };

    case ACTIONS.CLEAR:
      //clear all the fields
      return {
        currentOperand: null,
        previousOperand: null,
        operation: null,
      };

    case ACTIONS.BACKSPACE:
      //if currentOperand then remove the last digit
      return { ...state, currentOperand: state.currentOperand?.slice(0, -1) };
    default:
      return state;
  }
};

const evaluate = ({ previousOperand, currentOperand, operation }) => {
  //convert the strings to numbers
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  //if either of the numbers are NaN, then return NaN
  if (isNaN(prev) || isNaN(current)) return "NaN";
  if (operation === "÷") {
    //if dividing by 0, then return Math Error
    if (current === 0) return "Math Error";
    return (prev / current).toString();
  }

  let computation = eval(`${prev} ${operation} ${current}`);

  if (computation.toString().length > 10) {
    //if the result is too long, then return it in exponential form
    return computation.toExponential(5).toString();
  }
  return computation.toString();
};
