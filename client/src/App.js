import React from "react";
import { Route } from "react-router-dom";
import './App.css';
import Landing from "./components/Landing/Landing"
import Home from "./components/Home/Home"
import Form from "./components/CrearReceta/form";
import RecipeDetail from "./components/Detail/Detail";



function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Landing}/>
      <Route exact path='/home' component={Home}/>
      <Route exact path='/home/create' component={Form}/>
      <Route exact path='/recipe/:id' component={RecipeDetail}/>
    </div>
  );
}

export default App;
