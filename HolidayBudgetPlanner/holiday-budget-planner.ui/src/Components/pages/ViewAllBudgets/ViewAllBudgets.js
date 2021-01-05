import React from 'react';
import budgetData from '../../../helpers/data/budgetData';
import userData from '../../../helpers/data/userData';
import authData from '../../../helpers/data/authData';
import './ViewAllBudgets.scss';
import PriorBudgetList from './PriorBudgetList/PriorBudgetList';

class ViewAllBudgets extends React.Component {
  state = {
    budget: [],
    loggedInUserId: '',
  }

  getListOfAllBudgets = () => {
    const u = authData.getUid();
    userData.getSingleUserIdByUid(u)
      .then((getUserId) => {
        const loggedInUserId = getUserId.data;
        this.setState({ loggedInUserId });
        budgetData.getAllBudgets(loggedInUserId)
          .then((budget) => this.setState({ budget }))
          .catch((err) => console.error('unable to get budget line item info'));
      });
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
