import './App.css'
import {Connection,Transaction, SystemProgram, LAMPORTS_PER_SOL,PublicKey } from "@solana/web3.js"
import axios from "axios";
import { Buffer } from "buffer";


const connect = new Connection("https://api.devnet.solana.com");

const fromPubkey = new PublicKey("6f3Fivgw3JmSzatvGYWWeXi4494TGbDXVLDk4yCuASbS")

function App() {


   async function sendSol(){
    const ix = SystemProgram.transfer({
      fromPubkey: fromPubkey,
      toPubkey: new PublicKey("D7zFJHrAAjH3AAGgQJx5iWUoeEfG5wHUz71jqStNBGxQ"),
      lamports: 0.001* LAMPORTS_PER_SOL
    })
    const tx= new Transaction().add(ix);
    
    const { blockhash } = await connect.getLatestBlockhash();

    tx.recentBlockhash=  blockhash; 
    tx.feePayer= fromPubkey;


    //convert the transantion into bunch of bytes 
    const serializeTx = tx.serialize({
       requireAllSignatures: false,
    /** Verify provided signatures (default: true) */
    verifySignatures: false
    });

    console.log(serializeTx)
    await axios.post("http://localhost:3000/api/v1/txn/sign",{ 
      serializedTx: Buffer.from(serializeTx).toString("base64")
      })
  }


  return <div>
    <input type='text' placeholder='Amount'></input>
    <input type='text' placeholder='Address'></input>
    <button onClick={sendSol}>Submit</button>

  </div>
}

export default App
