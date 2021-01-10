import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './PriorBudgetList.scss';

class PriorBudgetList extends React.Component {
  static propTypes = {
    removeBudget: PropTypes.func.isRequired,
  }

  formatDate = (date) => `${date.slice(5, 10)}-${date.slice(0, 4)}`;

  render() {
    const { oldBudget, removeBudget, holiday } = this.props;

    const buildPriorBudgetList = () => (
        <div className="card m-auto">
          <div className="card-body">
            <h4>{oldBudget.holidayName}</h4>
            <h5>Created on: { this.formatDate(oldBudget.dateCreated) } </h5>
            <h6>Amount Remaining: ${oldBudget.budgetAmount}</h6>
            <button className="deleteBudgetBtn mr-1" onClick={() => removeBudget(oldBudget.id)}><i className="fas fa-trash-alt"></i> Delete</button>
            <Link className="viewBudget ml-1" to ={`/previousBudget/${oldBudget.id}`}>View Budget</Link>
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
