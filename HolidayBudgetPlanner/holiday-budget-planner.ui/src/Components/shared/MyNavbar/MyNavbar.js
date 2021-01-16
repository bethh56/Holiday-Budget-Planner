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

import authData from '../../../helpers/data/authData';
import userData from '../../../helpers/data/userData';
import budgetData from '../../../helpers/data/budgetData';
import './MyNavbar.scss';

class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
  }

  state = {
    isOpen: false,
    // holiday: '',
  }

  // code block to try and style navbar by holiday
  // getCurrentHoliday = () => {
  //   userData.getSingleUserIdByUid('pwjlSsaIDzd4wj1veciEOrg9z3P2')
  //     .then((getUserId) => {
  //       const loggedInUserId = getUserId.data;
  //       this.setState({ loggedInUserId });
  //       budgetData.getCurrentBudget(loggedInUserId)
  //         .then((budget) => {
  //           this.setState({ budget });
  //           const holiday = budget.holidayName;
  //           this.setState({ holiday });
  //         })
  //         .catch((err) => console.error('unable to get budget info'));
  //     });
  // }

  // componentDidMount() {
  //   this.getCurrentHoliday();
  // }

  logoutClickEvent = (e) => {
    const { user } = this.state;
    e.preventDefault();
    authData.logoutUser(user)
      .then(() => {
        this.props.history.push('/auth');
      })
      .catch((error) => {
        console.error('there was an error logging out', error);
      });
  };

  render() {
    const { isOpen } = this.state;

    const toggle = () => {
      this.setState({ isOpen: !this.state.isOpen });
    };

    const buildNavbar = () => {
      const { authed } = this.props;
      if (authed === true) {
        return (
          <React.Fragment>
           <NavbarToggler className="openNavbar" onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/viewAllBudgets">
                  <span className="navLink">View All Budgets</span>
                  </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/addNewBudget">
                  <span className="navLink">New Budget</span>
                </NavLink>
              </NavItem>
              <NavItem>
         `      <button className='logOutBtn' onClick={this.logoutClickEvent}>Logout</button>
              </NavItem>
            </Nav>
          </Collapse>
        </React.Fragment>
        );
      }
      return '';
    };

    // if (holiday === 'Christmas' || holiday === 'Thanksgiving') {
    //   return (
    //     <div>
    //       <Navbar className={`navBar${holiday}`} light expand="md">
    //         <NavbarBrand href="/home">
    //           <span className="navbarBrand">Holiday Budget Planner</span>
    //           </NavbarBrand>
    //         { buildNavbar() }
    //       </Navbar>
    //     </div>
    //   );
    // }
    return (
        <div>
          <Navbar className="navBar" light expand="md">
            <NavbarBrand href="/home">
              <span className="navbarBrand">Holiday Budget Planner</span>
              </NavbarBrand>
            { buildNavbar() }
          </Navbar>
        </div>
    );
  }
}

export default MyNavbar;
