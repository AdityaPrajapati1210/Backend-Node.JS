import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const {isLoggedin, setIsLoggedin,name,setName} = useContext(UserContext);
    const Navigate = useNavigate();

    function handleLogin(){
        setIsLoggedin(true);
        Navigate("/profile");
    }

    return (
        <div>
            <label htmlFor="name">Enter your name</label>
            <input
                type="text"
                id="name"
                placeholder="name.....?"
                onChange={(e)=>setName(e.target.value)}
            />
            <button
                className="bg-blue-500 p-1 rounded-2xl text-white"
                onClick={handleLogin}
            >Login</button>
        </div>
    )
}