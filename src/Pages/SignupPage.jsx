import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
import {auth , createUserWithEmailAndPassword ,onAuthStateChanged , db , doc , setDoc} from '../Auth/Firebase.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import {  } from 'firebase/firestore';
const SignupPage = () => {
  const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
      } = useForm()
    
      const onSubmit = async(data) =>{
        try{
            const UserData = {
              name: data?.name.toUpperCase(),
              bank: data?.bank.toUpperCase(),
              city: data?.city.toUpperCase(),
              type:data?.type.toUpperCase(),
              amount:Number(data?.amount)
            } 

            const userCredentials = await createUserWithEmailAndPassword(auth, data.email, data.password)
            const uid = userCredentials.user.uid
            
            
            await setDoc(doc(db, "userData", uid), UserData);
          
            toast.success('Signup Successfully')
            navigate('./home')
        }
        catch(error){
    
           toast.error('Error while Siging User')
        }
        reset()
    } 
    useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
        if (user) {
          navigate('/home')
        }
    })})
     
  return (
    <>
       <div className='flex flex-col gap-4 justify-center items-center h-screen'>
       <h1 className='text-5xl font-light text-purple-300'>SignUp</h1>
       <form className='flex flex-col gap-6 items-center justify-center border-2 border-purple-400 w-[500px] h-[800px]' onSubmit={handleSubmit(onSubmit)}>
        <label className=' mr-[40%] text-xl font-light ' htmlFor="email">Email</label>
      <input type='email' id='email' className={`w-60 h-12 rounded-lg border bg-purple-700 text-black text-xl font-light border-purple-500 outline-none pl-6 ${errors.email ? 'border-red-600' : ''}`} placeholder='Enter Your Email' {...register("email", {required:true})} />

      <label className=' mr-[30%] text-xl font-light' htmlFor="email">Password</label>
      <input type='password'  className={`w-60 h-12 rounded-lg border bg-purple-700 text-black text-xl font-light border-purple-500 outline-none pl-6 ${errors.password ? 'border-red-600' : ''}`} placeholder='Enter Your Password' {...register("password", { required: true })} />
      <label className=' mr-[35%] text-xl font-light' htmlFor="email">Name</label>
      <input type='text' className={`w-60 h-12 rounded-lg border bg-purple-700 text-black text-xl font-light border-purple-500 outline-none pl-6 ${errors.name ? 'border-red-600' : ''}`} placeholder='Enter Your Name' {...register("name", { required: true })} />
     
      <label className=' mr-[25%] text-xl font-light' htmlFor="email">Bank Name</label>
      <input type='text' className={`w-60 h-12 rounded-lg border bg-purple-700 text-black text-xl font-light border-purple-500 outline-none pl-6 ${errors.bank ? 'border-red-600' : ''}`} placeholder='Enter Your Bank Name' {...register("bank", { required: true })} />
     
      <label className=' mr-[20%] text-xl font-light' htmlFor="email">Account-Type</label>
      <input type='text' className={`w-60 h-12 rounded-lg border bg-purple-700 text-black text-xl font-light border-purple-500 outline-none pl-6 ${errors.type ? 'border-red-600' : ''}`} placeholder='e.g:Asaan Account/Current Account ' {...register("type", { required: true })} />
      <label className=' mr-[40%] text-xl font-light' htmlFor="email">City</label>
      <input type='text' className={`w-60 h-12 rounded-lg border bg-purple-700 text-black text-xl font-light border-purple-500 outline-none pl-6 ${errors.city ? 'border-red-600' : ''}`} placeholder='Enter Your Bank Name' {...register("city", { required: true })} />
      <label className=' mr-[30%] text-xl font-light' htmlFor="email">Amount</label>
      <input type='number' className={`w-60 h-12 rounded-lg border bg-purple-700 text-black text-xl font-light border-purple-500 outline-none pl-6 ${errors.amount ? 'border-red-600' : ''}`} placeholder='Enter Your Amount ' {...register("amount", { required: true })} />
     
      

      <input  type="submit" className='w-40 h-16 rounded-md bg-purple-500 text-white text-2xl font-light hover:bg-purple-800' />
    </form>
       </div>
    <ToastContainer/>
    </>
  )
}

export default SignupPage