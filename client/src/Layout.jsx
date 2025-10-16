// src/components/Layout.jsx
import { Outlet } from 'react-router-dom';
import Header from './partials/Header';
import Footer from './partials/Footer';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const Layout = ({ title }) => {
    gsap.registerPlugin(useGSAP);
    useGSAP(() => {
        gsap.fromTo('#loading-screen',
            { opacity: 1, scale: 1, display: 'flex' },
            {
                opacity: 0,
                scale: 30,
                display: 'none',
                ease: "power4.inOut",
                duration: 3.5
            })
    })

    return (
        <div className="parent h-full w-full dark:text-white bg-gradient-to-b from-indigo-500 via-indigo-500 to-white dark:to-gray-700">
            {/* Loading Screen */}
            <div
                id="loading-screen"
                className="fixed h-full w-full inset-0 z-50 bg-indigo-500 flex items-center justify-center"
            >
                <h1 className="text-transparent bg-clip-text bg-white text-6xl md:text-8xl font-extrabold">
                    Cipher Bucks.
                </h1>
            </div>
            <Header />
            <main className="min-h-[80%] w-full">
                <Outlet title={title} />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
