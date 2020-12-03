import React from 'react';
import BudgetDetails from '../../shared/BudgetDetails/BudgetDetails';
import BudgetData from '../../../helpers/data/BudgetData';
import './Home.scss';

class Home extends React.Component {
  state = {
    budget: [],
  }

  componentDidMount() {
    BudgetData.getCurrentBudget()
      .then((budget) => this.setState({ budget }))
      .catch((err) => console.error('unable to get budget', err));
  }

  render() {
    const { budget } = this.state;
    const buildCurrentViewedBudget = budget.map((budgetPlan) => (<BudgetDetails key={budgetPlan.id} budgetPlan={budgetPlan}/>));
    return (
      <div className="home">
        <h1>Home</h1>
        {buildCurrentViewedBudget}
      </div>
    );
  }
}

export default Home;
