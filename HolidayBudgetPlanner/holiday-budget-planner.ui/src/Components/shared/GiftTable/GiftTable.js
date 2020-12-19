import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import './GiftTable.scss';

class GiftTable extends React.Component {
  static propTypes = {
    removeGift: PropTypes.func.isRequired,
  }

  render() {
    const { item, removeGift, giftLineItem } = this.props;
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
          {giftLineItem?.map((i, indx) => (
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
