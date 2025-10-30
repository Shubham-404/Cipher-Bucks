// src/components/Header.jsx
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full sticky top-0">
      <nav className="w-full p-3 px-8 flex justify-between items-center bg-indigo-500 text-white">
        <span className="text-xl font-semibold">
          <Link className='flex items-center justify-center' to="/"><img className='h-7' src="/images/logo-no-bg.png" alt="logo" /><span>Vault Book</span></Link>
        </span>
        <ul className="flex justify-evenly items-center w-90 p-2">
          <li className="hover:font-semibold"><Link to="/">Home</Link></li>
          <li className="hover:font-semibold"><Link to="/contact">Contact Us</Link></li>
          <li className="hover:font-semibold"><Link to="/login">Login</Link></li>
          <li className="hover:font-semibold"><Link to="/signup">SignUp</Link></li>
        </ul>
        <span className="cursor-pointer text-wrap flex">
          <img className="h-5 w-5" src="/images/sun.svg" alt="toggle-theme" />
        </span>
      </nav>
    </header>
  );
};

export default Header;
