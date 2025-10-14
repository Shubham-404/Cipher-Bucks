import React from 'react'
import { BrowserRouter as Router, Routes, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import EditHisaab from './pages/EditHisaab'
import AddHisaab from './pages/AddHisaab'
import NotFound from './pages/NotFound'
import Layout from './Layout'
import Test from './pages/Test'

const App = () => {
  const formTarget = "http://localhost:3000";
  return (
    // <RouterProvider>
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login formTarget/>} />
          <Route path='/signup' element={<Signup formTarget/>} />
          <Route path='/add-hisaab' element={<AddHisaab />} />
          <Route path='/edit-hisaab' element={<EditHisaab />} />
          <Route path='/test' element={<Test />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
    // </RouterProvider>
  )
}

export default App