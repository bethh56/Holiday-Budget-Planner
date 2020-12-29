import React from 'react';
import { Table } from 'reactstrap';
import NewItemForm from '../NewItemForm/NewItemForm';
import './BudgetItemTable.scss';

class BudgetItemTable extends React.Component {
  state = {
    lineItems: [],
    addItemForm: false,
  }

  render() {
    const { item, removeItem, itemlineItems } = this.props;
    const { addItemForm } = this.state;

    return (
      <div className="BudgetItemTable">
        <h4>{item.categoryName}</h4>
        <h5>Amount Spent: ${item.totalPrice}</h5>
        <button className="btn btn-primary" onClick={() => this.setState({ addItemForm: true })}>Add Item</button>
        { addItemForm ? <NewItemForm addItemForm={addItemForm} item={item.categoryName} itemBudgetId={item.budgetId} addItemEvent={this.addItemEvent}/> : ''}
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
