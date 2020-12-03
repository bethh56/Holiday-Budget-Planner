import axios from 'axios';
import {baseUrl} from './constants.json';

const getCurrentBudget = (userId) => axios.get(`${baseUrl}/budget/currentPlan/user${userId}`)

export default { getCurrentBudget };
