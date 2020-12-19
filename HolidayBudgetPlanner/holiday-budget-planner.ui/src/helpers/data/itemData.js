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

const getBudgetLineItems = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/ItemCategory/user${userId}`)
    .then((response) => {
      const items = response.data;
      items.forEach((i) => {
        console.error(i.lineItems);
        resolve(i.lineItems);
      });
    })
    .catch((err) => reject(err, 'error'));
});

const deleteItem = (itemId) => axios.delete(`${baseUrl}/ItemCategory/removeItem/${itemId}`);

// eslint-disable-next-line import/no-anonymous-default-export
export default { getBudgetItems, getBudgetLineItems, deleteItem };
