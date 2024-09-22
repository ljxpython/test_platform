import { useState, useCallback,useEffect } from "react";

export default function countMoudle() {
    const [counter, setCounter] = useState(0);
    

    // 定义修改状态的方法
    const increment = useCallback(() => setCounter((c) => c + 1), []);
    const decrement = useCallback(() => setCounter((c) => c - 1), []);
    const incrementAsync = () => {
        setTimeout(() => {
            setCounter(counter + 1)
        },1000)
    }

    // 每秒修改状态
    // useEffect(() => {
    //     setTimeout(() => {
    //         setCounter(counter + 1000)
    //     },1000)
    // })
    



  return { counter, increment, decrement ,setCounter,incrementAsync};
};
