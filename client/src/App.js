import React from "react";
import { Route } from "react-router-dom";
import './App.css';
import Landing from "./components/Landing/Landing"
import Home from "./components/Home/Home"
import Form from "./components/CrearReceta/form";
import Detail from "./components/Detail/Detail";



function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Landing}/>
      <Route exact path='/home' component={Home}/>
      <Route exact path='/home/detail' component={Detail}/>
      <Route exact path='/home/create' component={Form}/>
    </div>
  );
}

export default App;
