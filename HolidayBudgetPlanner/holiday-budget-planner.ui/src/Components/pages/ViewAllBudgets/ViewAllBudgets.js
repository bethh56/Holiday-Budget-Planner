import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import budgetData from '../../../helpers/data/budgetData';
import PreviousBudget from '../PreviousBudget/PreviousBudget';
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
              <ListGroupItem href="/previousBudget">{b.holidayName} ({b.dateCreated})</ListGroupItem>
           </ListGroup>
        ))}
      </div>
    );
  }
}

export default ViewAllBudgets;
