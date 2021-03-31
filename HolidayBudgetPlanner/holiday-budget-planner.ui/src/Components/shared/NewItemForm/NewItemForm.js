import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
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
      price: parseInt(priceOfItem, NaN),
    };
    addItemEvent(newItem);
  }

  render() {
    const {
      nameOfItem,
      priceOfItem,
    } = this.state;

    const { nameOfCategory, holiday } = this.props;

    const buildNewItemForm = () => (
      <div>
          <form>
          <Col>
          <div className="form-group">
            <Row>
              <label className="formLabel" htmlFor="itemName">Item Name</label>
            </Row>
            <Row>
              <input type="text"
              className="form-control"
              id="itemName"
              placeholder="Enter Item Name"
              value={nameOfItem}
              onChange={this.itemNameChange}
              />
            </Row>
            </div>
          </Col>
          <Col>
            <div className="form-group">
            <Row>
              <label className="formLabel" htmlFor="price">Price</label>
            </Row>
            <Row>
              <input type="text"
              className="form-control"
              id="price"
              placeholder="Enter Price"
              value={priceOfItem}
              onChange={this.priceChange}
              />
            </Row>
            </div>
            </Col>
            <button type="submit" className="addItem" onClick={this.saveItem}><i className="fas fa-plus-circle"></i> Add to {nameOfCategory}</button>
            <button className="closeItemFormBtn" onClick={() => this.setState({ addItemForm: false })}><i class="fas fa-times-circle"></i> Close Form</button>
          </form>
      </div>
    );

    // if (holiday === 'Christmas' || holiday === 'Thanksgiving') {
    //   return (
    //     <div className={`newItemForm${holiday}`}>
    //       {buildNewItemForm()}
    //     </div>
    //   );
    // }
    return (
      <div className="newItemForm">
         {buildNewItemForm()}
      </div>
    );
  }
}

export default ItemCatergoryForm;
