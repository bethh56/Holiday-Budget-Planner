import React from 'react';
import PropTypes from 'prop-types';
import './GiftForm.scss';

class GiftForm extends React.Component {
  static propTypes = {
    addGiftEvent: PropTypes.func.isRequired,
  }

  state = {
    recepient: '',
    item: '',
    price: '',
    budgetId: '',
  }

  render() {
    const {
      recepient,
      item,
      price,
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
            value={recepient}
            onChange={this.recepientChange}
            />
          </div>
          <div className="form-group">
            <label className="formLabel" htmlFor="itemName">Item</label>
            <input type="text"
            className="form-control"
            id="itemName"
            placeholder="Enter item name"
            value={item}
            onChange={this.itemChange}
            />
          </div>
          <div className="form-group">
            <label className="formLabel" htmlFor="priceOfItem">Price</label>
            <input type="text"
            className="form-control"
            id="priceOfItem"
            placeholder="Enter Price"
            value={price}
            onChange={this.priceChange}
            />
          </div>
          <button type="submit" className="submit" onClick={this.saveGift}>Submit</button>
          <button className="btn btn-primary" onClick={() => this.setState({ formOpen: false })}>Close Form</button>
        </form>
      </div>
    );
  }
}

export default GiftForm;
