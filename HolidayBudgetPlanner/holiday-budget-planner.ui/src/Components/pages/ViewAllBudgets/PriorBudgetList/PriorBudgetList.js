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
    if (holiday === 'Christmas') {
      return (
        <div className={`priorBudgets${holiday}`}>
            <ul className="text-center">
              <Link className="link" to ={`/previousBudget/${oldBudget.id}`}>{oldBudget.holidayName}  { this.formatDate(oldBudget.dateCreated) } </Link>
              <button className="deleteBudgetBtn" onClick={() => removeBudget(oldBudget.id)}><i className="fas fa-trash-alt"></i></button>
            </ul>
        </div>
      );
    }
    return (
      <div className="priorBudgets">
          <ul className="text-center">
            <Link className="link" to ={`/previousBudget/${oldBudget.id}`}>{oldBudget.holidayName}  { this.formatDate(oldBudget.dateCreated) } </Link>
            <button className="deleteBudgetBtn" onClick={() => removeBudget(oldBudget.id)}><i className="fas fa-trash-alt"></i></button>
          </ul>
      </div>
    );
  }
}

export default PriorBudgetList;
