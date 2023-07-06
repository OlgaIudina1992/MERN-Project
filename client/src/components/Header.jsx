import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Header() {
  const {userInfo, setUserInfo} = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:5000/api/auth/profile", {
      credentials: "include",
    }).then(res => {
      res.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/auth/logout", {
      credentials: "include",
      method: "POST", 
    });
    setUserInfo(null);
  }

    return(
        <header>
        <div className="flex justify-between items-center bg-green-950 text-white gap-2 p-4">
        <Link to={"/"}>
          <div className="cursor-pointer">          
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
            <path d="M4.5 9.75a.75.75 0 00-.75.75V15c0 .414.336.75.75.75h6.75A.75.75 0 0012 15v-4.5a.75.75 0 00-.75-.75H4.5z" />
            <path fillRule="evenodd" d="M3.75 6.75a3 3 0 00-3 3v6a3 3 0 003 3h15a3 3 0 003-3v-.037c.856-.174 1.5-.93 1.5-1.838v-2.25c0-.907-.644-1.664-1.5-1.837V9.75a3 3 0 00-3-3h-15zm15 1.5a1.5 1.5 0 011.5 1.5v6a1.5 1.5 0 01-1.5 1.5h-15a1.5 1.5 0 01-1.5-1.5v-6a1.5 1.5 0 011.5-1.5h15z" clipRule="evenodd" />
          </svg>        
            <h1 className="text-2xl uppercase">A Blog For Tired People</h1> 
            </div>
          </Link> 
            <nav>
          <div>
            {!userInfo?.username ? (<div className="flex justify-end gap-2">
            <Link to={"/login"}>
              <button className="primary">Login</button>
            </Link>
            <Link to={"/register"}>
              <button className="primary">Sign Up</button>
            </Link>
            </div>) : (
              <div className="flex justify-end gap-2">            
              <button onClick={handleLogout} className="primary">Logout</button>     
            <Link to={"/create"}>
              <button className="primary">Post as {userInfo?.username}</button>
            </Link>
            </div>
            )}
          </div>
        </nav>          
        </div>        
      </header>     
    )    
}