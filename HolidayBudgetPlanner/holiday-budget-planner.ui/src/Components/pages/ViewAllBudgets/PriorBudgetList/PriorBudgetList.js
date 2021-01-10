import React from 'react';
import PropTypes from 'prop-types';
import ExpandedBudget from '../../../shared/ExpandedBudget/ExpandedBudget';
import './PriorBudgetList.scss';

class PriorBudgetList extends React.Component {
  static propTypes = {
    removeBudget: PropTypes.func.isRequired,
  }

  state = {
    openBudgetDetails: false,
  }

  formatDate = (date) => `${date.slice(5, 10)}-${date.slice(0, 4)}`;

  render() {
    const { oldBudget, removeBudget, holiday } = this.props;
    const { openBudgetDetails } = this.state;

    const buildPriorBudgetList = () => (
        <div className="card m-auto">
          <div className="card-body">
            <h4>{oldBudget.holidayName}</h4>
            <h5>Created on: { this.formatDate(oldBudget.dateCreated) } </h5>
            <h6>Amount Remaining: ${oldBudget.budgetAmount}</h6>
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
