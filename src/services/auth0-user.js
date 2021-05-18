import axios from "axios";

const AUTH0_API_URL = process.env.REACT_APP_AUTH0_DOMAIN;

class Auth0Service {
  async updateUser(values, token, id) {
    try {
      const data = {
        user_metadata: { location: values.location, timezone: values.timezone },
        given_name: values.firstName,
        lastName: values.lastName,
        name: `${values.firstName} ${values.lastName}`,
        nickname: values.handle,
      };
      const res = await axios.patch(
        `${AUTH0_API_URL}/api/v2/users/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }
}

export default new Auth0Service();
