import React, { createContext, useContext, useState } from "react";

export const ThemeContext = createContext({
    themeMode : "light",
    darkTheme:()=>{},
    lightTheme:()=>{}
});


export const ThemeContextProvider = ({children})=>{
    const [themeMode ,setThemeMode] = useState("light");
    function darkTheme(){
        setThemeMode("dark");
    }
    function lightTheme(){
        setThemeMode("light");
    }



    return(
        <ThemeContext.Provider value={{themeMode,setThemeMode,lightTheme,darkTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default  function useTheme(){
    return useContext(ThemeContext);
}
