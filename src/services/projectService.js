import axios from "axios";

const API_URL = "http://localhost:8000/api/";

class ProjectService {
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

  getProjectById(token, projectId) {
    return axios.get(API_URL + "project/" + projectId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
export default new ProjectService();