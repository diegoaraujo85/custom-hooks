import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';

type StateProps<T> = {
  data?: T;
  error?: Error;
  isLoading: boolean;
}

type ActionProps<T> = {type: 'LOADING'} | {type: 'FETCHING', payload: T} | {type: 'ERROR', payload: Error} | {type: 'FETCHED'}

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

  useEffect(() => {
  const controller = new AbortController()

    const handleFetch = async () => {
      dispatch({type: 'LOADING'})
      try {
        const response = await axios.get(url, {
          signal: controller.signal
        })      
        dispatch({type: 'FETCHING', payload: response.data})
      } catch (error) {
        if(error instanceof Error) {
          dispatch({type: 'ERROR', payload: error})
        }
        if(axios.isAxiosError(error) && error.response) {
          dispatch({type: 'ERROR', payload: error as Error})
        }
      }
    }

    handleFetch()

    return () => { // clean up function
      console.log('cancelando a requisição');
      controller.abort()
    }
  },[url])

  return {
    data: state.data,
    isLoading: state.isLoading,
    error: state.error
  }
}

const Component = () => {
  const {data, error, isLoading} = useFetch<User[]>('https://jsonplaceholder.typicode.com/users')
  
  return (
    <>
      {isLoading && !error && <p className='text-yellow-500'>Loading...</p>}
      
      {error && !data && <p className='text-red-500'>{error.message}</p>}
      
      {data && 
        <ul>
          {data.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))
          }
        </ul>
      }
    </>
  )
}

function App() {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-zinc-900 text-white gap-4'>
      <h2>Meu hook customizado</h2>

      <button onClick={() => setIsVisible(!isVisible)} className='bg-blue-500 px-4 py-2'>Clique</button>
      
      {isVisible && <Component />}
    </div>
  )
}

export default App
