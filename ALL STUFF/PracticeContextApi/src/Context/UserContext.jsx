import React, { createContext, useState } from "react";

export const UserContext = createContext({
    name:"",
    isLoggedin:false
});

export const UserContextProvider = ({children})=>{
    const [name,setName] = useState('');
    const [isLoggedin,setIsLoggedin] = useState(false);

    return (
        <UserContext.Provider value={{name,setName,isLoggedin,setIsLoggedin}}>
            {children}
        </UserContext.Provider>
    )
}
