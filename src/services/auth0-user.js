import axios from "axios";

const AUTH0_API_URL = process.env.REACT_APP_AUTH0_DOMAIN;

class Auth0Service {
  async updateUserMetaData(id, data, token) {
    const metaData = { user_metadata: data };
    const res = await axios.patch(`${AUTH0_API_URL}/api/v2/users/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
  }
}

export default new AuthService();
