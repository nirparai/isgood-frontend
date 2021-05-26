import axios from "axios";

const API_URL = "http://localhost:8000/api/";

class OrgService {
  createOrg(organisationName, url, description, handle, sector, region, token) {
    const data = {
      name: organisationName,
      url: url,
      description: description,
      handle: handle,
      sector: sector,
      region: region
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
}

export default new OrgService();