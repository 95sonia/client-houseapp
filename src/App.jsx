import { useState } from 'react'
import './App.css'
import {Header} from './components/Header'
import {Footer} from './components/Footer'
import {AppRoutes} from './routes/AppRoutes'

function App() {

  return (
    <>
      <h1>WEB ALQUILER VACACIONAL</h1>
      <Header />
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </>
  )
}

export default App
