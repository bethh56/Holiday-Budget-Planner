import axios from 'axios';
import { baseUrl } from '../constants.json';

const getCurrentBudget = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/budget/currentPlan/user${userId}`)
    .then((response) => {
      resolve(response.data);
    })
    .catch((err) => reject(err, 'error'));
});

// eslint-disable-next-line import/no-anonymous-default-export
export default { getCurrentBudget };
