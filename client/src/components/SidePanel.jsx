import React from 'react'

const SidePanel = (props) => {
    return (
        <div className="text-white text-center max-md:hidden flex flex-col items-center justify-center p-10">
            <h1 className="text-4xl font-bold mb-3">KhataBook {props.page && <span>&bull; {props.page}</span>}</h1>
            <p className="text-lg opacity-90">Your digital ledger — secure, simple, encrypted.</p>
            <a
                href="https://github.com/Shubham-404/"
                target="_blank"
                className="mt-10 text-md opacity-70"
            >
                By Shubham-404
            </a>
        </div>
    )
}

export default SidePanel