import Buttons from "./components/Buttons";
import Screen from "./components/Screen";
import "./App.scss";
import { useReducer } from "react";
import {reducer} from "./reducer/reducer";


const initialState = {
  currentOperand: null,
  previousOperand: null,
  operation: null,
  clearScreen: false,
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <div className="calculator">
        <div className="head">
          <img src="data:image/png;base64,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" alt="" />
          <div className="solar">
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell"></div>
          </div>
        </div>
        <Screen state={state} />
        <Buttons dispatch={dispatch} />
      </div>
    </div>
  );
}

export default App;
