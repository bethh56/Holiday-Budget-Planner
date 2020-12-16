import React from 'react';
import PropTypes from 'prop-types';
import './GiftForm.scss';

class GiftForm extends React.Component {
  static propTypes = {
    addGiftEvent: PropTypes.func.isRequired,
  }

  state = {
    recepientOfGift: '',
    itemForGift: '',
    priceOfGift: '',
    budgetId: '',
  }

  saveGift = (e) => {
    e.preventDefault();
    const { recepientOfGift, itemForGift, priceOfGift } = this.state;
    const { addGiftEvent, budget } = this.props;

    const newGift = {
      recepient: recepientOfGift,
      item: itemForGift,
      price: parseInt(priceOfGift, NaN),
      budgetId: budget,
    };
    addGiftEvent(newGift);
  }

  recepientChange = (e) => {
    e.preventDefault();
    this.setState({ recepientOfGift: e.target.value });
  }

  itemChange = (e) => {
    e.preventDefault();
    this.setState({ itemForGift: e.target.value });
  }

  priceChange = (e) => {
    e.preventDefault();
    this.setState({ priceOfGift: e.target.value });
  }

  render() {
    const {
      recepientOfGift,
      itemForGift,
      priceOfGift,
    } = this.setState;

    const { budget } = this.props;
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
          <div className="form-group">
            <label className="formLabel" htmlFor="itemName">Item</label>
            <input type="text"
            className="form-control"
            id="itemName"
            placeholder="Enter item name"
            value={itemForGift}
            onChange={this.itemChange}
            />
          </div>
          <div className="form-group">
            <label className="formLabel" htmlFor="priceOfItem">Price</label>
            <input type="text"
            className="form-control"
            id="priceOfItem"
            placeholder="Enter Price"
            value={priceOfGift}
            onChange={this.priceChange}
            />
          </div>
          <button type="submit" className="submit btn btn-primary" onClick={this.saveGift}>Submit</button>
          <button className="btn btn-primary ml-2" onClick={() => this.setState({ formOpen: false })}>Close Form</button>
        </form>
      </div>
    );
  }
}

export default GiftForm;
