import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Start from './components/Start';
import Home from './components/Home';
import Details from './components/Details';
import CreateRecipe from './components/CreateRecipe';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Switch>
          <Route exact path={'/' } component={Start}></Route>
          <Route path={'/home'} exact component={Home}></Route>
          <Route path={"/home/:id"} component={Details}></Route>
          <Route path={"/recipe"} component={CreateRecipe}></Route>
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
