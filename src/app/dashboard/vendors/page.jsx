'use client';
// import { useRouter } from 'next/router'

import React from 'react'
import {BsPersonFill, BsThreeDotsVertical} from 'react-icons/bs'
import { isLoggedIn } from '@/app/components/auth';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';


function getDate(userDate){
    var userTime = new Date(userDate).getTime()
    const date = new Date(userTime);
    return date.toDateString();
}

const page = () => {
    const router = useRouter()

  if(!isLoggedIn())
  {
    router.push('/')
  }

  //const router = useRouter()
  const [Vendors, setVendors] = useState([])
  const token = localStorage.getItem('token')
  const username = localStorage.getItem('username')
  const url = "http://localhost:5000/user/get-all-vendor-verification"

  useEffect(() =>{
    async function fetchVendors(){
        const options = {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization:token
            },
        }

        try {
            const response = await fetch(url,options)
            const data = await response.json()
            //DATA has been fetched
            setVendors(data.vendorVerifications)
        } catch (error) {
            console.log(error)
        }
    }
    fetchVendors()
    
  },[])

const handleVendorClick = (vendorid) =>{
    router.push(`/dashboard/vendors/${vendorid}`)
}

// const handleVendorClick = (user) => {
//     const userIdString = String(user._id);
//     router.push({
//       pathname: `/vendors/${(userIdString)}`,
//       query: { user: JSON.stringify(user) },
//     });
//   };

// const handleVendorClick = (vendor) => {
//     const vendorString = encodeURIComponent(JSON.stringify(vendor));
//     const url = `/vendors/${vendor._id.toString()}?vendor=${vendorString}`;
//     console.log("URL is: ",url);
//     router.push(url);
//   };
  
  
  

  
  
  return (
   
    <div className='bg-gray-100 min-h-screen'>
    <div className='flex justify-between p-4'>
        <h2 className='text-gray-600'>Vendors Applying for verification</h2>
        <h2 className='text-gray-600'>Welcome Back {username}</h2>
    </div>
    <div className='p-4'>
        <div className='w-full m-auto p-4 border rounded-lg bg-white'>
            <div className='my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify between cursor-pointer'>
                <span className='text-gray-600'>Name</span>
                <span className='text-gray-600 sm:text-left text-right'>Phone</span>
                <span className='text-gray-600 hidden md:grid'>Date</span>
                <span className='text-gray-600 hidden sm:grid'>Status</span>
            </div>
            <ul>
            {/* {message && <div role="alert" className="fixed top-0 right-0 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded m-4">{message}!</div>}  */}
            {Vendors.map((vendor,_id)=>{
                
            return(<li key={vendor._id} onClick={() => handleVendorClick(vendor._id)} className='bg-gray hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
                        <div className='flex items-center'>
                            <div className='bg-primary-500 p-3 '>
                                <BsPersonFill className='text-white'/>
                            </div>
                            <p className='text-gray-600 pl-4'>{vendor.profile.name}</p>
                        </div>
                        <p className='text-gray-600 sm:text-left text-right'>
                            {vendor.user.phone}
                        </p>
                        <p className='text-gray-600 hidden md:flex'>
                            {getDate(vendor.createdAt)}
                        </p>
                        <div className='sm:flex hidden justify-between items-center'>
                            <p>
                            {vendor.verified ? <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:text-green-400 border border-green-400">Verified</span> :<span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:text-red-400 border border-red-400">Pending Approval</span>}
                            </p>
                            <BsThreeDotsVertical className='hover:bg-gray-300 rounded-lg'/>
                        </div>
                    
                    </li>)
                })}
            </ul>
        </div>
    </div>
</div>
  
  )
}

export default page





{/* <li key={user._id} className='bg-gray hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
                        <div className='flex items-center'>
                            <div className='bg-purple-100 p-3 '>
                                <BsPersonFill className='text-purple-800'/>
                            </div>
                            <p className='pl-4'>{user.fullName}</p>
                        </div>
                        <p className='text-gray-600 sm:text-left text-right'>
                            {user.phoneNumber}
                        </p>
                        <p className='hidden md:flex'>
                            {getDate(user.createdAt)}
                        </p>
                        <p className='hidden md:flex'>
                            {user.designation}
                        </p>
                        <div className='sm:flex hidden justify-between items-center'>
                            <p>
                                {user.verified ? <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:text-green-400 border border-green-400">Approved</span> :<span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:text-red-400 border border-red-400">Pending Approval</span>}
                            </p>
                            <BsThreeDotsVertical onClick={()=>toggleopenDropDown(user._id) } className='hover:bg-gray-300 rounded-lg'/>
                            {openDropDown === user._id && 
                                (<div ref={dropdownRef} className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                                    <button className="w-full block px-4 py-2 text-gray-800 hover:bg-purple-500 hover:text-white" onClick={()=>handleApprove(openDropDown)}>Approve</button>
                                    <button className="w-full block px-4 py-2 text-gray-800 hover:bg-purple-500 hover:text-white" onClick={()=>handleReject(openDropDown)}>Reject</button>
                                </div>)}
                        </div>
                    
                    </li> */}