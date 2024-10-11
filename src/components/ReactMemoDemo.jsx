import { useState } from "react";


const ChildComponent = React.memo(({count})=> {
   console.log("Child Re-Rendered");
   return <p>Child count : {Count}</p>
})


export default function ParentComponent() {
  const [count, setCount] = useState(0);
  const [otherCount, setOtherCount] = useState(1);

  return (
    <div>
        <button onClick={()=> setCount(count + 1)} >Increment</button>
        <button onClick={()=> setOtherCount(otherCount + 1)} >Increment</button>
        <ChildComponent count={count} />
        <p>Other count is {otherCount}</p>
    </div>
  )
}