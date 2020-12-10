import axios from 'axios';
import { baseUrl } from '../constants.json';

const getGiftBudget = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}gift/currentPlanGifts/user${userId}`)
    .then((response) => {
      resolve(response.data);
      console.error('gift info', response.data);
    })
    .catch((err) => reject(err, 'error'));
});

const getGiftItems = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}gift/currentPlanGifts/user${userId}`)
    .then((response) => {
      resolve(response.data.giftInfo);
      console.error('budgetLineItemInfo', response.data.lineItems);
    })
    .catch((err) => reject(err, 'error'));
});

// eslint-disable-next-line import/no-anonymous-default-export
export default { getGiftBudget, getGiftItems };
