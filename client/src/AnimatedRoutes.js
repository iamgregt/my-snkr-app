import React from 'react'
import { useLocation, Routes, Route } from 'react-router-dom'

import Shopping from './Shopping';
import Shoe from './Shoe';
import HomePage from './HomePage';
import ShoeDeletedPage from './ShoeDeletedPage';
import UserPage from './UserPage';
import { AnimatePresence } from 'framer-motion/dist/framer-motion'



function AnimatedRoutes({users, user, setUser, handleUpdateShoeForm}) {

    const location = useLocation()
    console.log(location)

  return (
    <AnimatePresence exitBeforeEnter>
    <Routes location={location} key={location.pathname}>
    <Route path="/shoepage" element={<Shoe users={users} handleUpdate={handleUpdateShoeForm} user={user} />} />
    <Route path="/" element={<HomePage setUser={setUser} user={user} />} />
    <Route path="/stores" element={<Shopping user={user} setUser={setUser} />} />
    <Route path="/deleted" element={<ShoeDeletedPage />} />
    <Route path="/userpage" element={<UserPage users={users} user={user} setUser={setUser} />} />
  </Routes>
  </AnimatePresence>
  )
}

export default AnimatedRoutes
