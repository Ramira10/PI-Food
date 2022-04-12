import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Start from './components/Start';
import Home from './components/Home';

function App() {
  return (
    <div> 
      <Route exact path={'/'}> <Start></Start> </Route>
      <Route path={'/home'}> <Home></Home> </Route>
    </div>
    
  );
}

export default App;
