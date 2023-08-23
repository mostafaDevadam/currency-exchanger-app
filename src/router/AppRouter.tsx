import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import CurrencyDetails from '../pages/CurrencyDetails'

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/details/:id' element={<CurrencyDetails />} />
        </Routes>
    )
}

export default AppRouter
