import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSignin() {
    if (!username || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/v1/signin", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black">
      <div className="w-[380px] p-6 rounded-xl bg-zinc-950 border border-zinc-800">
        <h1 className="text-2xl font-medium text-zinc-100 text-center mb-6">
          Sign In
        </h1>

        <div className="flex flex-col gap-4">
          <input
            placeholder="Username"
            className="bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder-zinc-500 px-4 py-2 rounded-md focus:outline-none focus:border-zinc-400 transition"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder-zinc-500 px-4 py-2 rounded-md focus:outline-none focus:border-zinc-400 transition"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleSignin}
            className="mt-2 py-2 rounded-md bg-zinc-200 text-black font-medium hover:bg-zinc-100 active:scale-[0.98] transition-all"
          >
            Sign In
          </button>

          <p
            className="text-sm text-zinc-400 text-center mt-3 cursor-pointer hover:text-zinc-200 transition"
            onClick={() => navigate("/signup")}
          >
            Don’t have an account? Sign up
          </p>
        </div>
      </div>
    </div>
  );
}
