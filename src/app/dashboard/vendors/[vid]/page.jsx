'use client'
import React from 'react'
import {BsPersonFill, BsThreeDotsVertical} from 'react-icons/bs'
import { FcDocument } from "react-icons/fc";
import { useRouter } from 'next/navigation'
import { isLoggedIn } from '@/app/components/auth';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
//import { useParams } from 'next/navigation';

function getDate(userDate){
  var userTime = new Date(userDate).getTime()
  const date = new Date(userTime);
  return date.toDateString();
}


const page = () => {

  const router = useRouter();

  if(!isLoggedIn()){
    router.push('/')
  }

  //get the pathname and then slice to get the vendorid
  const pathname = usePathname();
  const vendorid =  pathname.slice(19)
  

  const [Vendors, setVendors] = useState([])
  const [MainVendor, setMainVendor] = useState([])

  const token = localStorage.getItem('token')
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
            console.log("data.Vendorgre:",data.vendorVerifications)
            setVendors(data.vendorVerifications)
        } catch (error) {
            console.log(error)
        }
    }
    fetchVendors()

  },[])

  useEffect(()=>{
    for (let i = 0; i < Vendors.length; i++) {
      console.log(vendorid,Vendors[i]._id)
                if( vendorid == Vendors[i]._id){
                  setMainVendor([Vendors[i]])
                  console.log("The ids are equal!!")
                  break
                }
    }

  },[Vendors])

  useEffect(()=>{
    console.log("Main vendor is:",MainVendor)
  },[MainVendor])

  
  const totalDocuments = 3
  const submittedDocuments = 3
  const percentageSubmitted = (submittedDocuments / totalDocuments) * 100

  
  function handleApproveVendor(){
    console.log("clciked on approvedddd")
  }
  

  return (
    
  <div className="bg-gray-100 min-h-screen">
    <div className="container mx-auto px-4 flex flex-wrap py-6">
      <div className="w-full md:w-1/3">
        <div className="bg-white rounded-lg shadow-lg p-4">
          {MainVendor.map((vendor,_id)=>{

            return(
              <li key={vendor._id}>
                <div className="text-center">
                <img className="h-32 mx-auto rounded-full"
                  src="https://avatars2.githubusercontent.com/u/24622175?s=60&amp;v=4" alt="Profile Picture"/>
                <h2 className="text-black text-xl font-semibold mt-4">{vendor.profile.name}</h2>
                <p className="mt-2 text-gray-600">{vendor.gstNumber}</p>
                </div>

                <div className="mt-4">
                  <h4 className="text-black text-lg font-semibold">About</h4>
                  <p className="mt-2 text-gray-600">Phone: {vendor.user.phone}</p>
                  <p className="mt-2 text-gray-600">Address: {vendor.profile.address}</p>
                  <p className="mt-2 text-gray-600">Gender: {vendor.profile.gender}</p>
                  <p className="mt-2 text-gray-600">Date joined: {getDate(vendor.createdAt)}</p>
                  <p className="mt-2 text-gray-600">Number of Products: 69</p>
                </div>

            </li>
            )
            
          })}
          </div>
            </div>
          
       
      <div className="w-full md:w-2/3 mt-4 md:mt-0">
        <div className="bg-white rounded-lg shadow-lg p-4 md:ml-4">
          <h2 className="text-black text-xl font-semibold">Documents Submitted</h2>
          <div className="mt-4">
              <ul>
                {MainVendor.map((vendor,_id)=>{
                  return(
                    <li key={vendor._id} className='my-2'>
                      <div className="flex items-center mb-1">
                        <FcDocument className='text-2xl text-primary-600'/>
                        <div className="ml-2 ">
                          <a href={vendor.identificationUrl}><h4 className="text-gray-600 text-base">Identity Proof</h4></a>
                        </div>
                      </div>

                      <div className="flex items-center mb-1">
                        <FcDocument className='text-2xl text-primary-600'/>
                          <div className="ml-2">
                            <a href={vendor.residentitalUrl}><h4 className="text-gray-600 text-base">Residential Proof</h4></a>
                          </div>
                      </div>

                      <div className="flex items-center mb-1">
                        <FcDocument className='text-2xl text-primary-600'/>
                          <div className="ml-2">
                            <a href={vendor.employmentCertificateUrl}><h4 className="text-gray-600 text-base">Employment Certificate</h4></a>
                          </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
                
              
              
                {/* <p className="text-gray-600 mt-4">Document not submitted</p> */}
             
            </div>
            <div className="flex items-center mt-8">
              <div className="w-2/3">
                <div className="bg-gray-200 h-4 rounded-full">
                  <div
                    className="bg-primary-500 h-4 rounded-full"
                    style={{ width: `${percentageSubmitted}%` }}
                  />
                </div>
              </div>
              <div className="w-1/3 text-right ml-4">
                <p className="text-gray-600">
                  {submittedDocuments}/{totalDocuments} documents
                </p>
              </div>
            </div>
            <div className="mt-8">
              <button
                className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded"
                onClick={handleApproveVendor}>
                Verify Vendor
              </button>
            </div>

        </div>
      </div>
    </div>
</div>

  )
}

export default page

