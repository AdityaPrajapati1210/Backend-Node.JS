import React from "react";
import { useState } from "react";
import UserContext from "../../Context/UserContext";
import { useContext } from "react";


function Login(){
    const [username ,setUsername] = useState('');
    const [password ,setPassword] = useState('');
    const {setUser} = useContext(UserContext);

    const handler=(e)=>{
        e.preventDefault();
        setUser({username,password});

    }

    return (
        <div>
            <input type="text" placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            &nbsp;
            <input type="text" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={handler}>Submit</button>
        </div>
    )
}

export default Login;