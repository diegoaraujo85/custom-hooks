'use client'

import { useReducer } from 'react'

function App() {
  // reducer = (state, action) => newState
  const initialState = {
    count: 0
  }
  const reducer = (state, action) => {
    switch (action.type) {
      case 'increment':
        return {
          ...state,
          count: state.count + 1
        }        
      case 'decrement':
        return {
          ...state,
          count: state.count - 1
        }        
    
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-zinc-900 text-white gap-4'>
      <h2>useReducer</h2>
      
      <div className='flex flex-row gap-4 items-center'>
        <button onClick={() => dispatch({ type: 'decrement' })} className='bg-red-500 text-white p-2 mr-2 w-32 hover:bg-red-600'>Decrement</button>
        <p>Count: {state.count}</p>
        <button onClick={() => dispatch({ type: 'increment' })} className='bg-green-500 text-white p-2 mr-2 w-32 hover:bg-green-600'>Increment</button>
      </div>
    </div>
  )
}

export default App
