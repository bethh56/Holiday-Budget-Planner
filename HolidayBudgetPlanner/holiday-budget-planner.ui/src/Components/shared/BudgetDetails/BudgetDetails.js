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
    const {
      budgetPlan, itemTotalPrice, gift, holiday,
    } = this.props;

    const buildBudgetDetails = () => (
      <div>
          <h1 className="holidayName">{budgetPlan.holidayName}</h1>
          <h6 className='amountLeftToSpendText'>Amount Left To Spend: </h6>
        { this.amountLeftToSpend(budgetPlan.budgetAmount, itemTotalPrice, gift.totalPrice) >= 0
          ? <span className="budgetAmount">${this.amountLeftToSpend(budgetPlan.budgetAmount, itemTotalPrice, gift.totalPrice)}</span>
          : <span className="budgetAmountZeroOrBelow">${this.amountLeftToSpend(budgetPlan.budgetAmount, itemTotalPrice, gift.totalPrice)}</span>
        }
      </div>
    );

    if (holiday === 'Christmas' || holiday === 'Thanksgiving') {
      return (
        <div className={holiday}>
          {buildBudgetDetails()}
      </div>
      );
    } return (
        <div className='budgetDetails'>
          {buildBudgetDetails()}
      </div>
    );
  }
}

export default BudgetDetails;
