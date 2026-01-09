import { useState } from "react";
import { PublicKey, LAMPORTS_PER_SOL, Connection } from "@solana/web3.js";

const connection = new Connection("https://api.devnet.solana.com");

export function Airdrop({ publicKey }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  async function requestAirdrop() {
    if (!publicKey || !amount) return alert("Missing data");

    try {
      setLoading(true);
      const signature = await connection.requestAirdrop(
        new PublicKey(publicKey),
        Number(amount) * LAMPORTS_PER_SOL
      );

      await connection.confirmTransaction(signature);
      alert("Airdrop successful 🚀");
      setAmount("");
    } catch {
      alert("Airdrop failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <h2 className="text-lg font-medium mb-4">Airdrop SOL</h2>

      <input
        type="number"
        placeholder="Amount (SOL)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full mb-4 px-4 py-2 bg-black border border-white/10 rounded focus:outline-none"
      />

      <button
        onClick={requestAirdrop}
        disabled={loading}
        className="w-full bg-white text-black py-2 rounded hover:bg-gray-200 disabled:opacity-50"
      >
        {loading ? "Requesting..." : "Request Airdrop"}
      </button>
    </div>
  );
}
