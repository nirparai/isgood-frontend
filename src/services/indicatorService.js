import axios from "axios";

const API_URL = "http://localhost:8000/api/";

class IndicatorService {
  getIndicators(projectId, orgId, token) {
    const data = {
      orgId: orgId,
    };
    return axios.post(API_URL + "indicator/details/" + projectId, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateIndicators(projectId, orgId, token) {
    const data = {
      orgId: orgId,
    };
    return axios.post(API_URL + "indicator/" + projectId, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
export default new IndicatorService();
