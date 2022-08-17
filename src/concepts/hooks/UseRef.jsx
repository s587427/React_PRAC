import React, { useState, useRef, useEffect } from 'react'


/**
 * useRef
 * 1.可以接受一個參數將回傳一個物件ex useRef(someting) will return {current: something} 
 * 2.常用於
 *      訪問dom元素
 *      不導致重新渲染的情況下跨渲染保值非常有用
 */


const Ref = () => {
    const [name, setName] = useState('')

    const renderCount = useRef(0) //will return like {current: 0 }
    useEffect(()=> {
        renderCount.current = renderCount.current + 1
    })

    const inputRef = useRef()   
    function focus(){
        console.log(inputRef.current)
        inputRef.current.focus()
    }

    const prevName = useRef('')
    useEffect(()=>{
        prevName.current = name
    },[name])
    

    

    return (
        <>
            <h1>useRef</h1>
            <input ref={inputRef} type="text" value={name} onChange={e => setName(e.target.value)} />
            <div>My name is {name} and it used to be {prevName.current}</div>
            <div>I rendered {renderCount.current} times</div>
            <button onClick={focus}>Focus</button>
        </>
    )
}

export default Ref