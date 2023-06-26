import React from 'react'
import Block from './Block'
import NewBlockGenerator from './NewBlockGenerator';

const DisplayBlockChain = ({arr: blockchain, changeBlock, updateBlock, updatePreviousHashOfThisBlock, deleteLastBlock, generateBlock}) => {
  let previousWasCorrect = true;
  let previousColor = `rgba(0, 0, 0, .22)`;

  return (
    <main className='block-chain'>
        {(blockchain.length > 0) && blockchain.map((block, i) => {

            let correct = {
              zeros: (block.hash.slice(0,4) === "0000"),
              previousHash: (i > 0 ? (blockchain[i - 1].hash === block.previousHash) : true),
              previous: previousWasCorrect,
            }

            let prevColor = previousColor;
            previousColor = block.color;

            if(!correct.zeros || !correct.previousHash || !correct.previous){
              previousWasCorrect = false;
            }

              return <Block key={i} block={block} isDetail={false} changeBlock={changeBlock} updateBlock={updateBlock} updatePreviousHashOfThisBlock={updatePreviousHashOfThisBlock} correct={correct} deleteLastBlock={deleteLastBlock} isLast={i === blockchain.length - 1} prevColor={prevColor}/>
          })}
          <NewBlockGenerator generateBlock={generateBlock} />
    </main>
  )
}

export default DisplayBlockChain