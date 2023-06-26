'use client'
import React from 'react'
import { useState } from 'react'
// import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {Oval} from "react-loader-spinner";
import { isLoggedIn } from '@/app/components/auth';



export default function Home() {

    const router = useRouter();
    const url = "http://localhost:5000/"
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState('')

    if(isLoggedIn())
    {
        router.push('/dashboard/vendors')
    }
   
    const SubmitHandler= async (e)=>{
        e.preventDefault();
        setIsLoading(true)
        try {
            const options = {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
          }
            const response = await fetch(`${url}admin/login`,options)
            const data = await response.json()
            console.log("Response is: ",data)
            localStorage.setItem('token', data.token)
            localStorage.setItem('username',data.username)
            setIsLoading(false)
            router.push('/dashboard/vendors')

        } catch (error) {
            console.log(error)
        }

    }

  return (
    <section className="bg-gray-100">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
            {/* <img className="w-8 h-8 mr-2" src="/logo.png" alt="logo"/> */}
            Hawkeye Admin    
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                    Sign in to your account
                </h1>
                <form onSubmit={SubmitHandler} className="space-y-4 md:space-y-6" action="#">
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 ">Your username</label>
                        <input onChange={(e)=>setUsername(e.target.value)} value={username} type="username" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="username" required=""/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                        <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required=""/>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="remember" className="text-gray-500 ">Remember me</label>
                            </div>
                        </div>
                        <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                    </div>
                    <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                    {isLoading && (
                        <div className='flex justify-content-center align-items-center'>
                        <Oval height={40} width={40} color='primary'/>
                        {/* type="Oval" color="#00BFFF" height={40} width={40}  */}
                        </div>
                    )}
                </form>
            </div>
        </div>
    </div>
  </section>
  )
}
