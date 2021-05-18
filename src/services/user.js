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
  getOrgByUser(token) {
    return axios.get(API_URL + "org", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  createProject(
    orgId,
    name,
    description,
    projectImpacts,
    outcomesDesired,
    beneficiarys,
    token
  ) {
    const data = {
      orgId: orgId,
      name: name,
      description: description,
      projectImpacts: projectImpacts,
      outcomesDesired: outcomesDesired,
      beneficiaries: beneficiarys,
    };
    return axios.post(API_URL + "project/create", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getProjectByUser(token) {
    return axios.get(API_URL + "project", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateUser(values, token) {
    return axios.post(API_URL + "users/update", values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new UserService();
