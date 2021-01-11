import React from 'react';
import { Table } from 'reactstrap';
import itemData from '../../../helpers/data/itemData';

class ExpandedBudget extends React.Component {
  state = {
    item: [],
  }

  displayItemsFromPreviousBudget = () => {
    const { budgetId } = this.props;
    itemData.getItemsByBudgetId(budgetId)
      .then((item) => this.setState({ item }))
      .catch((err) => console.error('unable to get budget line item info'));
  }

  componentDidMount() {
    this.displayItemsFromPreviousBudget();
  }

  render() {
    const { item } = this.state;

    return (
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
  }
}

export default ExpandedBudget;
