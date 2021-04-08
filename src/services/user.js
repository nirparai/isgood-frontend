import axios from 'axios';
import authHeader from './header';

const API_URL = 'http://localhost:8000/api/';

class UserService {
  createOrg(organisationName, website) {
    const data = {
      name: organisationName,
      url: website
    }
    return axios.post(API_URL + "org/create", data, {
      headers: authHeader(),
    });
    
  }
  getOrg() {
    return axios.get(API_URL + 'org');
  }

  getUserContent() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getAdminContent() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();