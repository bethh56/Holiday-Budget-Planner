import React from 'react';

import budgetData from '../../../helpers/data/budgetData';
import giftData from '../../../helpers/data/giftData';
import itemData from '../../../helpers/data/itemData';
import authData from '../../../helpers/data/authData';
import userData from '../../../helpers/data/userData';

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
    user: {},
    loggedInUserId: '',
    uid: authData.getUid(),
    itemTotalPrice: '',
  }

  // not currently being used in this file, but see if you can use in each function so less repeated code
  getUserByUid = () => {
    const { uid } = this.state;
    userData.getSingleUserIdByUid(uid)
      .then((getUserId) => {
        const loggedInUserId = getUserId.data;
        this.setState({ loggedInUserId });
      })
      .catch((err) => console.error('unable to get budget line item info'));
  }

  // gets the amount in the budget and is displayed in Budget Details
  getCurrentBudgetAmountInfo = () => {
    const { uid } = this.state;
    userData.getSingleUserIdByUid(uid)
      .then((getUserId) => {
        const loggedInUserId = getUserId.data;
        this.setState({ loggedInUserId });
        budgetData.getCurrentBudget(loggedInUserId)
          .then((budget) => this.setState({ budget }))
          .catch((err) => console.error('unable to get budget info'));
      });
  }

  getPriceOfAllItems = () => {
    const { uid } = this.state;
    userData.getSingleUserIdByUid(uid)
      .then((getUserId) => {
        const loggedInUserId = getUserId.data;
        this.setState({ loggedInUserId });
        itemData.getItemsTotalPrice(loggedInUserId)
          .then((price) => {
            const itemTotalPrice = price[0].totalPrice;
            this.setState({ itemTotalPrice });
          })
          .catch((err) => console.error('unable to get item total price info'));
      });
  }

  getBudgetItems = () => {
    const { uid } = this.state;
    userData.getSingleUserIdByUid(uid)
      .then((getUserId) => {
        const loggedInUserId = getUserId.data;
        this.setState({ loggedInUserId });
        itemData.getBudgetItems(loggedInUserId)
          .then((category) => this.setState({ category }))
          .catch((err) => console.error('unable to get budget item info'));
      });
  }

  getGiftInfo = () => {
    const { uid } = this.state;
    userData.getSingleUserIdByUid(uid)
      .then((getUserId) => {
        const loggedInUserId = getUserId.data;
        this.setState({ loggedInUserId });
        giftData.getGiftBudget(loggedInUserId)
          .then((gift) => this.setState({ gift }))
          .catch((err) => console.error('unable to get gift info'));
      });
  }

  getGiftLineItems = () => {
    const { uid } = this.state;
    userData.getSingleUserIdByUid(uid)
      .then((getUserId) => {
        const loggedInUserId = getUserId.data;
        this.setState({ loggedInUserId });
        giftData.getGiftItems(loggedInUserId)
          .then((giftLineItem) => this.setState({ giftLineItem }))
          .catch((err) => console.error('unable to get budget line item info'));
      });
  }

  // may need to delete this
  getBudgetLineItems = () => {
    const { uid } = this.state;
    userData.getSingleUserIdByUid(uid)
      .then((getUserId) => {
        const loggedInUserId = getUserId.data;
        this.setState({ loggedInUserId });
        itemData.getBudgetUserLineItems(loggedInUserId)
          .then((itemlineItems) => this.setState({ itemlineItems }))
          .catch((err) => console.error('unable to get budget line item info'));
      });
  }

  componentDidMount() {
    this.getCurrentBudgetAmountInfo();
    this.getBudgetItems();
    this.getGiftInfo();
    this.getGiftLineItems();
    this.getBudgetLineItems();
    this.getPriceOfAllItems();
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
      itemTotalPrice,
    } = this.state;

    // eslint-disable-next-line max-len
    const buildCurrentViewedBudget = [budget].map((budgetPlan) => (<BudgetDetails key={budgetPlan.id} budgetPlan={budgetPlan} itemTotalPrice={itemTotalPrice} gift={gift} getCurrentBudgetAmountInfo={this.getCurrentBudgetAmountInfo}/>));
    // eslint-disable-next-line max-len
    const buildItemTable = category.map((item) => (<BudgetItemTable key={item.id} item={item} getBudgetLineItems={this.getBudgetLineItems} itemlineItems={itemlineItems} getBudgetItems={this.getBudgetItems} removeItem={this.removeItem}/>));
    const buildGiftTable = [gift].map((item) => (<GiftTable key={item.id} item={item} giftLineItem={giftLineItem} removeGift={this.removeGift}/>));

    return (
      <div className="home text-center">
        <div className="gifttable">
          {buildCurrentViewedBudget}
          {buildGiftTable}
          { giftFormOpen ? <div/> : <button className="addGiftBtn col-12" onClick={() => this.setState({ giftFormOpen: true })}><i class="fas fa-plus-circle"></i> Add Gift</button>}
          { giftFormOpen ? <GiftForm giftFormOpen={giftFormOpen} budget={budget.id} addGiftEvent={this.addGiftEvent}/> : ''}
        </div>
        <div className="itemTables">
          <h4 className="purchaseItem">Purchased Items</h4>
          { itemFormOpen ? <div/> : <button className="addCategoryBtn col-12" onClick={() => this.setState({ itemFormOpen: true })}><i class="fas fa-plus-circle"></i> Add Category</button>}
          { itemFormOpen ? <ItemCatergoryForm itemFormOpen={itemFormOpen} budget={budget.id} addItemCategoryEvent={this.addItemCategoryEvent}/> : ''}
          {buildItemTable}
        </div>
      </div>
    );
  }
}

export default Home;
