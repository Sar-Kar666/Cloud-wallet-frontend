import { useState } from "react";
import axios from "axios";
import {
  Transaction,
  SystemProgram,
  PublicKey,
  LAMPORTS_PER_SOL,
  Connection,
} from "@solana/web3.js";
import { Buffer } from "buffer";

const connection = new Connection("https://api.devnet.solana.com");

export function SendSol({ fromPublicKey }) {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendSol() {
    if (!fromPublicKey) return alert("Wallet not loaded");
    if (!to || !amount) return alert("Missing fields");

    try {
      setLoading(true);

      const ix = SystemProgram.transfer({
        fromPubkey: new PublicKey(fromPublicKey),
        toPubkey: new PublicKey(to),
        lamports: Number(amount) * LAMPORTS_PER_SOL,
      });

      const tx = new Transaction().add(ix);
      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash();

      tx.recentBlockhash = blockhash;
      tx.feePayer = new PublicKey(fromPublicKey);

      const serializedTx = tx.serialize({
        requireAllSignatures: false,
        verifySignatures: false,
      });

      const res = await axios.post(
        "http://localhost:3000/api/v1/txn/sign",
        {
          serializedTx: Buffer.from(serializedTx).toString("base64"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const signature = await connection.sendRawTransaction(
        Buffer.from(res.data.signedTx, "base64")
      );

      await connection.confirmTransaction({
        signature,
        blockhash,
        lastValidBlockHeight,
      });

      alert(`Transaction confirmed ✅\n${signature}`);
      setTo("");
      setAmount("");
    } catch (err) {
      console.error(err);
      alert("Transaction failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <h2 className="mb-1 text-lg font-semibold">Send SOL</h2>
      <p className="mb-5 text-sm text-gray-400">
        Transfer SOL to another wallet
      </p>

      {/* Recipient */}
      <div className="mb-4">
        <label className="mb-1 block text-xs text-gray-400">
          Recipient Address
        </label>
        <input
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="Enter Solana address"
          className="w-full rounded-md border border-white/10 bg-black px-3 py-2 text-sm outline-none focus:border-gray-400"
        />
      </div>

      {/* Amount */}
      <div className="mb-5">
        <label className="mb-1 block text-xs text-gray-400">
          Amount (SOL)
        </label>
        <div className="flex items-center rounded-md border border-white/10 bg-black px-3 py-2">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.0"
            className="w-full bg-transparent text-sm outline-none"
          />
          <span className="ml-2 text-xs text-gray-500">SOL</span>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={sendSol}
        disabled={loading}
        className="w-full rounded-md bg-white py-2 text-sm font-medium text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Sending…" : "Send SOL"}
      </button>
    </div>
  );
}
