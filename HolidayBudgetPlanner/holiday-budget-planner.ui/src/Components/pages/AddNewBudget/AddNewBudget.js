import React from 'react';
import { Row, Col } from 'reactstrap';
import moment from 'moment';
import budgetData from '../../../helpers/data/budgetData';
import holidayData from '../../../helpers/data/holidayData';
import userData from '../../../helpers/data/userData';
import './AddNewBudget.scss';
import authData from '../../../helpers/data/authData';
// import authData from '../../../helpers/data/authData';

class AddNewBudget extends React.Component {
  state = {
    idOfHoliday: '',
    budget: '',
    holiday: [],
    loggedInUserId: '',
    holidayNameForStyling: '',
  }

  setBudget = (e) => {
    e.preventDefault();
    this.setState({ budget: e.target.value });
  }

  setHoliday = (e) => {
    e.preventDefault();
    this.setState({ idOfHoliday: e.target.value });
  }

  getUserByUid = () => {
    const u = authData.getUid();
    userData.getSingleUserIdByUid(u)
      .then((getUserId) => {
        const loggedInUserId = getUserId.data;
        this.setState({ loggedInUserId });
      })
      .catch((err) => console.error('unable to get budget line item info'));
  }

  saveNewBudget = (e) => {
    this.getUserByUid();
    e.preventDefault();
    const {
      idOfHoliday,
      budget,
      loggedInUserId,
    } = this.state;

    const newItem = {
      holidayId: parseInt(idOfHoliday, NaN),
      budgetAmount: parseInt(budget, NaN),
      dateCreated: moment().format(),
      userId: loggedInUserId,
    };

    budgetData.addNewBudget(newItem)
      .then(() => this.props.history.push('/home'))
      .catch((err) => console.error('unable to save', err));
  }

  displayHolidayOptions = () => {
    holidayData.getHolidays()
      .then((holiday) => this.setState({ holiday }))
      .catch((err) => console.error('unable to get holiday info'));
  }

  getCurrentHoliday = () => {
    userData.getSingleUserIdByUid('pwjlSsaIDzd4wj1veciEOrg9z3P2')
      .then((getUserId) => {
        const loggedInUserId = getUserId.data;
        this.setState({ loggedInUserId });
        budgetData.getCurrentBudget(loggedInUserId)
          .then((budget) => {
            const holidayNameForStyling = budget.holidayName;
            this.setState({ holidayNameForStyling });
          })
          .catch((err) => console.error('unable to get budget info'));
      });
  }

  componentDidMount() {
    this.displayHolidayOptions();
    this.getCurrentHoliday();
  }

  render() {
    const {
      holiday,
      budget,
      idOfHoliday,
      holidayNameForStyling,
    } = this.state;

    const buildAddNewBudgetPage = () => (
      <div className='m-auto'>
          <h4 className='mb-3'>Create New Budget</h4>
          <form className='form'>
          <Col>
          <Row>
          <label className='m-auto'>
            <select value={idOfHoliday} onChange={this.setHoliday}>
            <option>Select a Holiday</option>
              {
                holiday.map((h) => (
                  <option value={h.id}>{h.holidayName}</option>
                ))
              }
            </select>
          </label>
          </Row>
          </Col>
          <Col>
          <label className='enterBudgetAmountField'>
          Budget Amount:
            <Row>
            <input
            type="text"
            className="form-control"
            id="item-name"
            value={budget}
            onChange={this.setBudget}/>
            </Row>
          </label>
          </Col>
          <button className="addNewBudgetBtn" onClick={this.saveNewBudget}> Submit </button>
        </form>
      </div>
    );

    if (holidayNameForStyling === 'Christmas' || holidayNameForStyling === 'Thanksgiving') {
      return (
        <div className={`addNewBudget${holidayNameForStyling}`}>
          {buildAddNewBudgetPage()}
        </div>
      );
    }
    return (
      <div className="addNewBudget">
        {buildAddNewBudgetPage()}
      </div>
    );
  }
}

export default AddNewBudget;
