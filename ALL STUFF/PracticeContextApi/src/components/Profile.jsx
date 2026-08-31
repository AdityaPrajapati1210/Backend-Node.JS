import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext.jsx";

export default function Profile(){

    const {isLoggedin,name} = useContext(UserContext);

    if(isLoggedin){
        return(
            <h2>Welcome {name} to the your profile</h2>
        )
    }else{
        return(
            <h2>Login First</h2>
        )
    }
}