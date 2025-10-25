import React from "react";
import ItemGrid from "./components/ItemGrid";
import items from "./data/items"; // ✅ default import (no curly braces)
import "./App.css";

function App() {
  console.log(items);
  return (
    <div className="min-h-screen bg-gray-50">
      <ItemGrid items={items} />
    </div>
  );
}

export default App;
