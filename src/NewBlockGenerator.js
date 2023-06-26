import React, { useState } from 'react'

const NewBlockGenerator = ({generateBlock}) => {
    const [blockData, setBlockData] = useState("");

  return (
    <div className='generator'>
        <p>DATA</p>
        <input value={blockData} onChange={(e) => setBlockData(e.target.value)} />
        <button onClick={() => generateBlock(blockData, setBlockData)}>Generate new block</button>
    </div>
  )
}

export default NewBlockGenerator