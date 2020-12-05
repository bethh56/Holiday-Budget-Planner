import React from 'react';
import BudgetDetails from '../../shared/BudgetDetails/BudgetDetails';
import budgetData from '../../../helpers/data/budgetData';
import './Home.scss';

class Home extends React.Component {
  state = {
    budget: [],
  }

  getBudgetInfo = () => {
    budgetData.getCurrentBudget(2)
      .then((budget) => this.setState({ budget }))
      .catch((err) => console.error('unable to get budget info'));
  }

  componentDidMount() {
    this.getBudgetInfo();
  }

  render() {
    const { budget } = this.state;
    const buildCurrentViewedBudget = [budget].map((budgetPlan) => (<BudgetDetails key={budgetPlan.id} budgetPlan={budgetPlan}/>));

    return (
      <div className="home">
        <h1>Home</h1>
        {buildCurrentViewedBudget}
      </div>
    );
  }
}

export default Home;
