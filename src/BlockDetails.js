import React from 'react'
import { Link, useParams } from 'react-router-dom'
import PageNotFound from './PageNotFound';

const BlockDetails = ({arr: blockchain}) => {
    const {hash} = useParams();

    const detailedBlock = blockchain.find(block => block.hash === hash);

        return (
          <>
          {detailedBlock && <main className="block-chain info">

            <div className="block-container">
              <div className="block description-block">
                <p>Prev. hash</p>
                <div>
                  <p>{detailedBlock.previousHash}</p>
                  <p>The hash of previous block in the blockchain. If there is no block in the blockchain with hash that is Prev. hash of a block, then that block is not a part of the blockchain.</p>
                </div>
                <p>Time</p>
                <div>
                  <p>{detailedBlock.time}</p>
                  <p>The time when was the block created.</p>
                </div>
                <p>Data</p>
                <div>
                  <p>{detailedBlock.data}</p>
                  <p>Arbitrary text data contained on the block.</p>
                </div>
                <p>Nonce</p>
                <div>
                  <p>{detailedBlock.nonce}</p>
                  <p>A number that is mined. The mining of a block is a process of searching for a nonce number that will make the hash of the block to begin with "0000".</p>
                </div>
                <p>Data</p>
                <div>
                  <p>{detailedBlock.hash}</p>
                  <p>SHA1 hash of all the data contained on the block.</p>
                </div>
              </div>
            </div>

            <button className="back-home-button"><Link to="/">↩ Go back home</Link></button>
          </main>}
          {!detailedBlock && <PageNotFound />}
          </>
        )
}

export default BlockDetails