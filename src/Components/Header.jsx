import { motion } from "framer-motion";

export default function Header() {
  return (
    <header className="relative overflow-hidden py-8 md:py-12">
      {/* Background Gradient Layer */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 -z-10"></div>

      {/* Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-xl mx-auto px-6 text-center backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-xl p-6 md:p-10"
      >
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-wide drop-shadow-md">
          Uzzal <span className="text-yellow-400">Photo Puzzle</span>
        </h1>

        <p className="mt-3 text-gray-200 text-sm md:text-lg italic">
          “Unlock every piece — reveal the art within.”
        </p>

        <div className="mt-6 flex justify-center gap-3">
          {/* <button className="px-5 py-2 md:px-6 md:py-2.5 rounded-full bg-yellow-400 text-black font-medium hover:bg-yellow-300 transition-all">
            Play Now
          </button>
          <button className="px-5 py-2 md:px-6 md:py-2.5 rounded-full border border-gray-300 text-white hover:bg-white/10 transition-all">
            Learn More
          </button> */}
        </div>
      </motion.div>
    </header>
  );
}

