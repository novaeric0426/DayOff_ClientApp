"use client"

import { useEffect } from "react";

const Home = () => {
    let name = "Kim Dong Min";
    useEffect(()=>{
        const item = localStorage.getItem('token');
        if(!item){
            console.log("Not Auth!");
        }
        else{
            console.log("Auth!");
        }
    },[])
    return (
        <div>
            <h1 className="title">휴가 관리 프로그램!</h1>
            <p className="title-sub">by {name}</p>
        </div>
    );
}

export default Home;