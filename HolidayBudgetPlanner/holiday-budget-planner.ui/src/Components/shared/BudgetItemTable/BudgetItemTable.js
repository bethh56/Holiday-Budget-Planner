import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import NewItemForm from '../NewItemForm/NewItemForm';
import itemData from '../../../helpers/data/itemData';
import './BudgetItemTable.scss';

class BudgetItemTable extends React.Component {
  static propTypes = {
    getBudgetItems: PropTypes.func.isRequired,
    getBudgetLineItems: PropTypes.func.isRequired,
  }

  state = {
    lineItems: [],
    addItemForm: false,
  }

  addItemEvent = (newItem) => {
    const { getBudgetItems, getBudgetLineItems } = this.props;
    itemData.addItemCategory(newItem)
      .then(() => {
        getBudgetItems();
        getBudgetLineItems();
        this.setState({ addItemForm: false });
      })
      .catch((err) => console.error('unable to add item category', err));
  }

  render() {
    const { item, removeItem, itemlineItems } = this.props;
    const { addItemForm } = this.state;

    return (
      <div className="BudgetItemTable">
            <h5 className="itemCategoryName">{item.categoryName}</h5>
            <h6> Total Spent: <span className="itemTotalSpent">${item.totalPrice} </span></h6>
        <Table>
      <thead>
        <tr>
          <th>Item Name</th>
          <th>Cost</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {itemlineItems.map((i, indx) => (
        i.lineItems.map((j) => (
          (j.categoryName === item.categoryName && j.itemName != null && j.price != null)
            ? <tr>
          <td>{j.itemName}</td>
          <td>${j.price}</td>
          <td> <button className="deleteItem" onClick={() => removeItem(j.id)}><i className="fas fa-trash-alt"></i></button> </td>
          </tr>
            : <></>
        ))
      ))}
      </tbody>
      </Table>
      {addItemForm ? <div/> : <button className="addItemBtn" onClick={() => this.setState({ addItemForm: true })}><i class="fas fa-plus-circle"></i> {item.categoryName}</button>}
      { addItemForm ? <NewItemForm addItemForm={addItemForm} nameOfCategory={item.categoryName} itemBudgetId={item.budgetId} addItemEvent={this.addItemEvent}/> : ''}
      </div>
    );
  }
}

export default BudgetItemTable;
