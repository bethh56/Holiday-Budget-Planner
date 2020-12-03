import axios from 'axios';
import { baseUrl } from './constants.json';

const getCurrentBudget = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/budget/currentPlan/user1`)
    .then((response) => {
      resolve(response.data);
      console.error('budgetInfo', response.data);
    })
    .catch((err) => reject(err));
});

// eslint-disable-next-line import/no-anonymous-default-export
export default { getCurrentBudget };
