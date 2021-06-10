import axios from "axios";

const API_URL = "http://localhost:8000/api/";

class UserService {
  updateUser(values, token) {
    return axios.post(API_URL + "users/update", values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new UserService();
