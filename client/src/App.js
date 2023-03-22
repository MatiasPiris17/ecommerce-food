import React from "react";
import { Route } from "react-router-dom";
import './App.css';
import Landing from "./components/Landing/Landing"

function App() {
  return (
    <div className="App">
      <h1>Henry Food</h1>
      <Route exact path='/' component={Landing}/>
    </div>
  );
}

export default App;
