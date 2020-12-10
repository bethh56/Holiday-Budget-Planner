import axios from 'axios';
import { baseUrl } from '../constants.json';

const getAllUsers = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users`)
    .then((response) => {
      resolve(response.data);
      // console.error('users', response.data);
    })
    .catch((err) => reject(err, 'error'));
});

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAllUsers };
