import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
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
import Layout from './Layout'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route dark path='/' element={<Layout />} >
        <Route index element={<Home />} />
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
          <NotFound/>
        } />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
