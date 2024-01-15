'use client'

import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-zinc-900 text-white gap-4'>
      <h2>useReducer</h2>

      <button onClick={() => setCount(count - 1)} className='bg-red-500 text-white p-2 mr-2 w-32'>Decrement</button>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)} className='bg-green-500 text-white p-2 mr-2 w-32'>Increment</button>
    </div>
  )
}

export default App
