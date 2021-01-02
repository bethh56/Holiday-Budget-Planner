import React from 'react';

import budgetData from '../../../helpers/data/budgetData';
import giftData from '../../../helpers/data/giftData';
import itemData from '../../../helpers/data/itemData';

import BudgetDetails from '../../shared/BudgetDetails/BudgetDetails';
import BudgetItemTable from '../../shared/BudgetItemTable/BudgetItemTable';
import GiftTable from '../../shared/GiftTable/GiftTable';
import GiftForm from '../../shared/GiftForm/GiftForm';
import ItemCatergoryForm from '../../shared/ItemCategoryForm/ItemCatergoryForm';
import './Home.scss';

class Home extends React.Component {
  state = {
    budget: [],
    category: [],
    gift: [],
    giftLineItem: [],
    itemlineItems: [],
    holiday: [],
    giftFormOpen: false,
    itemFormOpen: false,
  }

  // gets the amount in the budget and is displayed in Budget Details
  getCurrentBudgetAmountInfo = () => {
    budgetData.getCurrentBudget(1)
      .then((budget) => this.setState({ budget }))
      .catch((err) => console.error('unable to get budget info'));
  }

  getBudgetItems = () => {
    itemData.getBudgetItems(1)
      .then((category) => this.setState({ category }))
      .catch((err) => console.error('unable to get budget item info'));
  }

  getGiftInfo = () => {
    giftData.getGiftBudget(1)
      .then((gift) => this.setState({ gift }))
      .catch((err) => console.error('unable to get gift info'));
  }

  getGiftLineItems = () => {
    giftData.getGiftItems(1)
      .then((giftLineItem) => this.setState({ giftLineItem }))
      .catch((err) => console.error('unable to get budget line item info'));
  }

  getBudgetLineItems = () => {
    itemData.getBudgetUserLineItems(1)
      .then((itemlineItems) => {
        this.setState({ itemlineItems });
        console.error('get line items', itemlineItems);
      })
      .catch((err) => console.error('unable to get budget line item info'));
  }

  componentDidMount() {
    this.getCurrentBudgetAmountInfo();
    this.getBudgetItems();
    this.getGiftInfo();
    this.getGiftLineItems();
    this.getBudgetLineItems();
  }

  removeGift = (giftId) => {
    giftData.deleteGift(giftId)
      .then(() => {
        this.getGiftInfo();
        this.getGiftLineItems();
      })
      .catch((err) => console.error('unable to delete gift', err));
  }

  removeItem = (itemId) => {
    itemData.deleteItem(itemId)
      .then(() => {
        this.getBudgetItems();
        this.getBudgetLineItems();
      })
      .catch((err) => console.error('unable to delete gift', err));
  }

  addGiftEvent = (newGift) => {
    giftData.addGift(newGift)
      .then(() => {
        this.getGiftInfo();
        this.getGiftLineItems();
        this.setState({ giftFormOpen: false });
      })
      .catch((err) => console.error('unable to add gift', err));
  }

  addItemCategoryEvent = (newCategory) => {
    itemData.addItemCategory(newCategory)
      .then(() => {
        this.getBudgetItems();
        this.setState({ itemFormOpen: false });
      })
      .catch((err) => console.error('unable to add item category', err));
  }

  render() {
    const {
      budget,
      category,
      gift,
      giftFormOpen,
      itemFormOpen,
      giftLineItem,
      itemlineItems,
    } = this.state;

    const buildCurrentViewedBudget = [budget].map((budgetPlan) => (<BudgetDetails key={budgetPlan.id} budgetPlan={budgetPlan}/>));
    // eslint-disable-next-line max-len
    const buildItemTable = category.map((item) => (<BudgetItemTable key={item.id} item={item} getBudgetLineItems={this.getBudgetLineItems} itemlineItems={itemlineItems} getBudgetItems={this.getBudgetItems} removeItem={this.removeItem}/>));
    const buildGiftTable = [gift].map((item) => (<GiftTable key={item.id} item={item} giftLineItem={giftLineItem} removeGift={this.removeGift}/>));

    return (
      <div className="home align-center">
        {buildCurrentViewedBudget}
        {buildGiftTable}
        <button className="btn btn-primary" onClick={() => this.setState({ giftFormOpen: true })}>Add Gift</button>
        { giftFormOpen ? <GiftForm giftFormOpen={giftFormOpen} budget={budget.id} addGiftEvent={this.addGiftEvent}/> : ''}
        <button className="btn btn-primary" onClick={() => this.setState({ itemFormOpen: true })}>Add Category</button>
        { itemFormOpen ? <ItemCatergoryForm itemFormOpen={itemFormOpen} budget={budget.id} addItemCategoryEvent={this.addItemCategoryEvent}/> : ''}
        <h4>Purchased Items</h4>
        {buildItemTable}
      </div>
    );
  }
}

export default Home;
