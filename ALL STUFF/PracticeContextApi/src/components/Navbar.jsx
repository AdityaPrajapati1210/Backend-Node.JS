import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
export default function Navbar(){
    const {isLoggedin,setIsLoggedin,setName} = useContext(UserContext);

    function handleLogout(){
        setIsLoggedin(false),
        setName("");
    }


    return(
        <div className="bg-green-400 flex justify-center">
            <ul className="flex gap-4">
                <li>
                    <NavLink to="/" className={({isActive})=>
                    `${(isActive)? "text-blue-500" : "text-gray-600"}`
                    }
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="profile" className={({isActive})=>
                    `${(isActive)? "text-blue-500" : "text-gray-600"}`
                    }
                    >
                        Profile
                    </NavLink>
                </li>
                {!isLoggedin && (
                    <li>
                        <NavLink to="/login">
                            Login
                        </NavLink>
                    </li>
                )}

                {isLoggedin && (
                    <li>
                        <button
                            className="bg-blue-500 p-1 rounded-2xl text-white"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </li>
                )}
                <li className="logout hidden">
                    <button className="bg-blue-500 p-1 rounded-2xl text-white" onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </div>
    )
}