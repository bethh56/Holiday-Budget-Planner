import React from 'react';

import budgetData from '../../../helpers/data/budgetData';
import giftData from '../../../helpers/data/giftData';
import itemData from '../../../helpers/data/itemData';

import BudgetDetails from '../../shared/BudgetDetails/BudgetDetails';
import BudgetItemTable from '../../shared/BudgetItemTable/BudgetItemTable';
import GiftTable from '../../shared/GiftTable/GiftTable';
import GiftForm from '../../shared/GiftForm/GiftForm';
import './Home.scss';

class Home extends React.Component {
  state = {
    budget: [],
    category: [],
    gift: [],
    giftLineItem: [],
    holiday: [],
    formOpen: false,
  }

  // gets the amount in the budget and is displayed in Budget Details
  getCurrentBudgetAmountInfo = () => {
    budgetData.getCurrentBudget(2)
      .then((budget) => this.setState({ budget }))
      .catch((err) => console.error('unable to get budget info'));
  }

  getBudgetItems = () => {
    itemData.getBudgetItems(2)
      .then((category) => this.setState({ category }))
      .catch((err) => console.error('unable to get budget item info'));
  }

  getGiftInfo = () => {
    giftData.getGiftBudget(2)
      .then((gift) => this.setState({ gift }))
      .catch((err) => console.error('unable to get gift info'));
  }

  getGiftLineItems = () => {
    giftData.getGiftItems(2)
      .then((giftLineItem) => this.setState({ giftLineItem }))
      .catch((err) => console.error('unable to get budget line item info'));
  }

  componentDidMount() {
    this.getCurrentBudgetAmountInfo();
    this.getBudgetItems();
    this.getGiftInfo();
    this.getGiftLineItems();
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
      .then(() => this.getBudgetItems())
      .catch((err) => console.error('unable to delete gift', err));
  }

  addGiftEvent = (newGift) => {
    giftData.addGift(newGift)
      .then(() => {
        this.getGiftInfo();
        this.getGiftLineItems();
        this.setState({ formOpen: false });
      })
      .catch((err) => console.error('unable to add gift', err));
  }

  render() {
    const {
      budget,
      category,
      gift,
      formOpen,
      giftLineItem,
    } = this.state;

    const buildCurrentViewedBudget = [budget].map((budgetPlan) => (<BudgetDetails key={budgetPlan.id} budgetPlan={budgetPlan}/>));
    const buildItemTable = category.map((item) => (<BudgetItemTable key={item.id} item={item} removeItem={this.removeItem}/>));
    const buildGiftTable = [gift].map((item) => (<GiftTable key={item.id} item={item} giftLineItem={giftLineItem} removeGift={this.removeGift}/>));

    return (
      <div className="home">
        {buildCurrentViewedBudget}
        {buildGiftTable}
        <button className="btn btn-primary" onClick={() => this.setState({ formOpen: true })}>Add Gift</button>
        { formOpen ? <GiftForm formOpen={formOpen} budget={budget.id} addGiftEvent={this.addGiftEvent}/> : ''}
        {buildItemTable}
      </div>
    );
  }
}

export default Home;
