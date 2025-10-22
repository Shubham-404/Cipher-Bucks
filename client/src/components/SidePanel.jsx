import React from 'react'
import { Link } from 'react-router-dom'
const SidePanel = ({message, text}) => {
    return (
        < div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br bg-indigo-800 bg-[url(/images/background.png)] bg-no-repeat bg-bottom bg-contain bg-blend-color-burn  items-center justify-center p-12" >
            <div className="text-white text-center">
                <Link to="/" className="inline-block mb-8 hover:scale-105 transition-transform">
                    <div className="flex items-center justify-center">
                        <span className=''><img className='h-25 rounded-full' src="/images/logo-no-bg.png" alt="Cipher Bucks Logo" /></span>
                        <div className='h-15 mr-4 w-0.5 bg-white border'></div>
                        <span className='flex flex-col justify-center items-start text-3xl font-semibold'>
                            <span>Cipher</span>
                            <span>Bucks</span>
                        </span>
                    </div>
                </Link>
                <h1 className="text-3xl font-bold mb-4">{message}</h1>
                <p className="text-xl mb-8">{text}</p>
                <p className="text-lg text-blue-100">Simple • Secure • Encrypted</p>
            </div>
        </div >
    )
}

export default SidePanel

