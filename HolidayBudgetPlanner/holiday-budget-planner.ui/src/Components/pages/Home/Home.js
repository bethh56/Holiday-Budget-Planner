import React from 'react';
import budgetData from '../../../helpers/data/budgetData';
import itemData from '../../../helpers/data/itemData';

import BudgetDetails from '../../shared/BudgetDetails/BudgetDetails';
import BudgetItemTable from '../../shared/BudgetItemTable/BudgetItemTable';
import './Home.scss';

class Home extends React.Component {
  state = {
    budget: [],
    budgetItem: [],
    lineItems: [],
  }

  getCurrentBudgetAmountInfo = () => {
    budgetData.getCurrentBudget(2)
      .then((budget) => this.setState({ budget }))
      .catch((err) => console.error('unable to get budget info'));
  }

  getBudgetItems = () => {
    itemData.getBudgetItems(2)
      .then((budgetItem) => this.setState({ budgetItem }))
      .catch((err) => console.error('unable to get budget item info'));
  }

  componentDidMount() {
    this.getCurrentBudgetAmountInfo();
    this.getBudgetItems();
    // this.getBudgetLineItems();
  }

  render() {
    const { budget, budgetItem } = this.state;
    const buildCurrentViewedBudget = [budget].map((budgetPlan) => (<BudgetDetails key={budgetPlan.id} budgetPlan={budgetPlan}/>));
    const buildItemTable = [budgetItem].map((item) => (<BudgetItemTable key={item.id} item={item}/>));
    // const getLineItemsForTable = [lineItems].map((line) => (<BudgetItemTable key={line.id} line={line}/>));

    return (
      <div className="home">
        <h1>Home</h1>
        {buildCurrentViewedBudget}
        {buildItemTable}
      </div>
    );
  }
}

export default Home;
