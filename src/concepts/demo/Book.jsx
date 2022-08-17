import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {addbook, getbook} from '../../redux/reducer/bookReducer.js'



export default function Book() {
  const data = useSelector(state=> state.bookReducer)
  const dispatch = useDispatch()
  
  return (
    <div>
       <ul>
          {data.map(item=>{
            return <li key={item.key}>{item.bookName}</li>
          })}
       </ul>

       <button className='mt-5' onClick={()=> dispatch(getbook({key:'get'}))}>獲取書籍</button>
       <br/>
       <hr />
       <button className='mt-5' onClick={()=> dispatch(addbook({key:'add'}))}>新增書籍</button>
    </div>
  )
}
