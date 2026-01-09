import { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "../component/Navbar";
import { Airdrop } from "../component/Airdrop";
import { SendSol } from "../component/SendSOl";

export function Dashboard() {
  const [user, setUser] = useState({
    username: "",
    publicKey: "",
  });

  useEffect(() => {
    async function fetchMe() {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setUser({
          username: res.data.username,
          publicKey: res.data.publicKey,
        });
      } catch {
        localStorage.removeItem("token");
        window.location.href = "/signin";
      }
    }

    fetchMe();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold mb-8">Dashboard</h1>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Airdrop publicKey={user.publicKey} />
          <SendSol fromPublicKey={user.publicKey} />
        </div>
      </div>
    </div>
  );
}
