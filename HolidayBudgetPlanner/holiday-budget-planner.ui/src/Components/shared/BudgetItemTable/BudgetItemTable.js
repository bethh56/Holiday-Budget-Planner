import React from 'react';
import { Table } from 'reactstrap';
import itemData from '../../../helpers/data/itemData';
import './BudgetItemTable.scss';

class BudgetItemTable extends React.Component {
  state = {
    lineItems: [],
  }

  getBudgetLineItems = () => {
    itemData.getBudgetLineItems(1)
      .then((lineItems) => {
        this.setState({ lineItems });
        console.error('lineItems', lineItems);
      })
      .catch((err) => console.error('unable to get budget line item info'));
  }

  componentDidMount() {
    this.getBudgetLineItems();
  }

  render() {
    const { item, removeItem } = this.props;
    const { lineItems } = this.state;

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
        {lineItems.map((i, indx) => (
          <tr>
          <td key={indx}>{i.itemName}</td>
          <td key={indx}>${i.price}</td>
          <td> <button key={indx} className="btn btn-danger" onClick={() => removeItem(i.id)}><i className="fas fa-trash-alt"></i></button> </td>
          </tr>
        ))}
      </tbody>
      </Table>
      </div>
    );
  }
}

export default BudgetItemTable;
