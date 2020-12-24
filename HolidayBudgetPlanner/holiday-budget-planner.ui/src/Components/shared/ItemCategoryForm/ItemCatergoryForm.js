import React from 'react';
import PropTypes from 'prop-types';
import './ItemCatergoryForm.scss';

class ItemCatergoryForm extends React.Component {
  static propTypes = {
    addGiftEvent: PropTypes.func.isRequired,
  }

  state = {
    recepientOfGift: '',
    budgetId: '',
  }

  saveGift = (e) => {
    e.preventDefault();
    const { recepientOfGift } = this.state;
    const { addGiftEvent, budget } = this.props;

    const newGift = {
      recepient: recepientOfGift,
      budgetId: budget,
    };
    addGiftEvent(newGift);
  }

  recepientChange = (e) => {
    e.preventDefault();
    this.setState({ recepientOfGift: e.target.value });
  }

  render() {
    const {
      recepientOfGift,
    } = this.setState;

    return (
      <div className="GiftForm">
        <h4>Gift Form</h4>
        <form>
        <div className="form-group">
            <label className="formLabel" htmlFor="recipientName">Recipient Name</label>
            <input type="text"
            className="form-control"
            id="recipientName"
            placeholder="Enter recipient"
            value={recepientOfGift}
            onChange={this.recepientChange}
            />
          </div>
          <button type="submit" className="submit btn btn-primary" onClick={this.saveGift}>Submit</button>
          <button className="btn btn-primary ml-2" onClick={() => this.setState({ formOpen: false })}>Close Form</button>
        </form>
      </div>
    );
  }
}

export default ItemCatergoryForm;
