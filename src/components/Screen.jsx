export default Screen = ({state})=>{
    return (
        <div className="screen">
            <div className="screen__content">
                <div className="screen__content__result"> {state.previousOperand} </div>
                <div className="screen__content__current"> {state.operation} {state.currentOperand} </div>
            </div>
        </div>
    )
}