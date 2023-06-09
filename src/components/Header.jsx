import React, { useEffect, useState } from 'react'
import {useLocation, useNavigate} from "react-router-dom"
import {getAuth, onAuthStateChanged} from "firebase/auth"

export default function Header() {
    const [pageState, setPageState] = useState("Sign In");
    const auth = getAuth();
    const location = useLocation();
    const navigate = useNavigate();

     function pathMatchRoute(route){
        if(route === location.pathname){
            return true;
        }
     }

     useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if (user) {
                setPageState("Profile")
            }else{
                setPageState("Sign In")
            }
        })
     }, [auth]);

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-40">
        <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
                <div>
                    <img src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg" 
                     alt="logo" 
                     className="h-5 cursor-pointer"
                    onClick={()=> navigate("/")}
                    />
                </div>
                <div>
                    <ul className="flex space-x-10 text-gray-400">
                        <li className={`py-3 text-sm font-semibold cursor-pointer ${pathMatchRoute("/") && "text-black border-b-red-500 border-b-[3px]"}`}
                        onClick={()=> navigate("/")}>
                            Home 
                        </li>
                        <li className={`py-3 text-sm font-semibold cursor-pointer ${pathMatchRoute("/offers") && "text-black border-b-red-500 border-b-[3px]"}`}
                        onClick={()=> navigate("/offers")}>
                            Offers
                        </li>
                        <li className={`py-3 text-sm font-semibold cursor-pointer ${(pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) && "text-black border-b-red-500 border-b-[3px]"}`}
                        onClick={()=> navigate("/profile")}>
                            {pageState}
                        </li>
                    </ul>
                </div>
        </header>
    </div>
  )
}
