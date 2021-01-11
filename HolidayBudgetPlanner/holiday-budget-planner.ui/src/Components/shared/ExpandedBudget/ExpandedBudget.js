import React from 'react';
import { Table } from 'reactstrap';
import giftData from '../../../helpers/data/giftData';
import itemData from '../../../helpers/data/itemData';

class ExpandedBudget extends React.Component {
  state = {
    item: [],
    gift: [],
    giftLineItems: [],
  }

  displayItemsFromPreviousBudget = () => {
    const { budgetId } = this.props;
    itemData.getItemsByBudgetId(budgetId)
      .then((item) => this.setState({ item }))
      .catch((err) => console.error('unable to get budget line item info'));
  }

  displayGiftsFromPreviousBudget = () => {
    const { budgetId } = this.props;
    giftData.getGiftItemsByBudgetId(budgetId)
      .then((gift) => {
        this.setState({ gift });
      })
      .catch((err) => console.error('unable to get budget line item info'));
  }

  displayGiftItemsFromPreviousBudget = () => {
    const { budgetId } = this.props;
    giftData.getGiftLineItemsByBudgetId(budgetId)
      .then((giftLineItems) => this.setState({ giftLineItems }))
      .catch((err) => console.error('unable to get budget line item info'));
  }

  componentDidMount() {
    this.displayItemsFromPreviousBudget();
    this.displayGiftsFromPreviousBudget();
    this.displayGiftItemsFromPreviousBudget();
  }

  render() {
    const { item, gift, giftLineItems } = this.state;

    console.error(giftLineItems);

    const buildPreviousBudgetGiftTable = () => (
      <div>
        <div>
          { !gift.totalPrice
            ? <div/>
            : <div>
                <h5 className="purchasedGiftText">Purchased Gifts Total: <span className="dollarAmount">${gift.totalPrice}</span></h5>
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
                {giftLineItems?.map((i, indx) => (
                <tr>
                <td><p key={indx}>{i.recepient}</p></td>
                <td><p key={indx}>{i.item}</p></td>
                <td><p key={indx}>${i.price}</p></td>
                </tr>
                ))}
                </tbody>
                </Table>
                      </div>
          }
          </div>
      </div>
    );

    const buildPreviousBudgetItemTable = () => (
      <div>
         {item.map((i) => (
             <div>
             {i.totalPrice === 0
               ? <div/>
               : <div>
                 <h5 className="itemCategoryName">{i.categoryName}</h5>
                 <h6> Total Spent: <span className="itemTotalSpent">${i.totalPrice} </span></h6>
                 <Table>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Cost</th>
                    <th></th>
                  </tr>
                </thead>
           <tbody>
           {item.map((items, indx) => (
             items.lineItems.map((j) => (
               (j.categoryName === i.categoryName && j.itemName != null && j.price != null)
                 ? <tr>
                  <td>{j.itemName}</td>
                  <td>${j.price}</td>
                  </tr>
                 : <></>
             ))
           ))}
           </tbody>
           </Table>
           </div>
          }
           </div>
         ))
      }
      </div>
    );

    return (
      <div>
        <div>
          {buildPreviousBudgetGiftTable()}
        </div>
        <div>
          {buildPreviousBudgetItemTable()}
        </div>
      </div>
    );
  }
}

export default ExpandedBudget;
