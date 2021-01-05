import React from 'react';
import firebase from 'firebase';
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
           console.error('user id', loggedInUserId.data);
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
      <div className="addNewBudget text-center">
        <h4>Create New Budget</h4>
        <form>
        <Col>
        <Row>
        <label>
          Select a Holiday
          <select value={idOfHoliday} onChange={this.setHoliday}>
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
        <label>
          Planned Budget Amount:
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
  }
}

export default AddNewBudget;
