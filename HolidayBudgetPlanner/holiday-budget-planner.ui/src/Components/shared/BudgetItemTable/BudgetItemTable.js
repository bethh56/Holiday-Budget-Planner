import React from 'react';
import { Table } from 'reactstrap';
import itemData from '../../../helpers/data/itemData';
import './BudgetItemTable.scss';

class BudgetItemTable extends React.Component {
  state = {
    lineItems: [],
  }

  getBudgetLineItems = () => {
    itemData.getBudgetLineItems(2)
      .then((lineItems) => this.setState({ lineItems }))
      .catch((err) => console.error('unable to get budget line item info'));
  }

  componentDidMount() {
    this.getBudgetLineItems();
  }

  render() {
    const { item } = this.props;
    return (
      <div className="BudgetItemTable">
        <h2>{item.categoryName}</h2>
        <h3>${item.totalPrice}</h3>
        <Table>
      <thead>
        <tr>
          <th>Item Name</th>
          <th>price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {/* <td>{line.price}</td> */}
          <td></td>
        </tr>
      </tbody>
      </Table>
      </div>
    );
  }
}

export default BudgetItemTable;
