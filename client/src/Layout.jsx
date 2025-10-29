// src/components/Layout.jsx
import { Outlet } from 'react-router-dom';
import Header from './components/partials/Header';
import Footer from './components/partials/Footer';
import Loader from './components/Loader';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Navbar from './components/Navbar';

const Layout = ({ title }) => {
    gsap.registerPlugin(useGSAP);
    useGSAP(() => {
        gsap.fromTo('#loading-screen',
            { opacity: 1, display: 'flex' },
            {
                opacity: 0,
                // scale: 0,
                display: 'none',
                ease: "power4.inOut",
                duration: 1,
                delay: 1
            })
    })


    return (
        <div className="dark">
            {/* Loading Screen */}
            < div
                id="loading-screen"
                className="fixed h-full w-full inset-0 z-50 bg-black/50 backdrop-blur-lg flex items-center justify-center"
            >
                <Loader />
            </div >
            <div className="parent pt-20 h-full w-full bg-gray-100 dark:text-white dark:bg-gray-900">
                <Navbar isAuthenticated={true} userName="Alex" />
                <main className="min-h-[80%] w-full overflow-x-hidden">
                    <Outlet title={title} />
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
