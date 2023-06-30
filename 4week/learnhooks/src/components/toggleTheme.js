import React, { useState, useReducer } from "react";

const initialState = {
    theme: "light",
};

const reducer = (state, action) => {
    switch (action.type) {
        case "TOGGLE_THEME":
            return {
                ...state,
                theme: state.theme === "light" ? "dark" : "light",
            };
        default:
            return state;
    }
};

function ThemeSwitcher() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div>
            <p>테마 생상: {state.theme}</p>
            <button onClick={() => dispatch({ type: "TOGGLE_THEME" })}>Toggle Theme</button>
        </div>
    );
}

export default ThemeSwitcher;
