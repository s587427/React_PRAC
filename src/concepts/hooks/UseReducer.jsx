import React, { useReducer, useState } from 'react'

/**
 * useReducer(fn, initState) 
 *      1.fn有兩個參數第一個是資料, 第二個是一個object(一個action)
 *      2.回傳一個陣列索引0是回傳的資料，索引1回傳的是可以改變資料的方法 ex const [state, dispatch] = useReducer(reducer, [])
 */

const ACTIONS = {
    ADD_TODO : 'add_todo',
    TOGGLE_TODO: 'toggle_todo',
    DELETE_TODO: 'delete_todo'
}

function reducer(todos, action){
    switch(action.type){
        case ACTIONS.ADD_TODO:
            return [...todos, newTodo(action.payload.name)]
        case ACTIONS.TOGGLE_TODO:
            return todos.map(todo => {
                if(todo.id === action.payload.id){
                   return {...todo, complete: !todo.complete}
                }
                return todo
            })
        case ACTIONS.DELETE_TODO:
            return todos.filter(todo => todo.id !== action.payload.id)
        default:
            return todos
    }
}

function newTodo(name){
    return {id: Date.now(), name: name, complete: false}
}

const Reducer = () => {
    const [todos, dispatch] = useReducer(reducer, [])
    const [name, setName] = useState('')

    function handleSubmit(e){
        e.preventDefault()
        dispatch({type: ACTIONS.ADD_TODO, payload: { name:name }})
        setName('')
    }
    //console.log(todos)
    return (
        <>
            <h1>useReducer</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e)=> setName(e.target.value)} />             
            </form>
            {todos.map(todo=> {
                return <Todo key={todo.id} todo={todo} dispatch={dispatch}/>
            })}
        </>
    )
}

export default Reducer


function Todo({todo, dispatch}){
    return(
        <div>
            <span className='p-5' style={{color: todo.complete ? '#00008B': '#DC143C'}}>
                {todo.name}
            </span>
            <button className='p-5' onClick={()=> dispatch({type: ACTIONS.TOGGLE_TODO, payload: {id: todo.id}})}>
                Toggle
            </button>
            <button className='p-5' onClick={()=> dispatch({type: ACTIONS.DELETE_TODO, payload: {id: todo.id}})}>Delete</button>
        </div>
    )
}