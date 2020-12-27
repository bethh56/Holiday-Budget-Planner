import React from 'react';
import PropTypes from 'prop-types';
import './ItemCatergoryForm.scss';

class ItemCatergoryForm extends React.Component {
  static propTypes = {
    addItemCategoryEvent: PropTypes.func.isRequired,
  }

  state = {
    categoryNameChange: '',
    budgetId: '',
  }

  saveCateogry = (e) => {
    e.preventDefault();
    const { categoryNameChange } = this.state;
    const { addItemCategoryEvent, budget } = this.props;

    const newCategoryName = {
      categoryName: categoryNameChange,
      budgetId: budget,
    };
    addItemCategoryEvent(newCategoryName);
  }

  itemCategoryNameChange = (e) => {
    e.preventDefault();
    this.setState({ categoryNameChange: e.target.value });
  }

  render() {
    const {
      categoryNameChange,
    } = this.setState;

    return (
      <div className="GiftForm">
        <h4>Add Item Category</h4>
        <form>
        <div className="form-group">
            <label className="formLabel" htmlFor="itemCategory">Category Name</label>
            <input type="text"
            className="form-control"
            id="itemCategory"
            placeholder="Enter Category Name"
            value={categoryNameChange}
            onChange={this.itemCategoryNameChange}
            />
          </div>
          <button type="submit" className="submit btn btn-primary" onClick={this.saveCateogry}>Submit</button>
          <button className="btn btn-primary ml-2" onClick={() => this.setState({ itemFormOpen: false })}>Close Form</button>
        </form>
      </div>
    );
  }
}

export default ItemCatergoryForm;
