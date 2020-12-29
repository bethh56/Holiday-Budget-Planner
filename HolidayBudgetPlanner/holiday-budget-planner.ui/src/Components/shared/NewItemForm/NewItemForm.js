import React from 'react';
import PropTypes from 'prop-types';
import './NewItemForm.scss';
import itemData from '../../../helpers/data/itemData';

class ItemCatergoryForm extends React.Component {
  static propTypes = {
    addItemCategoryEvent: PropTypes.func.isRequired,
  }

  state = {
    budgetId: '',
    categoryName: [],
    idOfCategory: '',
  }

  setCategory = (e) => {
    e.preventDefault();
    this.setState({ idOfCategory: e.target.value });
  }

  // saveCateogry = (e) => {
  //   e.preventDefault();
  //   const { categoryNameChange } = this.state;
  //   const { budget } = this.props;

  //   const newCategoryName = {
  //     categoryName: categoryNameChange,
  //     budgetId: budget,
  //   };
  //   addItemCategoryEvent(newCategoryName);
  // }

  getCategoryNameList = () => {
    itemData.getCategoryNames()
      .then((categoryName) => this.setState({ categoryName }))
      .catch((err) => console.error('unable to get category names'));
  }

  componentDidMount() {
    this.getCategoryNameList();
  }

  render() {
    const {
      categoryNameChange,
      categoryName,
      idOfCategory,
    } = this.state;

    return (
      <div className="GiftForm">
        <h4>Add Item Category</h4>
        <form>
        <div className="form-group">
        <label>
          Select a Category
          <select value={idOfCategory} onChange={this.setCategory}>
            {
              categoryName.map((h) => (
              <option>{h.categoryName}</option>
              ))
            }
          </select>
        </label>
        </div>
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
