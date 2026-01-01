import React from "react";
import Weather from "./components/Weather";

const App = () => {
  return (
    <div className="app">
      <Weather />
      <footer>
        <p className="text-[10px] text-center text-white">
          Built with Vite + react, Express.js and Tailwind CSS, and deployed
          with Vercel.
        </p>
      </footer>
    </div>
  );
};

export default App;
