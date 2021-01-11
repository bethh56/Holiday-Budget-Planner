import axios from 'axios';
import { baseUrl } from '../constants.json';

const getCurrentBudget = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/budget/currentPlan/user${userId}`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((err) => reject(err, 'error'));
});

const getAllBudgets = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/budget/user${userId}`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((err) => reject(err, 'error'));
});

const getSingleBudgetByBudgetId = (budgetId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/budget/budgetId${budgetId}`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((err) => reject(err, 'error'));
});


const addNewBudget = (newBudget) => axios.post(`${baseUrl}/budget/`, newBudget);

const deleteBudget = (budgetId) => axios.delete(`${baseUrl}/budget/removeBudget/${budgetId}`);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getCurrentBudget,
  addNewBudget,
  getAllBudgets,
  deleteBudget,
  getSingleBudgetByBudgetId,
};
