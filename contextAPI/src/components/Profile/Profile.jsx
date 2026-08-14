import React from "react";
import { useContext } from "react";
import UserContext from "../../Context/UserContext";

function Profile(){

    const {user} = useContext(UserContext);
    if(!user){
        return (
            <p>chala js bsdk....</p>
        )
    }else{
        return(
            <p>Welcome {user.username}</p>
        )
    }
}

export default Profile;