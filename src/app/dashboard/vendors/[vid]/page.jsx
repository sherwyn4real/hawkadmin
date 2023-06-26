'use client'
import React from 'react'
import { FcDocument } from "react-icons/fc";
import { useRouter } from 'next/navigation'
import { isLoggedIn } from '@/app/components/auth';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {Oval} from "react-loader-spinner";
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
  var IDnumOfProds = ''
  
  

  const [Vendors, setVendors] = useState([])
  const [MainVendor, setMainVendor] = useState([])
  const [isVerified, setIsVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [numOfProds, setnumOfProds] = useState(0)

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

  async function getNumofProds()
    {
    const url = `http://localhost:5000/product/products/vendor/${IDnumOfProds}`
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
          console.log("THE PRODUCT REQUEST IS",data)
          setnumOfProds(data.products.length)
                
      } catch (error) {
          console.log(error)
      }
      
    }

  useEffect(()=>{
    for (let i = 0; i < Vendors.length; i++) {
                if( vendorid == Vendors[i]._id){
                  setMainVendor([Vendors[i]])
                  setIsVerified(Vendors[i].verified)
                  IDnumOfProds = Vendors[i].user._id
                  getNumofProds()
                  console.log("The ids are equal!!")
                  break
                }
    }


  },[Vendors])



  
  // const totalDocuments = 3
  // const submittedDocuments = 3
  // const percentageSubmitted = (submittedDocuments / totalDocuments) * 100

  
  async function handleApproveVendor(){
    
    setIsLoading(true)
    const checkid = MainVendor[0].user._id
    console.log("IDNUMOFPROFSD is:",IDnumOfProds)
    const url = `http://localhost:5000/user/vendor/verify/${checkid}`
    const options = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:token
      },
      body: JSON.stringify({
        verified:true
    }),
  }

  try {
      const response = await fetch(url,options)
      const data = await response.json()
      console.log("THE PATCH REQUEST IS",data)
      setIsLoading(false)
      setIsVerified(true)
      
  } catch (error) {
      console.log(error)
  }

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
                  src={vendor.profile.avatar} alt="Profile Picture"/>
                <h2 className="text-black text-xl font-semibold mt-4">{vendor.profile.name}</h2>
                <p className="mt-2 text-gray-600">GST Number: {vendor.gstNumber}</p>
                </div>

                <div className="mt-4">
                  <h4 className="text-black text-lg font-semibold">About</h4>
                  <p className="mt-2 text-gray-600">Phone: {vendor.user.phone}</p>
                  <p className="mt-2 text-gray-600">Address: {vendor.profile.address}</p>
                  <p className="mt-2 text-gray-600">Gender: {vendor.profile.gender}</p>
                  <p className="mt-2 text-gray-600">Date joined: {getDate(vendor.createdAt)}</p>
                  <p className="mt-2 text-gray-600">Number of Products: {numOfProds}</p>
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
           
            <div className="mt-8">
              

              <button className="bg-primary-500 text-white font-semibold py-2 px-4 rounded" onClick={handleApproveVendor} disabled={isLoading || isVerified}>

                  {isLoading ? (
                          <Oval height={30} width={30} strokeWidth={5} strokeWidthSecondary={4} />
                        ) : isVerified ? (
                          'Vendor Verified!'
                        ) : (
                          'Verify Vendor'
                      )}
              </button>
              
            </div>

        </div>
      </div>
    </div>
</div>

  )
}

export default page

