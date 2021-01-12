import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.scss';

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
      <div className="auth m-auto">
        <div className="loginForm" id="login-form">
          <h2 className="text-center mt-4">Please Login</h2>
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
                <Link className='newUserFormBtn' to ={'/createNewUser'}>Need to Register?</Link>
              </div>
            </div>
            <div className="form-group text-center">
              <div>
                <button
                  type="submit"
                  className="loginBtn"
                  onClick={this.loginClickEvent}>
                  <i className="fas fa-sign-in-alt"></i> Login
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
