import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import giftData from '../../../helpers/data/giftData';
import './GiftTable.scss';

class GiftTable extends React.Component {
  static propTypes = {
    removeGift: PropTypes.func.isRequired,
  }

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
    const { item, removeGift } = this.props;
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
          {gifts?.map((i, indx) => (
          <tr>
          <td><p key={indx}>{i.recepient}</p></td>
          <td><p key={indx}>{i.item}</p></td>
          <td><p key={indx}>${i.price}</p></td>
          <td> <button key={indx} className="btn btn-danger" onClick={() => removeGift(i.id)}><i className="fas fa-trash-alt"></i></button> </td>
          </tr>
          ))}
      </tbody>
      </Table>
      </div>
    );
  }
}

export default GiftTable;
