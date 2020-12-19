import React from 'react';
import { Table } from 'reactstrap';
import itemData from '../../../helpers/data/itemData';
import './BudgetItemTable.scss';

class BudgetItemTable extends React.Component {
  state = {
    lineItems: [],
  }

  render() {
    const { item, removeItem, itemlineItems } = this.props;

    return (
      <div className="BudgetItemTable">
        <h4>{item.categoryName}</h4>
        <h5>Amount Spent: ${item.totalPrice}</h5>
        <Table>
      <thead>
        <tr>
          <th>Item Name</th>
          <th>price</th>
        </tr>
      </thead>
      <tbody>
          <tr>
          <td>{itemlineItems.itemName}</td>
          <td>${itemlineItems.price}</td>
          <td> <button className="btn btn-danger" onClick={() => removeItem(itemlineItems.id)}><i className="fas fa-trash-alt"></i></button> </td>
          </tr>
      </tbody>
      </Table>
      </div>
    );
  }
}

export default BudgetItemTable;
