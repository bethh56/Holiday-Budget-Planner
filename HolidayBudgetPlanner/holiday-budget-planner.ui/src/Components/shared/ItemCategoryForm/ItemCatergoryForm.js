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

  setCategory = (e) => {
    e.preventDefault();
    this.setState({ idOfCategory: e.target.value });
  }

  itemCategoryNameChange = (e) => {
    e.preventDefault();
    this.setState({ categoryNameChange: e.target.value });
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

  render() {
    const {
      categoryNameChange,
    } = this.state;

    return (
      <div className="categoryForm">
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
          <button type="submit" className="submitCategoryForm" onClick={this.saveCateogry}><i class="fas fa-plus-circle"></i> Add Category</button>
          <button className="closeCategoryFormBtn" onClick={() => this.setState({ itemFormOpen: false })}><i class="fas fa-times-circle"></i> Close Form</button>
        </form>
      </div>
    );
  }
}

export default ItemCatergoryForm;
