import React from 'react'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {db} from "../firebase";
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const{name, email, password} = formData; //destructured email and pass from formData
  const navigate = useNavigate();

 function onChange(e){
  setFormData((prevState) => ({
    ...prevState,
    [e.target.id]: e.target.value,
    
  })) //whatever we type will be saved in the formData

 }

 async function onSubmit(e){
  e.preventDefault(); //we dont want refresh
  try {
    const auth = getAuth();
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    updateProfile(auth.currentUser, { displayName: name})
    const user = userCredentials.user
    const formDataCopy = {...formData}
    delete formDataCopy.password
    formDataCopy.timestamp =  serverTimestamp();
    await setDoc(doc(db, "users", user.uid), formDataCopy)
    navigate("/")
  } catch (error) {
    toast.error("Something went wrong with the registration")
  }
 }

 return (
    <section>
      <h1 className=" text-2xl text-center mt-6 font-bold">Sign Up</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[60%] lg:w-[50%] mb-12 md:mb-6">
          <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80" alt="key"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[60%] lg:w-[40%] lg:ml-10">
          <form onSubmit={onSubmit}>
            <input 
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-5" 
              type="text" 
              id="name" 
              value={name} 
              onChange={onChange} 
              placeholder= "Full Name"
           />
            <input 
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-5" 
              type="email" 
              id="email" 
              value={email} 
              onChange={onChange} 
              placeholder= "Email Address"
           />
           <div 
            className="relative mb-6"
           >
            <input 
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" 
                type={showPassword ? "text" : "password"}
                id="password" 
                value={password} 
                onChange={onChange} 
                placeholder= "Password"
            />     
            {
              showPassword ? (
              <AiFillEyeInvisible 
                className="absolute right-3 top-3 text-xl cursor-pointer" 
                onClick={()=>setShowPassword((prevState)=> !prevState)}
              />)
               : 
               (<AiFillEye 
                className="absolute right-3 top-3 text-xl cursor-pointer" 
                onClick={()=>setShowPassword((prevState)=> !prevState)}
              />)
            }       
           </div>
           <div 
            className="flex justify-between whitespace-pre-wrap text-sm sm:text-lg"
           >
            <p className="mb-6">Have an account?
              <Link to="/sign-in" 
               className="text-red-600 hover:text-red-700 transition duration-2000 ease-in-out ml-1"
               >
                Sign In
              </Link>  
            </p>
            <p>
              <Link to="/forgot-password">
                Forgot Password?
              </Link>
            </p>
           </div>
            <button type="submit"
              className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
            >
              Sign Up
            </button>
            <div className="my-4 items-center flex before:border-t before:flex-1  before:border-gray-300 after:border-t after:flex-1  after:border-gray-300">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth />
          </form>

        </div>
      </div>
    </section>
  )
}
