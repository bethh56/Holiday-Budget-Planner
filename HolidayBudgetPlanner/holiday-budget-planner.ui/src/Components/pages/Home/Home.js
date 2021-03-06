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
    giftFormOpen: false,
    itemFormOpen: false,
    user: {},
    loggedInUserId: '',
    uid: authData.getUid(),
    itemTotalPrice: '',
    holiday: '',
  }

  // gets the amount in the budget and is displayed in Budget Details,
  // also sets holiday which is being passed through each componet for styling purposes
  getCurrentBudgetAmountInfo = () => {
    const { loggedInUserId } = this.state;
    budgetData.getCurrentBudget(loggedInUserId)
      .then((budget) => {
        this.setState({ budget });
        const holiday = budget.holidayName;
        this.setState({ holiday });
      })
      .catch((err) => console.error('unable to get budget info'));
  };

  // getting total price of items to be passed into budget details and deducted from starting budget amount
  getPriceOfAllItems = () => {
    const { loggedInUserId } = this.state;
    itemData.getItemsTotalPrice(loggedInUserId)
      .then((price) => {
        const itemTotalPrice = price[0].totalPrice;
        this.setState({ itemTotalPrice });
      })
      .catch((err) => console.error('unable to get item total price info'));
  };

  getBudgetCatergory = () => {
    const { loggedInUserId } = this.state;
    itemData.getBudgetItems(loggedInUserId)
      .then((category) => this.setState({ category }))
      .catch((err) => console.error('unable to get budget item info'));
  };

  getGiftInfo = () => {
    const { loggedInUserId } = this.state;
    giftData.getGiftBudget(loggedInUserId)
      .then((gift) => this.setState({ gift }))
      .catch((err) => console.error('unable to get gift info'));
  };

  getGiftLineItems = () => {
    const { loggedInUserId } = this.state;
    giftData.getGiftItems(loggedInUserId)
      .then((giftLineItem) => this.setState({ giftLineItem }))
      .catch((err) => console.error('unable to get budget line item info'));
  };

  // may need to delete this
  getBudgetLineItems = () => {
    const { loggedInUserId } = this.state;
    itemData.getBudgetUserLineItems(loggedInUserId)
      .then((itemlineItems) => this.setState({ itemlineItems }))
      .catch((err) => console.error('unable to get budget line item info'));
  };

  renderPage = () => {
    const { uid } = this.state;
    userData.getSingleUserIdByUid(uid)
      .then((getUserId) => {
        const loggedInUserId = getUserId.data;
        this.setState({ loggedInUserId });
        this.getCurrentBudgetAmountInfo();
        this.getPriceOfAllItems();
        this.getGiftInfo();
        this.getGiftLineItems();
        this.getBudgetCatergory();
        this.getBudgetLineItems();
      })
      .catch((err) => console.error('unable to set loggedInUserId'));
  };

  componentDidMount() {
    this.renderPage();
  }

  removeGift = (giftId) => {
    giftData.deleteGift(giftId)
      .then(() => {
        this.renderPage();
      })
      .catch((err) => console.error('unable to delete gift', err));
  }

  removeItem = (itemId) => {
    itemData.deleteItem(itemId)
      .then(() => {
        this.renderPage();
      })
      .catch((err) => console.error('unable to delete gift', err));
  }

  addGiftEvent = (newGift) => {
    giftData.addGift(newGift)
      .then(() => {
        this.renderPage();
        this.setState({ giftFormOpen: false });
      })
      .catch((err) => console.error('unable to add gift', err));
  }

  addItemCategoryEvent = (newCategory) => {
    itemData.addItemCategory(newCategory)
      .then(() => {
        this.renderPage();
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
      holiday,
    } = this.state;

    const buildCurrentViewedBudget = [budget].map((budgetPlan) => (<BudgetDetails key={budgetPlan.id} budgetPlan={budgetPlan} itemTotalPrice={itemTotalPrice} gift={gift} holiday={holiday}/>));
    // eslint-disable-next-line max-len
    const buildItemTable = category.map((item) => (<BudgetItemTable key={item.id} item={item} renderPage={this.renderPage} itemlineItems={itemlineItems} removeItem={this.removeItem} holiday={holiday}/>));
    const buildGiftTable = [gift].map((item) => (<GiftTable key={item.id} item={item} giftLineItem={giftLineItem} holiday={holiday} removeGift={this.removeGift}/>));

    const buildPage = () => (
        <div className='m-auto container'>
          <div className="gifttable">
          {buildCurrentViewedBudget}
          {buildGiftTable}
          { giftFormOpen ? <div/> : <button className="addGiftBtn col-12" onClick={() => this.setState({ giftFormOpen: true })}><i className="fas fa-plus-circle"></i> Add Gift</button>}
          { giftFormOpen ? <GiftForm giftFormOpen={giftFormOpen} budget={budget.id} holiday={holiday} addGiftEvent={this.addGiftEvent}/> : ''}
        </div>
        <div className="itemTables">
          <h4 className="purchaseItem">Purchased Items</h4>
          { itemFormOpen ? <div/> : <button className="addCategoryBtn col-12" onClick={() => this.setState({ itemFormOpen: true })}><i className="fas fa-plus-circle"></i> Add Category</button>}
          { itemFormOpen ? <ItemCatergoryForm itemFormOpen={itemFormOpen} holiday={holiday} budget={budget.id} addItemCategoryEvent={this.addItemCategoryEvent}/> : ''}
          {buildItemTable}
        </div>
      </div>
    );

    // if (holiday === 'Christmas' || holiday === 'Thanksgiving') {
    //   return (
    //     <div className={holiday}>
    //       {buildPage()}
    //     </div>
    //   );
    // }
    return (
      <div className='home'>
        {buildPage()}
      </div>
    );
  }
}

export default Home;
