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
import Login from '../Components/pages/Login/Login';

// import ordersData from '../helpers/data/ordersData';
import './App.scss';

fbConnection();

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true
    ? (<Component { ...props } />)
    : (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
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
    console.error('is app auth', authed);

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar authed={authed} />
            <div className="container">
              <div className="row">
              <Switch authed={authed}>
                  <Route path='/home' component={Home} authed={authed}/>
                  <Route path='/viewAllBudgets' component={ViewAllBudgets} authed={authed}/>
                  <Route path='/addNewBudget' component={AddNewBudget} authed={authed}/>
                  <Route path='/login' component={Login} authed={authed}/>
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
