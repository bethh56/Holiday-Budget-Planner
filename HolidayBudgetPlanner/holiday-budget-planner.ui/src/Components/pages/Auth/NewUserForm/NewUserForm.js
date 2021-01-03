import React from 'react';
import PropTypes from 'prop-types';
import authData from '../../../../helpers/data/authData';
import './NewUserForm.scss';

class NewUserForm extends React.Component {
  state = {
    user: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    },
  }

  registerClickEvent = (e) => {
    const { user } = this.state;
    e.preventDefault();
    authData
      .registerUser(user)
      .then(() => {
        this.props.history.push('/home');
      })
      .catch((error) => {
        console.error('there was an error in registering', error);
      });
  };

  firstNameChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.firstName = e.target.value;
    this.setState({ user: tempUser });
  };

  lastNameChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.lastName = e.target.value;
    this.setState({ user: tempUser });
  };

  emailChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.email = e.target.value;
    this.setState({ user: tempUser });
  };

  passwordChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.password = e.target.value;
    this.setState({ user: tempUser });
  };

  render() {
    const { user } = this.state;

    return (
      <div className="newUserForm m-auto">
        <h3 className="userForm">Create New User</h3>
        <form>
        <div className="form-group">
            <label className="formLabel" htmlFor="userFirstName">First Name</label>
            <input type="text"
            className="form-control"
            id="firstName"
            placeholder="Enter First Name"
            value={this.state.user.firstName}
            onChange={this.firstNameChange}
            />
          </div>
          <div className="form-group">
            <label className="formLabel" htmlFor="userLastName">Last Name</label>
            <input type="text"
            className="form-control"
            id="lastName"
            placeholder="Enter Last Name"
            value={this.state.user.lastName}
            onChange={this.lastNameChange}
            />
          </div>
          <div className="form-group">
            <label className="formLabel" htmlFor="email">Email</label>
            <input type="text"
            className="form-control"
            id="email"
            placeholder="Enter Email"
            value={this.state.user.email}
            onChange={this.emailChange}
            />
          </div>
          <div className="form-group">
            <label className="formLabel" htmlFor="userPassword">Password</label>
            <input type="text"
            className="form-control"
            id="userPassword"
            placeholder="Enter Password"
            value={this.state.user.password}
            onChange={this.passwordChange}
            />
          </div>
          <div className="text-center">
          <button type="submit" className="createNewUserBtn" onClick={this.registerClickEvent}>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default NewUserForm;
