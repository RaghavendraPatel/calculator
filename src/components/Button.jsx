import React from 'react';
import { ACTIONS } from '../reducer/reducer'
import { BsBackspace } from 'react-icons/bs';


const Button = ({ value, dispatch, type }) => {
    switch (type) {
        case 'number':
            return (
                <button onClick={() => dispatch({type:ACTIONS.ADD_NUMBER,payload:{digit:value}})} className={type} id={value}>
                    {value}
                </button>
            );
        case 'operation':
            return (
                <button onClick={() => dispatch({type:ACTIONS.CHOOSE_OPERATION,payload:{operation:value}})} className={type} id={value}>
                    {value}
                </button>
            );
        case 'equals':
            return (
                <button onClick={() => dispatch({type:ACTIONS.CALCULATE})} className={type} id={value}>
                    {value}
                </button>
            );
        case 'clear':
            return (
                <button onClick={() => dispatch({type:ACTIONS.CLEAR})} className={type} id='Escape'>
                    {value}
                </button>
            );
        case 'backspace':
            return (
                <button onClick={() => dispatch({type:ACTIONS.BACKSPACE})} className={type} id={value}>
                    <BsBackspace />
                </button>
            );
        case 'minus':
            return (
                <button onClick={() => dispatch({type:ACTIONS.MINUS_OPERATION,payload:{operation:value}})} className={type} id={value}>
                    {value}
                </button>
            );
        case 'decimal':
            return (
                <button onClick={() => dispatch({type:ACTIONS.DECIMAL})} className="number" id={value}>
                    {value}
                </button>
            );
        default:
            break;
    }
};

export default Button;
