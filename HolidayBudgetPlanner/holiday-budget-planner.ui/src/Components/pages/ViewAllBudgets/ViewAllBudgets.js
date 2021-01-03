import React from 'react';
import budgetData from '../../../helpers/data/budgetData';
import './ViewAllBudgets.scss';
import PriorBudgetList from './PriorBudgetList/PriorBudgetList';

class ViewAllBudgets extends React.Component {
  state = {
    budget: [],
  }

  getListOfAllBudgets = () => {
    budgetData.getAllBudgets(1)
      .then((budget) => this.setState({ budget }))
      .catch((err) => console.error('unable to get budget line item info'));
  }

  componentDidMount() {
    this.getListOfAllBudgets();
  }

  removeBudget = (budgetId) => {
    budgetData.deleteBudget(budgetId)
      .then(() => {
        this.getListOfAllBudgets();
      })
      .catch((err) => console.error('unable to delete budget', err));
  }

  formatDate = (date) => `${date.slice(5, 10)}-${date.slice(0, 4)}`;

  render() {
    const { budget } = this.state;
    const getPriorBudgets = budget.map((oldBudget) => (<PriorBudgetList key={oldBudget.id} oldBudget={oldBudget} removeBudget={this.removeBudget}/>));
    return (
      <div className="viewAllBudgets text-center">
        <h1>View All Budgets</h1>
        {getPriorBudgets}
      </div>
    );
  }
}

export default ViewAllBudgets;
