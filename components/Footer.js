import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '../public/logo.svg'

function Footer() {
  return (
    <div><footer className="px-4 py-8  text-gray-400">
	<div className="container flex flex-wrap items-center justify-center mx-auto space-y-4 sm:justify-between sm:space-y-0">
		<div className="flex flex-row pr-3 space-x-4 sm:space-x-8">
			<div className="flex items-center justify-center flex-shrink-0 w-18 h-18 rounded-full ">
				<Image src={logo} className='h-20 w-20'/>
			</div>
			<ul className="flex flex-wrap items-center space-x-4 sm:space-x-8">
				
			</ul>
		</div>
		<ul className="flex flex-wrap pl-3 space-x-4 sm:space-x-8">
		<li>
		<Link rel="noopener noreferrer" href="/termsOfUse">Terms of Use</Link>
	    </li>
			<li>
				<a rel="noopener noreferrer" href="#">Instagram</a>
			</li>
			<li>
				<a rel="noopener noreferrer" href="#">Twitter</a>
			</li>
		</ul>
	</div>
</footer></div>
  )
}


export default Footer