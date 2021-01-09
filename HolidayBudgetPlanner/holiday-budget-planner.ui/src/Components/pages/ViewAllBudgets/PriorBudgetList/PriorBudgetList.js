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
      <div>
           <ul className="text-center">
              <Link className="link" to ={`/previousBudget/${oldBudget.id}`}>{oldBudget.holidayName}  { this.formatDate(oldBudget.dateCreated) } </Link>
              <button className="deleteBudgetBtn" onClick={() => removeBudget(oldBudget.id)}><i className="fas fa-trash-alt"></i></button>
            </ul>
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
