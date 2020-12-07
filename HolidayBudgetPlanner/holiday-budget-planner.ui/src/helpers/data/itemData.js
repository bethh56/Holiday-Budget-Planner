import axios from 'axios';
import { baseUrl } from './constants.json';

const getBudgetItems = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/ItemCategory/user${userId}`)
    .then((response) => {
      resolve(response.data);
      console.error('budgetInfo', response.data);
    })
    .catch((err) => reject(err, 'error'));
});

const getBudgetLineItems = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/ItemCategory/user${userId}`)
    .then((response) => {
      resolve(response.data.lineItems);
      console.error('budgetLineItemInfo', response.data.lineItems);
    })
    .catch((err) => reject(err, 'error'));
});

// eslint-disable-next-line import/no-anonymous-default-export
export default { getBudgetItems, getBudgetLineItems };
