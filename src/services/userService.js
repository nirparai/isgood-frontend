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

  getUserData(token) {
    return axios.get(API_URL + "users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateUserImage(image, token) {
    let formData = new FormData();

    //Adding files to the formdata
    formData.append("profileImage", image);

    return axios.post(API_URL + "users/image", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  updateLastOrg(orgId, token) {
    const data = {
      orgId: orgId,
    };

    return axios.post(API_URL + "users/lastorg", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new UserService();
