import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import MyNavbar from '../Components/shared/MyNavbar/MyNavbar';
import Home from '../Components/pages/Home/Home';
import ViewAllBudgets from '../Components/pages/ViewAllBudgets/ViewAllBudgets';
import AddNewBudget from '../Components/pages/AddNewBudget/AddNewBudget';

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
                  <Route path='/home' component={Home}/>
                  <Route path='/viewAllBudgets' component={ViewAllBudgets}/>
                  <Route path='/addNewBudget' component={AddNewBudget}/>
                  <Redirect from='*' to='/home' />
                </Switch>
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
    </div>
  );
}

export default App;
