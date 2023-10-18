import Button from "./Button"
const types = {
    NUMBER: "number",
    OPERATION: "operation",
    MINUS: "minus",
    DECIMAL: "decimal",
    EQUALS: "equals",
    CLEAR: "clear",
    BACKSPACE: "backspace",
  };

//add keyboard support to the calculator
window.addEventListener("keyup", (e) => {
    const key = e.key;
    if (key === "Enter") {
        document.getElementById("=").click();
        return;
    }
    const buttons = document.querySelectorAll(".buttons button");
    buttons.forEach((button) => {
        if (button.id === key) {
        button.click();
        }
    });
});

export default function Buttons({ dispatch }) {
    return (
        <div className="buttons">
        <Button value="C" type={types.CLEAR} dispatch={dispatch} />
        <Button  value = 'Backspace' type={types.BACKSPACE} dispatch={dispatch} />
        <Button value="%" type={types.OPERATION} dispatch={dispatch} />
        <Button value="÷" type={types.OPERATION} dispatch={dispatch} />
        <Button value="7" type={types.NUMBER} dispatch={dispatch} />
        <Button value="8" type={types.NUMBER} dispatch={dispatch} />
        <Button value="9" type={types.NUMBER} dispatch={dispatch} />
        <Button value="*" type={types.OPERATION} dispatch={dispatch} />
        <Button value="4" type={types.NUMBER} dispatch={dispatch} />
        <Button value="5" type={types.NUMBER} dispatch={dispatch} />
        <Button value="6" type={types.NUMBER} dispatch={dispatch} />
        <Button value="-" type={types.MINUS} dispatch={dispatch} />
        <Button value="1" type={types.NUMBER} dispatch={dispatch} />
        <Button value="2" type={types.NUMBER} dispatch={dispatch} />
        <Button value="3" type={types.NUMBER} dispatch={dispatch} />
        <Button value="+" type={types.OPERATION} dispatch={dispatch} />
        <Button value="00" type={types.NUMBER} dispatch={dispatch} />
        <Button value="0" type={types.NUMBER} dispatch={dispatch} />
        <Button value="." type={types.DECIMAL} dispatch={dispatch} />
        <Button value="=" type={types.EQUALS} dispatch={dispatch} />
      </div>
    )
}