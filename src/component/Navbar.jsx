import {useState, useEffect} from 'react'

const Navbar = () => {
  const [time, setTime] = useState() // State to hold the current time

  useEffect(() => {
  // set time immediately on mount
  setTime(
    new Date().toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    })
  )

  // update every second
  const interval = setInterval(() => {
    setTime(
      new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
      })
    )
  }, 1000)

  return () => clearInterval(interval)
}, [])

  return (
    <nav className="bg-[#181818] p-4"> {/* Dark background color */}
      <div className="container mx-auto flex justify-between"> 
        <h1 className="text-white text-2xl">Weather Now</h1>
        <div className='border flex items-center px-2 rounded-lg border-[#969494d5] text-gray-300 text-xs font-bold'>
            {time}
        </div>
      </div>
    </nav>
  )
}

export default Navbar