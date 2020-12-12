import React from 'react';
// import budgetData from '../../../helpers/data/budgetData';
import './AddNewBudget.scss';

class AddNewBudget extends React.Component {
  state = {
    holidayId: '',
    budgetAmount: '',
    currentPlan: false,
  }

  // componentDidMount() {
  //   this.createNewBudget();
  // }

  render() {
    return (
      <div className="addNewBudget">
        <h1>Add New Budget</h1>
      </div>
    );
  }
}

export default AddNewBudget;
