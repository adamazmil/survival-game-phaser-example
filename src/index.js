import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import game from "./game/iso-game.js";
//import game from "./game/test-game.js";

// ReactDOM.create(<App />, document.getElementById("root"));
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
