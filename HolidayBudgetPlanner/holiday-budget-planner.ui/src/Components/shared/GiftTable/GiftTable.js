import React from 'react';
import { Table } from 'reactstrap';
// import itemData from '../../../helpers/data/itemData';
import './GiftTable.scss';

class GiftTable extends React.Component {
  // state = {
  //   lineItems: [],
  // }

  // getBudgetLineItems = () => {
  //   itemData.getBudgetLineItems(2)
  //     .then((lineItems) => this.setState({ lineItems }))
  //     .catch((err) => console.error('unable to get budget line item info'));
  // }

  // componentDidMount() {
  //   this.getBudgetLineItems();
  // }

  render() {
    const { item } = this.props;

    return (
      <div className="BudgetItemTable">
        <h2>Purchased Gifts</h2>
        <h2>$ {item.totalPrice}</h2>
        <Table>
      <thead>
        <tr>
          <th>Item Name</th>
          <th>price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {/* <td>{lineItems.map((i, indx) => <p key={i}>{i.itemName}</p>)}</td>
          <td>{lineItems.map((i, indx) => <p key={i}>${i.price}</p>)}</td> */}
        </tr>
      </tbody>
      </Table>
      </div>
    );
  }
}

export default GiftTable;
