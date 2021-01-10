import React from 'react';
import budgetData from '../../../helpers/data/budgetData';

import BudgetDetails from '../../shared/BudgetDetails/BudgetDetails';
// import BudgetItemTable from '../../shared/BudgetItemTable/BudgetItemTable';
// import GiftTable from '../../shared/GiftTable/GiftTable';
import './SinglePreviousBudget.scss';

class SinglePreviousBudget extends React.Component {
  state = {
    budget: [],
    itemTotalPrice: 0,
    gift: 0,
  };

  getSingleBudget = () => {
    budgetData.getSingleBudgetByBudgetId(53)
      .then((budget) => this.setState({ budget }))
      .catch((err) => console.error('unable to get budget item info'));
  };

  componentDidMount() {
    this.getSingleBudget();
  }

  render() {
    const {
      budget,
      itemTotalPrice,
      gift,
    } = this.state;

    const buildBudgetPlan = [budget].map((budgetPlan) => (<BudgetDetails key={budgetPlan.id} budgetPlan={budgetPlan} itemTotalPrice={itemTotalPrice} gift={gift}/>));

    return (
      <div className="previousBudget m-auto text-center">
        {buildBudgetPlan}
      </div>
    );
  }
}

export default SinglePreviousBudget;
