import React from 'react';
import { Row, Col } from 'reactstrap';
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
    const { holiday } = this.props;

    const buildAddItemCategoryForm = () => (
      <div>
         <form>
          <Col>
          <div className="form-group">
            <Row>
              <label className="formLabel" htmlFor="itemCategory">Category Name</label>
            </Row>
            <Row>
              <input type="text"
              className="form-control"
              id="itemCategory"
              placeholder="Enter Category Name"
              value={categoryNameChange}
              onChange={this.itemCategoryNameChange}
              />
              </Row>
            </div>
          </Col>
            <button type="submit" className="submitCategoryForm" onClick={this.saveCateogry}><i className="fas fa-plus-circle"></i> Add Category</button>
            <button className="closeCategoryFormBtn" onClick={() => this.setState({ itemFormOpen: false })}><i className="fas fa-times-circle"></i> Close Form</button>
          </form>
      </div>
    );

    // if (holiday === 'Christmas' || holiday === 'Thanksgiving') {
    //   return (
    //     <div className={`categoryForm${holiday}`}>
    //       {buildAddItemCategoryForm()}
    //     </div>
    //   );
    // }
    return (
      <div className="categoryForm">
        {buildAddItemCategoryForm()}
      </div>
    );
  }
}

export default ItemCatergoryForm;
