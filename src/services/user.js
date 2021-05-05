import axios from "axios";
import authHeader from "./header";

const API_URL = "http://localhost:8000/api/";

class UserService {
  createOrg(organisationName, website, token) {
    const data = {
      name: organisationName,
      url: website,
    };
    return axios.post(API_URL + "org/create", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  getOrg() {
    return axios.get(API_URL + "org");
  }

  createProject(
    orgId,
    name,
    description,
    projectImpacts,
    outcomesDesired,
    token
  ) {
    const data = {
      orgId: orgId,
      name: name,
      description: description,
      projectImpacts: projectImpacts,
      outcomesDesired: outcomesDesired,
    };
    return axios.post(API_URL + "project/create", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getUserContent() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  getAdminContent() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }
}

export default new UserService();
