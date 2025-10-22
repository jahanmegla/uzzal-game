import './App.css'

import Header from './Components/Header'
import PuzzlePhoto from './Components/PhotoPuzzle'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      {/* Header */}
      <Header />

      {/* Puzzle section */}
      <main className="max-w-4xl mx-auto p-6">
        <PuzzlePhoto />
      </main>

      {/* Footer / additional content */}
      
      <footer className="text-center py-8 border-t border-white/20 backdrop-blur-sm bg-white/5">
 

  

  <p className="text-xs md:text-sm text-white/70">
    © {new Date().getFullYear()}{" "}
    <span className="font-semibold text-yellow-400">
      Uzzal Puzzle Game
    </span>{" "}
    • Built with 💙 by{" "}
    <a
      href="https://github.com/jahanmegla"
      target="_blank"
      rel="noopener noreferrer"
      className="text-yellow-300 hover:text-yellow-200 transition-colors"
    >
      Nusrat Jahan
    </a>
  </p>
</footer>

    </div>
  )
}

export default App

