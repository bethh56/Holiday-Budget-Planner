import axios from 'axios';
import { baseUrl } from '../constants.json';

const getGiftBudget = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/gift/currentPlanGifts/user${userId}`)
    .then((response) => {
      resolve(response.data);
      // console.error('gift info', response.data);
    })
    .catch((err) => reject(err, 'error'));
});

const getGiftItems = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/gift/currentPlanGifts/user${userId}`)
    .then((response) => {
      resolve(response.data.giftInfo);
      // console.error('gift data', response.data.lineItems);
    })
    .catch((err) => reject(err, 'error'));
});

const deleteGift = (giftId) => axios.delete(`${baseUrl}/gift/removeGift/${giftId}`);

const addGift = (newGift) => axios.post(`${baseUrl}/budget/`, newGift);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getGiftBudget,
  getGiftItems,
  deleteGift,
  addGift,
};
