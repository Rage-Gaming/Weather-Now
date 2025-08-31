import React from 'react'
import Navbar from './component/Navbar'
import WeatherCard from './component/WeatherCard'
import { Toaster } from 'sonner'

const App = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col"> 
      <Navbar /> {/* Navbar */}
      <div className="flex-grow flex items-center justify-center">
          <WeatherCard /> {/* WeatherCard */}
      </div>
      <Toaster position='top-right' />
    </div>
  )
}

export default App
