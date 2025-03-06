import { useState,useEffect } from 'react';
const useDebounce=( value:any,delay:number=500)=>{
 const [debounceValue,setDebounceValue] = useState(value);
 useEffect(() => {
    //当有value发生变化时，
    const timer = setTimeout(() => {
      setDebounceValue(value)
    }, delay)
    return () => {
      //去除定时器
      clearTimeout(timer)
    }
},[value,delay])
 return debounceValue
}

export default useDebounce;