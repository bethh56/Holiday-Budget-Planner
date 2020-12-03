import React from 'react';
import './BudgetDetails.scss';

class BudgetDetails extends React.Component {
  render() {
    const { budgetPlan } = this.props;
    return (
      <div className='budgetDetails'>
        <h1>Budget Amount</h1>
        <h2>{budgetPlan.id}</h2>
      </div>
    );
  }
}

export default BudgetDetails;
