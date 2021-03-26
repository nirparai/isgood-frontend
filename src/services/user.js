import axios from 'axios';
import authHeader from './header';

const API_URL = 'http://localhost:8000/api/';

class UserService {
  getGlobal() {
    return axios.get(API_URL + 'all');
  }

  getUserContent() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getAdminContent() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();