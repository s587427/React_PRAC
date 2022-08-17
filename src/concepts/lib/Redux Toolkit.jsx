import React, {useState, useCallback}  from 'react'
import {useSelector, useDispatch, useStore} from 'react-redux'
import {increment, decrement} from '../../redux/reducer/counterReducer'
import {incrementForSlice, decrementForSlice, resetForSlice} from '../../redux/reducer/counterSlice'

export default function App() {
  //hook
  const [count, setCount] = useState(0)
  //react-redux
  const dispatch = useDispatch()
  const store = useStore()
  const countForCreateReducer = useSelector((state) =>  state.counter.value)
  const countForCreateSlice = useSelector((state) =>  state.counterSlice.value)
  console.log({
    'useSelector': '可以得到store特定的資料',
    'useDispatch': '使用useDispatch() 傳入一個action(object)去改變store',
    'useStore': '使用這個方法useStore().getState可以得到所有store: store.getState()'
  },  store.getState())
  return (
    <div>
         <h1>React hook demo</h1>
          <button 
            className='bg-indigo-500 hover:bg-indigo-600 border-2 border-solid rounded-lg p-1 text-white' 
            onClick={()=> setCount(count + 1)}>Click Add
          </button>
          <p>{count}</p>

          <hr />
          <h1>React-redux hook createReducer demo </h1>
          <button 
            className='bg-indigo-500 hover:bg-indigo-600 border-2 border-solid rounded-lg p-1 text-white' 
            onClick={()=> dispatch(increment(5))}>Click Add
          </button>
          <button 
            className='bg-indigo-500 hover:bg-indigo-600 border-2 border-solid rounded-lg p-1 text-white' 
            onClick={()=> dispatch(decrement(10))}>Click Odd
          </button>
          <p>{countForCreateReducer}</p>

          <h1>React-redux hook createSlice demo </h1>
          <button 
            className='bg-indigo-500 hover:bg-indigo-600 border-2 border-solid rounded-lg p-1 text-white' 
            onClick={()=> dispatch(incrementForSlice(3))}>Click Add
          </button>
          <button 
            className='bg-indigo-500 hover:bg-indigo-600 border-2 border-solid rounded-lg p-1 text-white' 
            onClick={()=> dispatch(decrementForSlice(3))}>Click Odd
          </button>
          <button 
            className='bg-indigo-500 hover:bg-indigo-600 border-2 border-solid rounded-lg p-1 text-white' 
            onClick={()=> dispatch(resetForSlice(3))}>Click Reset
          </button>
          <p>{countForCreateSlice}</p>
    </div>
  
  )
}

