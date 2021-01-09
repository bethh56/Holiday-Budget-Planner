import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import fbConnection from '../helpers/data/connection';
import MyNavbar from '../Components/shared/MyNavbar/MyNavbar';
import Home from '../Components/pages/Home/Home';
import ViewAllBudgets from '../Components/pages/ViewAllBudgets/ViewAllBudgets';
import AddNewBudget from '../Components/pages/AddNewBudget/AddNewBudget';
import PreviousBudget from '../Components/pages/PreviousBudget/PreviousBudget';
import NewUserForm from '../Components/pages/Auth/NewUserForm/NewUserForm';
import Auth from '../Components/pages/Auth/Auth';

import './App.scss';

fbConnection();

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true
    ? (<Component { ...props } />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken()
        // save the token to the session storage
          .then((token) => sessionStorage.setItem('token', token));
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar authed={authed}/>
            <div className="container">
              <div className="row">
              <Switch>
                <PublicRoute path='/auth' component={Auth} authed={authed}/>
                <PublicRoute path='/createNewUser' component={NewUserForm} authed={authed}/>
                <Route path='/viewAllBudgets' component={ViewAllBudgets} authed={authed}/>
                <Route path='/previousBudget' component={PreviousBudget} authed={authed}/>
                <Route path='/addNewBudget' component={AddNewBudget} authed={authed}/>
                <PrivateRoute path='/home' component={Home} authed={authed}/>
                <Redirect from='*' to='/home' />
              </Switch>
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
