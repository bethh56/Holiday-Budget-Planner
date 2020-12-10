import React from 'react';
import budgetData from '../../../helpers/data/bugdgetData';
import giftData from '../../../helpers/data/giftData';
import itemData from '../../../helpers/data/itemData';

import BudgetDetails from '../../shared/BudgetDetails/BudgetDetails';
import BudgetItemTable from '../../shared/BudgetItemTable/BudgetItemTable';
import GiftTable from '../../shared/GiftTable/GiftTable';
import './Home.scss';

class Home extends React.Component {
  state = {
    budget: [],
    category: [],
    gift: [],
  }

  // gets the amount in the budget and is displayed in Budget Details
  getCurrentBudgetAmountInfo = () => {
    budgetData.getCurrentBudget(1)
      .then((budget) => this.setState({ budget }))
      .catch((err) => console.error('unable to get budget info'));
  }

  getBudgetItems = () => {
    itemData.getBudgetItems(1)
      .then((category) => this.setState({ category }))
      .catch((err) => console.error('unable to get budget item info'));
  }

  getGiftInfo = () => {
    giftData.getGiftBudget(1)
      .then((gift) => this.setState({ gift }))
      .catch((err) => console.error('unable to get budget item info'));
  }

  componentDidMount() {
    this.getCurrentBudgetAmountInfo();
    this.getBudgetItems();
  }

  render() {
    const { budget, category, gift } = this.state;
    const buildCurrentViewedBudget = [budget].map((budgetPlan) => (<BudgetDetails key={budgetPlan.id} budgetPlan={budgetPlan}/>));
    const buildItemTable = [category].map((item) => (<BudgetItemTable key={item.id} item={item}/>));
    const buildGiftTable = [gift].map((item) => (<GiftTable key={item.id} item={item}/>));

    return (
      <div className="home">
        <h1>Home</h1>
        {buildCurrentViewedBudget}
        {buildGiftTable}
        {buildItemTable}
      </div>
    );
  }
}

export default Home;
