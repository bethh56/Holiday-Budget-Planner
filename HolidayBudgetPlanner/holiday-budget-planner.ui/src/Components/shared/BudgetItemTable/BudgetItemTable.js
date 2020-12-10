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
      .then((lineItems) => this.setState({ lineItems }))
      .catch((err) => console.error('unable to get budget line item info'));
  }

  componentDidMount() {
    this.getBudgetLineItems();
  }

  render() {
    const { item } = this.props;
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
        <tr>
          <td>{lineItems.map((i, indx) => <p key={indx}>{i.itemName}</p>)}</td>
          <td>{lineItems.map((i, indx) => <p key={indx}>${i.price}</p>)}</td>
        </tr>
      </tbody>
      </Table>
      </div>
    );
  }
}

export default BudgetItemTable;
