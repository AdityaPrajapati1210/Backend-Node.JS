import React from "react";
import { Link } from "react-router-dom";
import store from "../../store/store";
import authSlice from "../../store/authSlice"
import { useSelector } from "react-redux";

const Header = ()=>{
    
    const isLoggedIn = useSelector((state) => state.auth.status);

    return (
        <header className="h-16 w-full bg-gray-700 text-white flex justify-between items-center px-6">

            <div className="text-2xl font-bold">
                Logo
            </div>

            <nav>
                <ul className="flex gap-6 items-center">

                    <li>
                        <Link to="/">
                            Home
                        </Link>
                    </li>

                    {!isLoggedIn && (
                        <li>
                            <Link to="/login">
                                Login
                            </Link>
                        </li>
                    )}

                    {isLoggedIn && (
                        <li>
                            <button>
                                Logout
                            </button>
                        </li>
                    )}

                </ul>
            </nav>

        </header>
    );
}

export default Header

