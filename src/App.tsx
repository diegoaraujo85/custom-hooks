'use client'

import { useEffect, useReducer, useState } from 'react'

function App() {
const [data, setData] = useState([])
const [isLoading, setIsLoading] = useState(false)
const [error, setError] = useState(null)
  
const handleFetch = async () => {
  setIsLoading(true)
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await response.json()
    setData(data)
  } catch (error) {
    setError(error)
  } finally {
    setIsLoading(false)
  }
}

useEffect(() => {
  handleFetch()
},[])

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-zinc-900 text-white gap-4'>
      <h2>useReducer</h2>
      
      {error && !data.length && <p className='text-red-500'>{error.message}</p>}
      {isLoading && !data.length && <p className='text-yellow-500'>Loading...</p>}
      {data && 
        <ul>
          {data.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))
          }
        </ul>
      }
    </div>
  )
}

export default App
