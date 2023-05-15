import { getAuth, updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { toast } from 'react-toastify';

export default function Profile() {
  const auth = getAuth()
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false)

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const {name, email} = formData //need to destructure to have access to each value 

  function onLogOut(){
    auth.signOut()
    navigate("/");
  }

  function onChange(e){
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id] : e.target.value, 
    }));
  }

   async function onSubmit(){
    try {
      if(auth.currentUser.displayName !== name){
        //update display name in firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        //update name in firestore
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef,{
          name,
        });
      }
      
      toast.success("Profile details updated");
    } catch (error) {
      toast.error("Could not update profile details")
    }
  }

  return (
    <>
    <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
      <h1 className="text-3xl text-center my-6 font-bold">My Profile</h1>
      <div className="lg:w-[60%] md:w-[50%] mt-6 px-3">
        <form>
          <input type="text" id="name" value={name} disabled={!changeDetail} 
          onChange={onChange}
          className={`w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6 ${changeDetail && "bg-gray-200 focus:bg-gray-200"}`}/>
          <input type="email" id="email" value={email} disabled className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6"/>
          <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
            <p onClick={()=> { changeDetail && onSubmit()
              setChangeDetail((prevState) => !prevState) 
            }}

            className="text-red-600 hover:text-red-800 transition ease-in-out duration-200 cursor-pointer">
              {
                changeDetail ? "Apply change" : "Edit name"
              }
            </p>
            <p onClick={onLogOut} className="hover:text-gray-800 transition ease-in-out duration-200 cursor-pointer">Sign Out</p>
          </div>
        </form>
      </div>

    </section>
    </>
  )
}
