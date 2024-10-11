import React, { useCallback } from 'react'

 const handleClick = useCallback(()=>{
    console.log("Button Clicked");
 }, []);


function ParentComponent() {
  return (
    <div>
      <ChildComponet onButtonClick={handleClick}/>
    </div>
  )
}

export default ParentComponent;
