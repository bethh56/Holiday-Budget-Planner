import axios from 'axios';
import { baseUrl } from '../constants.json';

const getBudgetItems = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/ItemCategory/user${userId}`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((err) => reject(err, 'error'));
});

const getItemsByBudgetId = (budgetId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/ItemCategory/budgetId${budgetId}`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((err) => reject(err, 'error'));
});

const getBudgetUserLineItems = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/ItemCategory/user${userId}`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((err) => reject(err, 'error'));
});

const getItemsTotalPrice = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/ItemCategory/itemTotalPrice${userId}`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((err) => reject(err, 'error'));
});

const deleteItem = (itemId) => axios.delete(`${baseUrl}/ItemCategory/removeItem/${itemId}`);

const addItemCategory = (newItemInfo) => axios.post(`${baseUrl}/itemCategory/`, newItemInfo);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getBudgetItems,
  getBudgetUserLineItems,
  deleteItem,
  addItemCategory,
  getItemsTotalPrice,
  getItemsByBudgetId,
};
