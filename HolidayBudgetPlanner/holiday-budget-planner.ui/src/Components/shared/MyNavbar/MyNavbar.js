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

import {
  Link,
} from 'react-router-dom';

class MyNavbar extends React.Component {
  state = {
    isOpen: false,
  }

  render() {
    const { isOpen } = this.state;

    const toggle = () => {
      this.setState({ isOpen: !this.state.isOpen });
    };

    return (
      <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/home">Holiday Budget Planner</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/viewAllBudgets">View All Budgets</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/addNewBudget">New Budget</NavLink>
                <Link className='btn btn-primary' to="/login">Click to login </Link>
              </NavItem>
            <NavItem>
              <button className='btn btn-danger'>Logout</button>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
    );
  }
}

export default MyNavbar;
