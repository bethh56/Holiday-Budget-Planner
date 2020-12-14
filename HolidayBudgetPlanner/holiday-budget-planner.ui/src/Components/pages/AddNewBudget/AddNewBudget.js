import React from 'react';
import budgetData from '../../../helpers/data/budgetData';
import holidayData from '../../../helpers/data/holidayData';
import './AddNewBudget.scss';

class AddNewBudget extends React.Component {
  state = {
    holidayId: '',
    budgetAmount: '',
    userId: '',
    holiday: [],
    dateCreated: '',
  }

  budget = (e) => {
    e.preventDefault();
    this.setState({ budgetAmount: e.target.value });
  }

  setHoliday = (e) => {
    e.preventDefault();
    this.setState({ holidayId: e.target.value });
  }

  saveNewBudget = (e) => {
    e.preventDefault();
    const {
      holidayId,
      budgetAmount,
      userId,
      dateCreated,
    } = this.state;

    const newItem = {
      holidayById: holidayId,
      plannedBudget: budgetAmount,
      2: userId,
      date: dateCreated,
    };
    budgetData.addNewBudget(newItem)
      .then(() => this.props.history.push('/home'))
      .catch((err) => console.error('unable to save new budget', err));
  }

  displayHolidayOptions = () => {
    holidayData.getHolidays()
      .then((holiday) => this.setState({ holiday }))
      .catch((err) => console.error('unable to get holiday info'));
  }

  componentDidMount() {
    this.displayHolidayOptions();
  }

  render() {
    const {
      holiday,
      budgetAmount,
      holidayId,
    } = this.state;
    return (
      <div className="addNewBudget">
        <h1>Create New Budget</h1>
        <form>
        <label>
          Select a Holiday
          <select>
            {
              holiday.map((h, indx) => (
                <option value={holidayId} onChange={this.setHoliday}>{h.holidayName}</option>
              ))
            }
          </select>
        </label>
        <label>
          Planned Budget Amount:
          <input
          type="text"
          className="form-control"
          id="item-name"
          value={budgetAmount}
          onChange={this.budget}/>
        </label>
        <button classname="btn btn-danger" onClick={this.saveNewBudget}>Submit</button>
      </form>
      </div>
    );
  }
}

export default AddNewBudget;
