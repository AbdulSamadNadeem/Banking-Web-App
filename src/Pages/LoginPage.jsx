import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
import {auth , onAuthStateChanged, signInWithEmailAndPassword } from '../Auth/Firebase.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';
const LoginPage = () => {
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
            const userCredentials = await signInWithEmailAndPassword (auth, data.email, data.password)
          
            toast.success('SignIn Successfully')
            navigate('./home')
        }
        catch(error){
            
           toast.error(error.message)
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
       <h1 className='text-6xl font-light text-purple-300'>Login</h1>
       <form className='flex flex-col gap-6 items-center justify-center border-2 border-purple-400 w-[400px] h-[600px]' onSubmit={handleSubmit(onSubmit)}>
        <label className=' mr-[50%] text-xl font-light' htmlFor="email">Email</label>
      <input type='email' id='email' className={`w-60 h-12 rounded-lg border bg-purple-700 text-black text-xl font-light border-purple-500 outline-none pl-6 ${errors.email ? 'border-red-600' : ''}`} placeholder='Enter Your Email' {...register("email", {required:true})} />

      <label className=' mr-[40%] text-xl font-light' htmlFor="email">Password</label>
      <input type='password'  className={`w-60 h-12 rounded-lg border bg-purple-700 text-black text-xl font-light border-purple-500 outline-none pl-6 ${errors.password ? 'border-red-600' : ''}`} placeholder='Enter Your Password' {...register("password", { required: true })} />
     
      

      <input type="submit" className='w-40 h-16 rounded-md bg-purple-500 text-white text-2xl font-light hover:bg-purple-800' />
    </form>
    <ToastContainer/>
       </div>
    </>
  )
}

export default LoginPage