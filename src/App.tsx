'use client'

import axios from 'axios'
import { useCallback, useEffect, useReducer } from 'react'

type StateProps<T> = {
  data?: T;
  error?: Error;
  isLoading: boolean;
}

type ActionProps<T> = {type: 'LOADING'} | {type: 'FETCHING', payload: T} | {type: 'ERROR', payload: Error}

type User = {
  id: number
  name: string
}

// hook
function useFetch<T = unknown>(url: string) {
  const initialState: StateProps<T> = {
    data: undefined,
    error: undefined,
    isLoading: false,
  }

  const reducer = (state: StateProps<T>, action: ActionProps<T>) => {
    switch (action.type) {
      case 'LOADING':
        return {...initialState, isLoading: true}

      case 'FETCHING':
        return {...initialState, data: action.payload, isLoading: false}

      case 'ERROR':
        return {...initialState, error: action.payload, isLoading: false}
            
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const handleFetch = useCallback(async () => {
    dispatch({type: 'LOADING'})
    try {
      const response = await axios.get(url)      
      dispatch({type: 'FETCHING', payload: response.data})
    } catch (error) {
      if(error instanceof Error) {
        dispatch({type: 'ERROR', payload: error})
      }
      if(axios.isAxiosError(error) && error.response) {
        dispatch({type: 'ERROR', payload: error as Error})
      }
    } 
  }, [url])

  useEffect(() => {
    handleFetch()
  },[handleFetch]) // ao usar uma função como dependencia do useEffect, deve colocar a função dentro de um useCallback

  return {
    data: state.data,
    isLoading: state.isLoading,
    error: state.error
  }
}

function App() {

  const {data, error, isLoading} = useFetch<User[]>('https://jsonplaceholder.typicode.com/users')    
  
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-zinc-900 text-white gap-4'>
      <h2>useReducer</h2>
      
      {error && !data && <p className='text-red-500'>{error.message}</p>}
      {isLoading && !data && <p className='text-yellow-500'>Loading...</p>}
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
