import React, { useState } from 'react'

function Counter() {
    const [count,setCount]=useState(0)

    

  return (
    <div>
      <button onClick={()=>setCount(prev=>prev+1)}>ADD</button>
      <button onClick={()=>setCount(prev=>prev-1)}>dec</button>
    </div>
  )
}

export default Counter
