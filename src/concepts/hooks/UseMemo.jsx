import React, { useState, useMemo, useCallback, useEffect } from 'react'
/**
 * useEffect
 *      1.同components是照順序執行下來的
 *      2.父子關係components子會先執行useEffect再執行父的useEffect
 * useMemo
 *      1.第一個參數是 callback function
 *      2.第二個參數是一個陣列, 效用類似useEffect的第二個參數陣列
 *      特性
 *          1.傳到 useMemo 的第一個參數函式會在 render 元件時執行
 *          2.記憶的值不變就不會觸發重新渲染
 *      適用時機
 *          1. 不需要常常被 render 的元件或 Function
 *          2. 執行速度慢的 Function  
 * useCallback Returns a memoized callback. 也就是 dependencies 沒有改變的情況下，把某個 function 保存下來
 *      1.useCallback(fn, deps) 等同於 useMemo(() => fn, deps)
 * 
 */
const UseMemo = () => {
    const [count, setCount] = useState(0)
    const memoizedValue = useMemo(() => {
        return Math.random();
    }, []);

    const memoizedCallback = useCallback((data) => {
        //console.log(data)
        return 'memoizedCallback'
    }, []);

    //every render do this(包括第一次)
    useEffect(() => { console.log('UseMemo-every render do this') })
    //Components Didamount render do this(包括第一次)
    useEffect(() => { console.log('UseMemo-Components Didamount render do this') }, [])
    //Components dependce change render do this(包括第一次)
    useEffect(() => { console.log('UseMemo-Components dependce change render do this') }, [count])
    //Components onmount
    useEffect(() => {
        return () => {
            console.log('UseMemo didmount')
        }
    }, [])

    console.log('return-UseMemo')
    console.log({memoizedValue, memoizedCallback});

    return (
        <>
            <h1>useMemo & useCallback</h1>
            <button className='button' onClick={() => setCount(count + 1)}>點擊父組件 + 1</button>
            <div>
                父counter : {count}
            </div>
            <UseMemoChild count={count} />
        </>


    )
}

export default UseMemo;



function UseMemoChild(props) {
    const [childCount, setChildCount] = useState(0)
    //every render do this(包括第一次)
    useEffect(() => { console.log('UseMemoChild-every render do this') })
    //Components Didamount render do this(包括第一次)
    useEffect(() => { console.log('UseMemoChild-Components Didamount render do this') }, [])
    //Components dependce change render do this(包括第一次)
    useEffect(() => { console.log('UseMemoChild-Components dependce change render do this') }, [props.count])
    console.log('return-UseMemoChild')
    return (
        <>
            <button className='button' onClick={() => setChildCount(childCount + 1)}>點擊子組件 + 1</button>
            <div> 子counter : {childCount} </div>
        </>
    )
}
