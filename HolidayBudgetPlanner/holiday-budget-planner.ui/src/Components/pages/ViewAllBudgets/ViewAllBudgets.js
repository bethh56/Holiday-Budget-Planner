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
    budgetData.getAllBudgets(1)
      .then((budget) => this.setState({ budget }))
      .catch((err) => console.error('unable to get budget line item info'));
  }

  componentDidMount() {
    this.getListOfAllBudgets();
  }

  render() {
    const { budget } = this.state;
    return (
      <div className="viewAllBudgets">
        <h1>View All Budgets</h1>
        {budget.map((b) => (
           <ListGroup>
              <Link className="btn btn-secondary" to ={`/previousBudget/${b.id}`}>{b.holidayName} ({b.dateCreated})</Link>
           </ListGroup>
        ))}
      </div>
    );
  }
}

export default ViewAllBudgets;
