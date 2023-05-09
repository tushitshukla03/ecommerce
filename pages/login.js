import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function Login() {
  return (
    <div><section className="bg-gray dark:bg-white-900">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto -my-28 md:h-screen lg:py-0">
        <Link href={'/'} className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <Image height={20} width={100} src='/logo.svg' className='mx-10' alt=''/> 
        </Link>
        <div className="w-full bg-gray rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create  account
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                    <div>
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                    </div>
                    <div>
                        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                    </div>
                    <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don't have an account? <Link href={'/signup'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">SignUp here</Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
  </section></div>
  )
}

export default Login