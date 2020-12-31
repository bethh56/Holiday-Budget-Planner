import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import authData from '../../../helpers/data/authData';

class Auth extends React.Component {
  // static propTypes = {
  //   authed: PropTypes.bool.isRequired,
  // }

  state = {
    user: {
      email: '',
      password: '',
    },
  };

  loginClickEvent = (e) => {
    const { user } = this.state;
    e.preventDefault();
    authData.loginUser(user)
      .then(() => {
        this.props.history.push('/home');
      })
      .catch((error) => {
        console.error('there was an error with login', error);
      });
  };

  emailChange = (e) => {
    const userInfo = { ...this.state.user };
    userInfo.email = e.target.value;
    this.setState({ user: userInfo });
  };

  passwordChange = (e) => {
    const userInfo = { ...this.state.user };
    userInfo.password = e.target.value;
    this.setState({ user: userInfo });
  };

  render() {
    const { user } = this.state;
    return (
      <div className="Login m-auto">
        <div id="login-form">
          <h1 className="text-center">Login</h1>
          <form className="form-horizontal">
            <div className="form-group">
              <label htmlFor="inputEmail" className="control-label">
                Email:
              </label>
              <div>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  placeholder="Email"
                  value={user.email}
                  onChange={this.emailChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword" className="control-label">
                Password:
              </label>
              <div>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Password"
                  value={user.password}
                  onChange={this.passwordChange}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12 text-center">
                <Link to ={'/createNewUser'}>Need to Register?</Link>
              </div>
            </div>
            <div className="form-group">
              <div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.loginClickEvent}>
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Auth;
