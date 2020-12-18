import React from 'react';
import { ListGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import budgetData from '../../../helpers/data/budgetData';
import './ViewAllBudgets.scss';

class ViewAllBudgets extends React.Component {
  state = {
    budget: [],
  }

  getListOfAllBudgets = () => {
    budgetData.getAllBudgets(2)
      .then((budget) => this.setState({ budget }))
      .catch((err) => console.error('unable to get budget line item info'));
  }

  componentDidMount() {
    this.getListOfAllBudgets();
  }

  // removeBudget = (budgetId) => {
  //   budgetData.deleteBudget(budgetId)
  //     .then(() => {
  //       this.getAllBudgets();
  //     })
  //     .catch((err) => console.error('unable to delete budget', err));
  // }

  formatDate = (date) => `${date.slice(5, 10)}-${date.slice(0, 4)}`;

  render() {
    const { budget } = this.state;
    return (
      <div className="viewAllBudgets">
        <h1>View All Budgets</h1>
        {budget.map((b) => (
          <li className="mb-2">
            <Link to ={`/previousBudget/${b.id}`}>{b.holidayName}  { this.formatDate(b.dateCreated) } </Link>
            <button className="btn btn-danger mb-2" onClick={ this.removeBudget(b.id) }><i className="fas fa-trash-alt"></i></button>
          </li>
        ))}
      </div>
    );
  }
}

export default ViewAllBudgets;
