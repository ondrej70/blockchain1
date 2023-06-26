import { SHA1 } from "crypto-js";

onmessage = (e) => {
    const data = e.data;

    let nonce = 0;
    let hash = "";
    for(let i = 0; i < 100000000000; i++){
        hash = SHA1(data + i).toString();
        if(hash.slice(0, 4) === "0000"){
            nonce = i;
            break;
        }
    }

    postMessage({nonce, hash});
}