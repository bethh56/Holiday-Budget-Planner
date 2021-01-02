import React from 'react';
import './BudgetDetails.scss';

class BudgetDetails extends React.Component {
  render() {
    const { budgetPlan } = this.props;
    return (
      <div className='budgetDetails'>
        <h1 className="holidayName">{budgetPlan.holidayName}</h1>
        <h4>Amount Left To Spend:</h4>
        <h1>${budgetPlan.budgetAmount}</h1>
      </div>
    );
  }
}

export default BudgetDetails;
