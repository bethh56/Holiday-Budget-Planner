import React from 'react';
import PropTypes from 'prop-types';
import './NewItemForm.scss';

class ItemCatergoryForm extends React.Component {
  static propTypes = {
    addItemEvent: PropTypes.func.isRequired,
  }

  state = {
    nameOfItem: '',
    priceOfItem: '',
  }

  itemNameChange = (e) => {
    e.preventDefault();
    this.setState({ nameOfItem: e.target.value });
  }

  priceChange = (e) => {
    e.preventDefault();
    this.setState({ priceOfItem: e.target.value });
  }

  saveItem = (e) => {
    e.preventDefault();
    const { nameOfItem, priceOfItem } = this.state;
    const { itemBudgetId, nameOfCategory, addItemEvent } = this.props;

    const newItem = {
      categoryName: nameOfCategory,
      budgetId: itemBudgetId,
      itemName: nameOfItem,
      price: priceOfItem,
    };
    addItemEvent(newItem);
  }

  render() {
    const {
      nameOfItem,
      priceOfItem,
    } = this.state;

    return (
      <div className="GiftForm">
        <h4>Add Item Category</h4>
        <form>
        <div className="form-group">
            <label className="formLabel" htmlFor="itemName">Item Name</label>
            <input type="text"
            className="form-control"
            id="itemName"
            placeholder="Enter Item Name"
            value={nameOfItem}
            onChange={this.itemNameChange}
            />
          </div>
          <div className="form-group">
            <label className="formLabel" htmlFor="price">Price</label>
            <input type="text"
            className="form-control"
            id="price"
            placeholder="Enter Price as number only"
            value={priceOfItem}
            onChange={this.priceChange}
            />
          </div>
          <button type="submit" className="submit btn btn-primary" onClick={this.saveCateogry}>Submit</button>
          <button className="btn btn-primary ml-2" onClick={() => this.setState({ addItemForm: false })}>Close Form</button>
        </form>
      </div>
    );
  }
}

export default ItemCatergoryForm;
