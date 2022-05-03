import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AuthPage from '../pages/AuthPage'
import Login from './auth/Login'
import Register from './auth/Register'
import ResetPassword from './auth/ResetPassword'


export default function AuthRoutes() {

    return (
        <Routes>
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="/login" element={<AuthPage component={<Login />} />} />
            <Route path="/register" element={<AuthPage component={<Register />} />} />
            <Route path="/reset-password" element={<AuthPage component={<ResetPassword />} />} />
        </Routes>
    )
}