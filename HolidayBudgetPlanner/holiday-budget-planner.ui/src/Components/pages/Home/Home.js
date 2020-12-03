import React from 'react';
import BudgetDetails from '../../shared/BudgetDetails/BudgetDetails';
import './Home.scss';

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <h1>Home</h1>
        <BudgetDetails />
      </div>
    );
  }
}

export default Home;
