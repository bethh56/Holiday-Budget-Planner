import axios from 'axios';
import { baseUrl } from '../constants.json';

const getHolidays = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/holiday`)
    .then((response) => {
      resolve(response.data);
      // console.error('gift info', response.data);
    })
    .catch((err) => reject(err, 'error'));
});

// eslint-disable-next-line import/no-anonymous-default-export
export default { getHolidays };
