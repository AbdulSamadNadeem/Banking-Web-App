import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";
import { BsCashStack } from "react-icons/bs";
import { MdAccountBalanceWallet } from "react-icons/md"
import { FaCaretDown } from "react-icons/fa";
import { useNavigate } from 'react-router';
import { CiLogout } from "react-icons/ci";
import { auth, db, doc, onAuthStateChanged ,getDoc ,signOut } from '../Auth/Firebase';

const Home = () => {
  const navigate = useNavigate()
  const [dropdown , setdropdown] = useState(false)
  const [data , setUserData] = useState(null)
  
  const FetchData=async(userid)=>{
  
      try{
    
      const docRef = doc(db, "userData", userid);
     
     
       const docSnap = await getDoc(docRef);
       if(docSnap.exists()){
         setUserData({...docSnap.data(),userid})
       }
      }
      catch(error){
        console.log(error)
      }
    
   }
 const Signout=()=>{
  signOut(auth).then(() => {
    navigate('/')
  }).catch((error) => {
    console.log(error)
  });
 }
  
  useEffect(()=>{
    FetchData()
    onAuthStateChanged(auth, (user) => {
      if (user) {

        const uid = user.uid 
        FetchData(uid)
      }
      else{
        navigate('/home')
      }
  })},[])
  return (
    <>
   <div className='flex justify-center items-center h-screen'>
   <div className='w-[700px] h-[800px] bg-gradient-to-r from-violet-700 to-purple-500 border border-purple-300 rounded-md flex flex-col gap-10 '>
     <button onClick={Signout}><CiLogout className='text-2xl text-white font-bold hover:text-black'/></button>
         <div className='flex flex-col gap-6'>
          <h1 className='text-4xl text-left text-white font-light '>Bombat Chattered Bank</h1>
          <p className='text-4xl font-light text-black text-left'>{data ? data.name :  'Loading...'} </p>
          <div className={`${dropdown ? 'block' : 'hidden'} flex flex-col gap-2`}>
            <h1 className='text-2xl text-white font-light'>Account Number: <span className='text-xl font-semibold text-black'>{data?.userid}</span></h1>
            <h1 className='text-2xl text-white font-light'>Account Type: <span className='text-xl font-semibold text-black'>{data?.type}</span></h1>
            <h1 className='text-2xl text-white font-light'>Bank Branch: <span className='text-xl font-semibold text-black'>{data?.bank}</span></h1>
            <h1 className='text-2xl text-white font-light'>City: <span className='text-xl font-semibold text-black'>{data?.city}</span></h1>
          </div>
          <button onClick={()=>setdropdown(!dropdown)}><FaCaretDown className='text-2xl text-white transition-transform hover:text-black hover:scale-110 duration-200'/></button>
          <hr />
          <h1 className='text-4xl text-center text-white font-bold '>Your Amount</h1>
          <p className='text-3xl font-light text-white text-center'>Rs:{data?.amount}</p>
         </div>
        <div className='flex flex-col gap-10'>
        <div className='flex gap-4 justify-around'>
                  <div className='flex flex-col items-center'>
                    <button onClick={()=>navigate('/send')}><IoIosSend className='text-6xl text-white transform translate hover:text-black hover:scale-110 duration-200'/></button>
                    <h1 className='text-xl font-light text-white'>Send Money</h1>
                  </div>
                  <div className='flex flex-col items-center'>
                  <button><BsCashStack className='text-6xl text-white transform translate hover:text-black hover:scale-110 duration-200'/></button>
                    <h1 className='text-xl font-light text-white'>WithDraw Money</h1>
                  </div>
          </div>
          <div className='flex flex-col gap-4'>
          <div className='flex flex-col items-center'>
          <button><MdAccountBalanceWallet className='text-6xl text-white transform translate hover:text-black hover:scale-110 duration-200'/></button>
                    <h1 className='text-xl font-light text-white'>Check Balance</h1>
                  </div>
          </div>
        </div>
    </div>
   </div>
    </>
  )
}

export default Home