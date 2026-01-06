import { useState } from 'react'
import './App.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AppRoutes } from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
      <h1>HOUSE APP</h1>
      <Header />
      <AppRoutes />
      <Footer />
      <div>
        {/* ... el resto de tu app (Routes, etc.) */}
        <Toaster position="top-right" reverseOrder={false} />
      </div>

    </>
  )
}

export default App
