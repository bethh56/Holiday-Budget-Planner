import React from 'react';
import { Table } from 'reactstrap';
import giftData from '../../../helpers/data/giftData';
import './GiftTable.scss';

class GiftTable extends React.Component {
  state = {
    gifts: [],
  }

  getGifts = () => {
    giftData.getGiftItems(1)
      .then((gifts) => this.setState({ gifts }))
      .catch((err) => console.error('unable to get budget line item info'));
  }

  componentDidMount() {
    this.getGifts();
  }

  render() {
    const { item } = this.props;
    const { gifts } = this.state;

    return (
      <div className="BudgetItemTable">
        <h4>Purchased Gifts</h4>
        <h5>Amount Spent: ${item.totalPrice}</h5>
        <Table>
      <thead>
        <tr>
          <th>Gift Recepient</th>
          <th>Item</th>
          <th>Cost</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{gifts.map((i, indx) => <p key={indx}>{i.recepient}</p>)}</td>
          <td>{gifts.map((i, indx) => <p key={indx}>{i.item}</p>)}</td>
          <td>{gifts.map((i, indx) => <p key={indx}>${i.price}</p>)}</td>
        </tr>
      </tbody>
      </Table>
      </div>
    );
  }
}

export default GiftTable;
