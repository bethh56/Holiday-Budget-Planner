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
        this.setState({ itemFormOpen: false });
      })
      .catch((err) => console.error('unable to add item category', err));
  }

  render() {
    const { item, removeItem, itemlineItems } = this.props;
    const { addItemForm } = this.state;

    return (
      <div className="BudgetItemTable">
        <h4>{item.categoryName}</h4>
        <h5>Amount Spent: ${item.totalPrice}</h5>
        <button className="btn btn-primary" onClick={() => this.setState({ addItemForm: true })}>Add Item</button>
        { addItemForm ? <NewItemForm addItemForm={addItemForm} nameOfCategory={item.categoryName} itemBudgetId={item.budgetId} addItemEvent={this.addItemEvent}/> : ''}
        <Table>
      <thead>
        <tr>
          <th>Item Name</th>
          <th>price</th>
        </tr>
      </thead>
      <tbody>
      {itemlineItems?.map((i, indx) => (
        (i.categoryName === item.categoryName)
          ? <tr>
          <td>{i.itemName}</td>
          <td>${i.price}</td>
          <td> <button className="btn btn-danger" onClick={() => removeItem(i.id)}><i className="fas fa-trash-alt"></i></button> </td>
          </tr>
          : <></>
      ))}
      </tbody>
      </Table>
      </div>
    );
  }
}

export default BudgetItemTable;
