import { SHA1 } from 'crypto-js';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Block = ({block, isDetail, changeBlock, correct, updateBlock, updatePreviousHashOfThisBlock, deleteLastBlock, isLast, prevColor}) => {
    const [blockData, setBlockData] = useState(block.data);

    let blockInfoClassName = "block-info"

    if(correct.zeros && correct.previousHash && correct.previous) {
        blockInfoClassName += " correct-block";
    }

    const handleBlockDataChange = (updatedData) => {
        setBlockData(updatedData);
        const newHash = generateNewHash({...block, data: updatedData});
        changeBlock(block.hash, {...block, data: updatedData, hash: newHash});
    }

    const generateNewHash = (nb) => {
        return SHA1(nb.previousHash + nb.time + nb.data + nb.nonce).toString();
    }

    const copyBlockContent = () => {
        const blockContent = block.previousHash + block.time + block.data + block.nonce;
        navigator.clipboard.writeText(blockContent);
    }

  return (
    <div className="block-container">
    <div className="block non-descriptive-block">
        <p>Prev. hash</p>
        <p style={{backgroundColor: correct.previousHash ? prevColor : "rgba(0,0,0,.22)"}}>{block.previousHash}</p>
        <p>Time</p>
        <p>{block.time}</p>
        <p>Data</p>
        <input value={blockData} onChange={(e) => handleBlockDataChange(e.target.value)} readOnly={isDetail}/>
        <p>Nonce</p>
        <p>{block.nonce}</p>
        <p>Hash</p>
        <p style={{backgroundColor: block.color}}>{block.hash}</p>
    </div>
    <div className={blockInfoClassName}>
        {!correct.previousHash && <div>
            <p>PREV. HASH of this block isn't HASH of previous block. </p>
            <button onClick={() => updatePreviousHashOfThisBlock(block)} disabled={isDetail}>Fix it</button>
        </div>}

        {!correct.zeros && <div>
            <p>HASH of this block doesn't start with "0000". </p>
            <button onClick={() => updateBlock(block)} disabled={isDetail}>Mine block</button>
        </div>}
        <div>
            <Link to={`/block/${block.hash}`} title="Show description of particular block parts.">SHOW DESCRIPTION OF THIS BLOCK</Link>
            <div>
                {(isLast && false) && <button className="remove-block-button" onClick={deleteLastBlock} title="Delete this block.">Delete</button>}
                <button className="copy-block-button" onClick={copyBlockContent} title="Copy block data.">Copy</button>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Block