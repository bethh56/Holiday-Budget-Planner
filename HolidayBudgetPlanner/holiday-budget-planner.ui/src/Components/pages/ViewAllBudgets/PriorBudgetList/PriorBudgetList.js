import React from 'react';
import PropTypes from 'prop-types';
import ExpandedBudget from '../../../shared/ExpandedBudget/ExpandedBudget';
import './PriorBudgetList.scss';
import itemData from '../../../../helpers/data/itemData';
import giftData from '../../../../helpers/data/giftData';

class PriorBudgetList extends React.Component {
  static propTypes = {
    removeBudget: PropTypes.func.isRequired,
  }

  state = {
    openBudgetDetails: false,
    itemTotalPrice: '',
    giftTotalPrice: '',
  }

  getItemTotalPriceForPreviousBudget = () => {
    const { oldBudget } = this.props;
    itemData.getItemsTotalPriceByBudgetId(oldBudget.id)
      .then((item) => {
        const itemTotalPrice = item.totalPrice;
        this.setState({ itemTotalPrice });
      })
      .catch((err) => console.error('unable to get item total price for previos budgets'));
  }

  getGiftTotalPriceForPreviousBudget = () => {
    const { oldBudget } = this.props;
    giftData.getGiftItemsByBudgetId(oldBudget.id)
      .then((gift) => {
        const giftTotalPrice = gift.totalPrice;
        this.setState({ giftTotalPrice });
      })
      .catch((err) => console.error('unable to get budget line item info'));
  }

  amountLeftToSpend = (budgetAmount, itemTotal, giftTotal) => {
    const checkGift = (giftTotal === undefined) ? 0 : giftTotal;
    const total = budgetAmount - itemTotal - checkGift;
    return total;
  }

  componentDidMount() {
    this.getItemTotalPriceForPreviousBudget();
    this.getGiftTotalPriceForPreviousBudget();
  }

  formatDate = (date) => `${date.slice(5, 10)}-${date.slice(0, 4)}`;

  render() {
    const { oldBudget, removeBudget, holiday } = this.props;
    const { openBudgetDetails, itemTotalPrice, giftTotalPrice } = this.state;

    const buildPriorBudgetList = () => (
        <div className="card m-auto">
          <div className="card-body">
            <h4>{oldBudget.holidayName}</h4>
            <h5>Created on: { this.formatDate(oldBudget.dateCreated) } </h5>
            <h6 className='startAmount'>Starting Amount: ${oldBudget.budgetAmount}</h6>
            <h6 className='currentAmount'>Amount Remaining: ${this.amountLeftToSpend(oldBudget.budgetAmount, itemTotalPrice, giftTotalPrice)}</h6>
            <button className="deleteBudgetBtn mr-1" onClick={() => removeBudget(oldBudget.id)}><i className="fas fa-trash-alt"></i> Delete</button>
            { openBudgetDetails
              ? <button className="viewBudget mr-1" onClick={() => this.setState({ openBudgetDetails: false })}>Close Budget Details</button>
              : <button className="viewBudget mr-1" onClick={() => this.setState({ openBudgetDetails: true })}>Expand Budget Details</button>
            }
            { openBudgetDetails ? <ExpandedBudget openBudgetDetails={openBudgetDetails} budgetId={oldBudget.id}/> : ''}
          </div>
        </div>
    );

    if (holiday === 'Christmas' || holiday === 'Thanksgiving') {
      return (
        <div className={`priorBudgets${holiday}`}>
          {buildPriorBudgetList()}
        </div>
      );
    }
    return (
      <div className="priorBudgets">
          {buildPriorBudgetList()}
      </div>
    );
  }
}

export default PriorBudgetList;
