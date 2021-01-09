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
    holiday: '',
  }

  getListOfAllBudgets = () => {
    userData.getSingleUserIdByUid('pwjlSsaIDzd4wj1veciEOrg9z3P2')
      .then((getUserId) => {
        const loggedInUserId = getUserId.data;
        this.setState({ loggedInUserId });
        budgetData.getAllBudgets(loggedInUserId)
          .then((budget) => this.setState({ budget }))
          .catch((err) => console.error('unable to get budget line item info'));
      });
  }

  getCurrentHoliday = () => {
    userData.getSingleUserIdByUid('pwjlSsaIDzd4wj1veciEOrg9z3P2')
      .then((getUserId) => {
        const loggedInUserId = getUserId.data;
        this.setState({ loggedInUserId });
        budgetData.getCurrentBudget(loggedInUserId)
          .then((budget) => {
            const holiday = budget.holidayName;
            this.setState({ holiday });
          })
          .catch((err) => console.error('unable to get budget info'));
      });
  }

  componentDidMount() {
    this.getListOfAllBudgets();
    this.getCurrentHoliday();
  }

  removeBudget = (budgetId) => {
    budgetData.deleteBudget(budgetId)
      .then(() => {
        this.getListOfAllBudgets();
      })
      .catch((err) => console.error('unable to delete budget', err));
  }

  render() {
    const { budget, holiday } = this.state;
    const getPriorBudgets = budget.map((oldBudget) => (<PriorBudgetList key={oldBudget.id} oldBudget={oldBudget} holiday={holiday} removeBudget={this.removeBudget}/>));
    return (
      <div className="viewAllBudgets text-center">
        <h1>View All Budgets</h1>
        {getPriorBudgets}
      </div>
    );
  }
}

export default ViewAllBudgets;
