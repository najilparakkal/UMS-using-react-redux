import { DECREMENT } from "./types.JS"
import { INCREMENT } from "./types.JS"


export const increment =()=>{
    return{
        type:INCREMENT
    }
}
export const decrement = ()=>{
    return{
        type:DECREMENT
    }
}