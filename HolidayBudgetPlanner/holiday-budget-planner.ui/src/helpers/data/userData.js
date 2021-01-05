import axios from 'axios';
import { baseUrl } from '../constants.json';

const getAllUsers = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users`)
    .then((response) => {
      const fbUsers = response.data;
      const users = [];
      if (fbUsers) {
        Object.keys(fbUsers).forEach((fbId) => {
          fbUsers[fbId].id = fbId;
          users.push(fbUsers[fbId]);
        });
      }
      resolve(users);
    })
    .catch((error) => reject(error));
});

const getSingleUser = (userId) => axios.get(`${baseUrl}/users/${userId}`);

const getSingleUserIdByUid = (uid) => axios.get(`${baseUrl}/users/uid/${uid}`);

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAllUsers, getSingleUser, getSingleUserIdByUid };
