import { useState } from 'react'
import './App.css'
import Header from './common/header'
import AppRoutes from './appRoutes'

export default function App() {
  return (
    <>
      <Header />
      
      <div className="container">
        <AppRoutes />
        {/* <Register /> */}
      </div>
    </>
  )
}