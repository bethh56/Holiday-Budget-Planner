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
    const { oldBudget, removeBudget } = this.props;
    return (
      <div className="viewAllBudgets">
          <li className="mb-2">
            <Link to ={`/previousBudget/${oldBudget.id}`}>{oldBudget.holidayName}  { this.formatDate(oldBudget.dateCreated) } </Link>
            <button className="btn btn-danger mb-2" onClick={() => removeBudget(oldBudget.id)}><i className="fas fa-trash-alt"></i></button>
          </li>
      </div>
    );
  }
}

export default PriorBudgetList;
