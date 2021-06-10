import axios from "axios";

const API_URL = "http://localhost:8000/api/";

class OrgService {
  createOrg(values, token) {
    // let data = new FormData()
    // data.append("organisationLogo", values.organisationLogo);
    // data.append("name", values.organisationName);
    // data.append("url", values.url);
    // data.append("description", values.description);
    // data.append("handle", values.handle);
    // data.append("sector", values.sector);
    // data.append("region", values.region);
    const data = {
      logoId: values.organisationLogo,
      bannerId: values.organisationBanner,
      name: values.organisationName,
      url: values.url,
      description: values.description,
      handle: values.handle,
      sector: values.sector,
      region: values.region,
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
