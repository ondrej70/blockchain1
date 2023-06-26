import { useState } from "react";
import { SHA1 } from "crypto-js";
import DisplayBlockChain from "./DisplayBlockChain";
import {Route, Routes} from "react-router-dom";
import BlockDetails from "./BlockDetails";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import PageNotFound from "./PageNotFound";

function App() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [arr, setArr] = useState([]);

  function changeBlock(oldHash, updatedBlock) {
    setArr(arr.map(block => block.hash === oldHash ? updatedBlock : block));
  }

  function generateBlock(data, setBlockData) {
    if(isGenerating) return;
    setIsGenerating(true);
    let worker = new Worker(new URL("./worker.js", import.meta.url), {
        type: "module",
    });

    const nb = {
        previousHash: arr.length ? arr[arr.length - 1].hash : 0,
        time: new Date().toLocaleString(),
        data
    }

    worker.postMessage(nb.previousHash + nb.time + nb.data);

    worker.onmessage = (e) => {
        const {nonce, hash} = e.data;
        const newBlock = {
            ...nb,
            nonce,
            hash,
            color: `hsl(${(Math.floor(Math.random() * 340) + 10)}, 66%, 84%)`
        }
        setArr([...arr, newBlock]);
        setIsGenerating(false);
        setBlockData("");
        worker.terminate();
    }
  }

  function updateBlock(nb) {
    if(isGenerating) return;
    setIsGenerating(true);
    let worker = new Worker(new URL("./worker.js", import.meta.url), {
        type: "module",
    });

    const oldHash = nb.hash;

    worker.postMessage(nb.previousHash + nb.time + nb.data);

    worker.onmessage = (e) => {
        const {nonce, hash} = e.data;
        const updatedBlock = {
            ...nb,
            nonce,
            hash
        }
        setArr(arr.map(block => block.hash === oldHash ? updatedBlock : block));
        setIsGenerating(false);
        worker.terminate();
    }
  }

  function updatePreviousHashOfThisBlock(ub) {
    setArr([
        arr[0],
        ...arr.slice(1).map((block, i) => block.hash === ub.hash ? {...ub, previousHash: arr[i].hash, hash: SHA1(arr[i].hash + ub.time + ub.data + ub.nonce).toString()} : block)
      ]);

  }

  function deleteLastBlock(){
    setArr(arr.slice(0, -1));
  }

  console.log(arr);


  return (
    <>
    <HeaderComponent />
    <Routes>
      <Route path="/" element={<DisplayBlockChain arr={arr} changeBlock={changeBlock} updateBlock={updateBlock} updatePreviousHashOfThisBlock={updatePreviousHashOfThisBlock} deleteLastBlock={deleteLastBlock} generateBlock={generateBlock}/>} />
      <Route path="/block/:hash" element={<BlockDetails arr={arr} changeBlock={changeBlock} updateBlock={updateBlock} updatePreviousHashOfThisBlock={updatePreviousHashOfThisBlock} deleteLastBlock={deleteLastBlock} generateBlock={generateBlock} />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
    <FooterComponent />
    </>
  );
}

export default App;
