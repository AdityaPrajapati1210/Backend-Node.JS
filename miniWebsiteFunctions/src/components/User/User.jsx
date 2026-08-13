import React from "react";
import { useParams } from "react-router-dom";

function User(){
    const {userid} = useParams();
    return (
        <h1 className="bg-gray-700 text-center text-3xl text-white font-bold">User:{userid}</h1>
    )
};


export default User;