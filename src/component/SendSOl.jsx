import axios from 'axios';
import {Transaction,SystemProgram,PublicKey,LAMPORTS_PER_SOL, Connection} from '@solana/web3.js'
import {Buffer} from 'buffer';
const connection = new Connection("https://api.devnet.solana.com")

export function SendSol(){


async function  sendSol(){
  
  const ix= SystemProgram.transfer({
    fromPubkey: new PublicKey("6f3Fivgw3JmSzatvGYWWeXi4494TGbDXVLDk4yCuASbS"),
    toPubkey: new PublicKey("D7zFJHrAAjH3AAGgQJx5iWUoeEfG5wHUz71jqStNBGxQ"),
    lamports: 0.1* LAMPORTS_PER_SOL
  })
  const tx = new  Transaction().add(ix);
  const { blockhash }= await connection.getLatestBlockhash();
  tx.recentBlockhash=blockhash
  tx.feePayer= new PublicKey("6f3Fivgw3JmSzatvGYWWeXi4494TGbDXVLDk4yCuASbS");

  const serialisedTx= tx.serialize({
    requireAllSignatures:false,
    verifySignaturesL:false

  })

  axios.post("http://localhost:3000/api/v1/txn/sign",{
    serializedTx: Buffer.from(serialisedTx).toString("base64")
  })

}

return <div>
     <input type='text' placeholder='Amount'></input>
    <input type='text' placeholder='Address'></input>
    <button onClick={sendSol}>Submit</button>
</div>

}