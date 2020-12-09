import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import PropTypes from 'prop-types';
import firebase from 'firebase';

import './MyNavbar.scss';

class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
  }

  state = {
    isOpen: false,
  }

  logoutClickEvent = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  };

  render() {
    const { isOpen } = this.state;

    const toggle = () => {
      this.setState({ isOpen: !this.state.isOpen });
    };

    const buildNavbar = () => {
      const { authed } = this.props;
      console.error('auth in navbar', { authed });
      if (authed) {
        return (
          <React.Fragment>
           <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/viewAllBudgets">View All Budgets</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/addNewBudget">New Budget</NavLink>
              </NavItem>
              <NavItem>
         `      <button className='btn btn-danger' onClick={this.logoutClickEvent}>Logout</button>
              </NavItem>
            </Nav>
          </Collapse>
        </React.Fragment>
        );
      }
      return '';
    };

    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/home">Holiday Budget Planner</NavbarBrand>
          { buildNavbar() }
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
