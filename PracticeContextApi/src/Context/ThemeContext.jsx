import React, { createContext, useState } from "react";

export const ThemeContext = createContext({
    themeMode="light",
    darkMode=()=>{},
    lightMode=()=>{}
});

export const ThemeContextProvider = ({children})=>{
    const [themeMode,setThemeMode] = useState("light");

    return (
        <ThemeContext.Provider value={themeMode,setThemeMode,darkMode,lightMode}>
            {children}
        </ThemeContext.Provider>
    )
}