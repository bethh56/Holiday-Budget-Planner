import React from 'react';
import moment from 'moment';
import budgetData from '../../../helpers/data/budgetData';
import holidayData from '../../../helpers/data/holidayData';
import './AddNewBudget.scss';

class AddNewBudget extends React.Component {
  state = {
    idOfHoliday: '',
    budget: '',
    holiday: [],
    // user: '2',
    // date: '11/17/2020',
  }

  setBudget = (e) => {
    e.preventDefault();
    this.setState({ budget: e.target.value });
  }

  setHoliday = (e) => {
    e.preventDefault();
    this.setState({ idOfHoliday: e.target.value });
  }

  saveNewBudget = (e) => {
    e.preventDefault();
    const {
      idOfHoliday,
      budget,
      // user,
      // date,
    } = this.state;

    const newItem = {
      holidayId: idOfHoliday,
      budgetAmount: budget,
      userId: 1,
      dateCreated: moment().format('MMMM Do YYYY, h:mm:ss a'),
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
      budget,
      idOfHoliday,
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
                <option value={idOfHoliday} onChange={this.setHoliday}>{h.holidayName}</option>
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
          value={budget}
          onChange={this.setBudget}/>
        </label>
        <button classname="btn btn-danger" onClick={this.saveNewBudget}>Submit</button>
      </form>
      </div>
    );
  }
}

export default AddNewBudget;
