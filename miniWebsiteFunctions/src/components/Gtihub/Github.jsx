import React, { useEffect, useState } from "react";


function Github(){
    const [data , setData] = useState([]);

    useEffect(()=>{
        fetch(`https://api.github.com/users/AdityaPrajapati1210`)
        .then((response) => response.json())
        .then((data) =>{
            console.log(data);
            setData(data);
        })
    },[]);
    return(
        <div className="flex flex-col items-center justify-center">
            <h1>Followers : {data.followers}✅</h1>
            <div>
                <img src={data.avatar_url} alt="git picture of user" className="rounded-full outline-2 outline-blue-500" width={200} />
            </div>
        </div>
    )
}

export default Github;