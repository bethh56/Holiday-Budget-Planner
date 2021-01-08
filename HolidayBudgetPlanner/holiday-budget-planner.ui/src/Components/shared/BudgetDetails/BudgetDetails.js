import React from 'react';
import PropTypes from 'prop-types';
import './BudgetDetails.scss';

class BudgetDetails extends React.Component {
  static propTypes = {
    getCurrentBudgetAmountInfo: PropTypes.func.isRequired,
  }

  amountLeftToSpend = (budgetAmount, itemTotal, giftTotal) => {
    const checkGift = (giftTotal === undefined) ? 0 : giftTotal;
    const total = budgetAmount - itemTotal - checkGift;
    return total;
  }

  render() {
    const { budgetPlan, itemTotalPrice, gift } = this.props;
    return (
      <div className='budgetDetails'>
        <h1 className="holidayName">{budgetPlan.holidayName}</h1>
        <h6>Amount Left To Spend: </h6>
        { this.amountLeftToSpend(budgetPlan.budgetAmount, itemTotalPrice, gift.totalPrice) >= 0
          ? <span className="budgetAmount">${this.amountLeftToSpend(budgetPlan.budgetAmount, itemTotalPrice, gift.totalPrice)}</span>
          : <span className="budgetAmountZeroOrBelow">${this.amountLeftToSpend(budgetPlan.budgetAmount, itemTotalPrice, gift.totalPrice)}</span>
        }
      </div>
    );
  }
}

export default BudgetDetails;
