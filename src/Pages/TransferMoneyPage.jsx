import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import {auth, collection , db, doc, getDoc, getDocs, updateDoc} from './../Auth/Firebase'
import { toast, ToastContainer } from 'react-toastify'

const TransferMoneyPage = () => {
  const navigate = useNavigate()
  const [benificiaryData , setbenificiaryData] = useState(null)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
      } = useForm()
    
      const onSubmit = async(data) => {
        setbenificiaryData(data)
        reset()
        
    }

    const FetchData=async()=>{
  
      try{
        const querySnapshot = await getDocs(collection(db, "userData"));
        let userData = null
            querySnapshot.forEach((doc) => {
              if(doc.id === benificiaryData?.accnum){

                 userData = doc.data()
              }
            });
            if(userData){
              setbenificiaryData({...benificiaryData,userData})
              console.log(benificiaryData)
            }
      } catch(e){
        console.log(e)
      }
    }

    const updateOwner = async(userid)=>{
     
      try{

        const docRef = doc(db, "userData", userid);
        
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
          
          const prevAmount = docSnap.data().amount

          const newAmount = Number(prevAmount) - Number(benificiaryData.amount)
         
         
          await updateDoc(docRef , {
            amount:newAmount
          })
        }
    
        }
        catch(error){
          console.log(error)
        }
    }
    const updateBenificiary = async()=>{
     
      try{

        const docRef = doc(db, "userData", benificiaryData?.accnum);
        
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
          
          const prevAmount = docSnap.data().amount

          const newAmount = Number(prevAmount) + Number(benificiaryData.amount)
         
         
          await updateDoc(docRef , {
            amount:newAmount
          })
        }
    
        }
        catch(error){
          console.log(error)
        }
    }

    const success=()=>{
      

      {toast.success('Payment Sended Successfully') } 
      setTimeout(()=>{
        navigate('/home')
      },3000)
    }
       
    useEffect(()=>{
        if(benificiaryData?.accnum){

          FetchData()
        }

    },[benificiaryData?.accnum])
    useEffect(()=>{

      const userid = auth.currentUser
      const user = userid?.uid

       if(user && benificiaryData?.amount){

             updateOwner(user) 
             
       }
        
       
    },[benificiaryData?.amount])
    useEffect(()=>{

       if(benificiaryData){

             updateBenificiary()
             
       }
        
       
    },[benificiaryData?.amount])
    
  return (
    <>
   <div className='flex gap-10 justify-around'>
   <div className='flex justify-center items-center h-screen'>
              <div className='w-[600px] h-[800px] border border-purple-400 rounded-md flex flex-col gap-10'>

              <div>

                <h1 className='text-4xl text-purple-300 font-light text-center'>Send Money</h1>

              </div>
              <hr />

              <div className=''>

              <form className='flex flex-col justify-center items-center gap-6' onSubmit={handleSubmit(onSubmit)}>
    
              <label className=' mr-[22%] text-xl font-light' htmlFor="email">Bank Name</label>
              <input type='text'  className={`w-60 h-12 rounded-lg border bg-purple-700 text-black text-xl font-light border-purple-500 outline-none pl-6 ${errors.bank ? 'border-red-600' : ''}`} placeholder='Enter Bank Name' {...register("bank", { required: true })} />
    
              <label className=' mr-[15%] text-xl font-light' htmlFor="email">Account-Number</label>
              <input type='text'  className={`w-60 h-12 rounded-lg border bg-purple-700 text-black text-xl font-light border-purple-500 outline-none pl-6 ${errors.accnum ? 'border-red-600' : ''}`} placeholder='Enter Account Number' {...register("accnum", { required: true })} />

              <label className=' mr-[28%] text-xl font-light' htmlFor="email">Amount</label>
              <input type='number'  className={`w-60 h-12 rounded-lg border bg-purple-700 text-black text-xl font-light border-purple-500 outline-none pl-6 ${errors.amount ? 'border-red-600' : ''}`} placeholder='Enter Amount' {...register("amount", { required: true })} />

              <label className=' mr-[10%] text-xl font-light' htmlFor="email">Purpose Of Payment</label>
              <input type='text'  className={`w-60 h-12 rounded-lg border bg-purple-700 text-black text-xl font-light border-purple-500 outline-none pl-6 ${errors.purpose ? 'border-red-600' : ''}`} placeholder='Enter Purpose' {...register("purpose", { required: true })} />

      
              

                 
  
   

              <input type="submit" className='w-40 h-16 rounded-md bg-purple-500 text-white text-2xl font-light hover:bg-purple-800' />

              </form>

              </div>

              </div>
    </div>
       { benificiaryData !== null &&(
           <div className='flex flex-col gap-4 justify-center items-center h-screen '>
           <h1 className='text-6xl font-light text-purple-300'>Benificary Details</h1>
        <div className='w-[600px] h-[700px] border border-purple-300 rounded-md flex flex-col justify-around'>
               <div className=''>
               <div className='flex flex-col gap-10 items-center'>
              <h1 className='text-4xl text-left text-white font-light uppercase '>{benificiaryData?.userData?.bank}</h1>
              <p className='text-4xl font-light text-black text-left uppercase'>{benificiaryData?.userData?.name}</p>
              <div className={`flex flex-col gap-8`}>
                <h1 className='text-2xl text-white font-light'>Amount: <span className='text-xl font-semibold text-black'>Rs:{benificiaryData.amount}</span></h1>
                <h1 className='text-2xl text-white font-light uppercase'>Account Type: <span className='text-xl font-semibold text-black'>{benificiaryData?.userData?.type}</span></h1>
                <h1 className='text-2xl text-white font-light uppercase'>Purpose: <span className='text-xl font-semibold text-black'>{benificiaryData.purpose}</span></h1>
                <h1 className='text-2xl text-white font-light uppercase'>City: <span className='text-xl font-semibold text-black'>{benificiaryData?.userData?.city}</span></h1>
              </div>
               </div>
           </div>
           <div className='flex justify-center items-center'>
           <button onClick={success} className='w-40 h-16 rounded-md bg-purple-500 text-white text-2xl font-light hover:bg-purple-800'>PayNow</button>
           </div>
        </div>
        </div>
       )

       }
       <ToastContainer/>
   </div>
    </>
  )
}

export default TransferMoneyPage