import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import MyNavbar from '../Components/shared/MyNavbar/MyNavbar';

import './App.scss';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
          <React.Fragment>
            <MyNavbar/>
            <div className="container">
              <div className="row">
                <Switch>
                </Switch>
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
    </div>
  );
}

export default App;
