export function Signin() {
  return (
    <div className="h-screen w-screen flex items-center justify-center 
                    bg-gradient-to-br from-black via-zinc-900 to-black">
      
      <div
        className="w-[380px] rounded-xl p-6
                   bg-gradient-to-b from-zinc-900 to-black
                   border border-white/10
                   animate-fade-in">

        <h1 className="text-xl font-medium text-white text-center mb-6">
          Login To Account
        </h1>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="bg-zinc-950 border border-white/10 text-white
                       placeholder-zinc-500 px-3 py-2 rounded-md
                       transition-all duration-200
                       focus:outline-none focus:border-zinc-400
                       focus:bg-black"
          />

          <input
            type="password"
            placeholder="Password"
            className="bg-zinc-950 border border-white/10 text-white
                       placeholder-zinc-500 px-3 py-2 rounded-md
                       transition-all duration-200
                       focus:outline-none focus:border-zinc-400
                       focus:bg-black"
          />

          <button
            className="mt-2 py-2 rounded-md
                       bg-gradient-to-r from-zinc-200 to-white
                       text-black font-medium
                       transition-all duration-300
                       hover:from-white hover:to-zinc-200
                       active:scale-[0.98]">
            Login 
          </button>
        </div>
      </div>
    </div>
  );
}
