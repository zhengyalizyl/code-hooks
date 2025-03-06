import useToggle from "../useToggle";
import { useMemo } from "react";

export interface Actions{
  set:(value:boolean)=>void;
  toggle:()=>void;
  setTrue:()=>void;
  setFalse:()=>void;
}
export default function useBoolean(defaultValue: boolean = false) :[boolean,Actions]{
  const [state, {toggle,set}] =useToggle(!!defaultValue);
  
  const actions:Actions=useMemo(()=>{
     const setTrue=()=>set(true);
     const setFalse=()=>set(false);
     return {
      toggle,
      set:(v)=> set(!!v),
      setFalse,
      setTrue
     }
  },[])

  return [state,actions];
}
