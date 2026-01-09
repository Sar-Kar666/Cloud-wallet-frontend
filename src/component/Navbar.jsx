import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export function Navbar() {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchMe() {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setUser(res.data);
      } catch {
        localStorage.removeItem("token");
        navigate("/signin");
      }
    }

    fetchMe();
  }, []);

  function logout() {
    localStorage.removeItem("token");
    navigate("/signin");
  }

  return (
    <div className="border-b border-white/10 bg-black">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-semibold">Cloud Wallet</h1>

        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 hover:bg-white/20"
          >
            <span className="text-sm">
              {user?.username || "Loading"}
            </span>
            <span>👤</span>
          </button>

          {showProfile && user && (
            <div className="absolute right-0 mt-3 w-72 rounded-xl border border-white/10 bg-black p-4">
              <div className="text-sm mb-2 font-medium">
                {user.username}
              </div>

              <div className="text-xs text-gray-400 mb-1">
                Public Address
              </div>

              <div className="break-all text-xs bg-white/5 p-2 rounded mb-4">
                {user.publicKey}
              </div>

              <button
                onClick={logout}
                className="w-full py-2 bg-white text-black rounded hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
