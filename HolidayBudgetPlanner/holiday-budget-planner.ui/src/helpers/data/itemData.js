import axios from 'axios';
import { baseUrl } from '../constants.json';

const getBudgetItems = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/ItemCategory/user${userId}`)
    .then((response) => {
      resolve(response.data);
      // console.error(response.data);
    })
    .catch((err) => reject(err, 'error'));
});

const getBudgetUserLineItems = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/ItemCategory/user${userId}`)
    .then((response) => {
      // allItems.forEach((i) => {
      //   console.error(Object.keys(i));
      // });
      resolve(response.data);
      console.error(response.data);
    })
    .catch((err) => reject(err, 'error'));
});

const getCategoryNames = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/ItemCategory/category`)
    .then((response) => {
      resolve(response.data);
      console.error('categoryName:', response.data);
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
  getCategoryNames,
};
