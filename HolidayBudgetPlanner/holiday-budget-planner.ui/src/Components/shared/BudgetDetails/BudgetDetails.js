import React from 'react';
import './BudgetDetails.scss';

class BudgetDetails extends React.Component {
  test = () => {
    const { itemTotalPrice } = this.props;
    itemTotalPrice.map((item) => (console.error('totalPrice', item.totalPrice)));
  }

  render() {
    const { budgetPlan } = this.props;
    return (
      <div className='budgetDetails'>
        <h1 className="holidayName">{budgetPlan.holidayName}</h1>
        <h6>Amount Left To Spend: </h6>
        <span className="budgetAmount">${budgetPlan.budgetAmount}</span>
      </div>
    );
  }
}

export default BudgetDetails;
