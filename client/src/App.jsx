import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/authPages/Login'
import Signup from './pages/authPages/Signup'
import Contact from './pages/Contact'
import VerifyEmail from './pages/authPages/VerifyEmail'
import ForgotPassword from './pages/authPages/ForgotPassword'
import ResetPassword from './pages/authPages/ResetPassword'
import Dashboard from './pages/userPages/Dashboard'
import Hisabs from './pages/userPages/Hisabs'
import Encrypted from './pages/userPages/Encrypted'
import Settings from './pages/userPages/Settings'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path='/hisabs' element={
          <ProtectedRoute>
            <Hisabs />
          </ProtectedRoute>
        } />
        <Route path='/encrypted' element={
          <ProtectedRoute>
            <Encrypted />
          </ProtectedRoute>
        } />
        <Route path='/settings' element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } />

        {/* 404 Route */}
        <Route path='*' element={
          <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">Page not found</p>
              <a href="/" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Go Home
              </a>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  )
}

export default App
