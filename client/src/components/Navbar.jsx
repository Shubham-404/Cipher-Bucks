import React from "react";
import { Link } from "react-router-dom";
import {
  CircleCheckIcon,
  CircleHelpIcon,
  CircleIcon,
  LogIn,
  LogOut,
  User,
  UserPlus,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Navbar({ isAuthenticated }) {
  return (
    <nav
      className="
        fixed top-5 left-1/2 -translate-x-1/2 
        flex justify-between items-center
        w-[90%] max-w-5xl 
        px-8 py-3 
        rounded-full border-1/2 border-indigo-800/10 dark:border-indigo-400/10
        glass-nav shadow-md bg-white/60 dark:bg-gray-900/60
        transition-all duration-300 z-50
      "
    >
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform"
      >
        <img
          src="/images/logo-no-bg.png"
          alt="Vault Book logo"
          className="h-10 w-10 rounded-full object-contain invert-80 drop-shadow-md hover:drop-shadow-lg active:drop-shadow-sm dark:invert-0"
        />
      </Link>

      {/* Navigation Menu */}
      <NavigationMenu>
        <NavigationMenuList className="flex gap-6 max-md:gap-1">
          {/* Home Menu */}
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={`
                ${navigationMenuTriggerStyle()} 
                bg-transparent 
                text-gray-800 dark:text-gray-100 
                hover:text-indigo-600 dark:hover:text-indigo-400 
                data-[state=open]:text-indigo-600 dark:data-[state=open]:text-indigo-400
                font-semibold text-sm
              `}
            >
              About us
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-2 p-4 w-60 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                <ListItem href="/about" title="About">
                  Discover how Vault Book simplifies your record-keeping.
                </ListItem>
                <ListItem href="/contact" title="Contact">
                  Learn more about the developer and the tech behind it.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Hisaab Status Menu */}
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={`
                ${navigationMenuTriggerStyle()} 
                bg-transparent 
                text-gray-800 dark:text-gray-100 
                hover:text-orange-500 dark:hover:text-orange-400 
                data-[state=open]:text-orange-500 dark:data-[state=open]:text-orange-400
                font-semibold text-sm
              `}
            >
              {
                (isAuthenticated) ?
                  "Profile" :
                  "Sign up"
              }
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 w-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                {(!isAuthenticated) ?
                  <>
                    <StatusItem
                      icon={<UserPlus size={16} />}
                      label="Signup"
                      color="text-orange-600 dark:text-orange-400"
                      to="/signup"
                    />
                    <StatusItem
                      icon={<LogIn size={16} />}
                      label="Login"
                      color="text-indigo-600 dark:text-indigo-400"
                      to="/login"
                    />

                  </>
                  :
                  <>
                    <StatusItem
                      icon={<User size={16} />}
                      label="Profile"
                      color="text-orange-600 dark:text-orange-400"
                      to="/profile"
                    />
                    <StatusItem
                      icon={<LogOut size={16} />}
                      label="Logout"
                      color="text-orange-600 dark:text-orange-400"
                      to="/logout"
                    />
                  </>
                }
                <StatusItem
                  icon={<CircleHelpIcon size={16} />}
                  label="Help & Support"
                  color="text-teal-600 dark:text-teal-400"
                  to="/help-support"
                />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}

/* Reusable List Item */
function ListItem({ title, children, href }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          className="
            block p-3 rounded-xl 
            hover:bg-indigo-50/70 dark:hover:bg-gray-700/50 
            transition-all duration-200
            border border-transparent
          "
        >
          <div className="text-sm font-semibold text-gray-800 dark:text-gray-100">
            {title}
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

/* Status Item with Icon */
function StatusItem({ icon, label, color, to }) {
  return (
    <li>
      <Link
        to={to}
        className={`
          flex items-center gap-3 p-2 rounded-lg 
          text-gray-700 dark:text-gray-200 
          hover:bg-orange-50 dark:hover:bg-orange-900/20 
          transition-all duration-200
          group
        `}
      >
        <span className={`transition-colors group-hover:${color.split(" ")[0]}`}>
          {icon}
        </span>
        <span className={`font-medium text-sm group-hover:${color}`}>
          {label}
        </span>
      </Link>
    </li>
  );
}