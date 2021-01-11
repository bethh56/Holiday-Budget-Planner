import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import './GiftTable.scss';

class GiftTable extends React.Component {
  static propTypes = {
    removeGift: PropTypes.func.isRequired,
  }

  render() {
    const {
      item, removeGift, giftLineItem, holiday,
    } = this.props;

    const buildBudgetGiftTable = () => (
      <div>
        <h5 className="purchasedGiftText">Purchased Gifts Total: <span className="dollarAmount">${item.totalPrice}</span></h5>
        <Table>
      <thead>
        <tr>
          <th>Gift Recepient</th>
          <th>Item</th>
          <th>Cost</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
          {giftLineItem?.map((i, indx) => (
          <tr>
          <td><p key={indx}>{i.recepient}</p></td>
          <td><p key={indx}>{i.item}</p></td>
          <td><p key={indx}>${i.price}</p></td>
          <td> <button key={indx} className="deleteGiftBtn" onClick={() => removeGift(i.id)}><i className="fas fa-trash-alt"></i></button> </td>
          </tr>
          ))}
        </tbody>
        </Table>
      </div>
    );

    if (holiday === 'Christmas' || holiday === 'Thanksgiving') {
      return (
        <div className={`budgetGiftTable${holiday}`}>
          {buildBudgetGiftTable()}
      </div>
      );
    }
    return (
      <div className="budgetGiftTable">
         {buildBudgetGiftTable()}
      </div>
    );
  }
}

export default GiftTable;
