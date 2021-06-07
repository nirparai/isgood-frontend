import axios from "axios";

const API_URL = "http://localhost:8000/api/";

class ProjectService {
  createProject(project, token) {
    const data = {
      orgId: project.orgId,
      name: project.projectName,
      description: project.description,
      projectImpacts: project.impacts,
      outcomesDesired: project.outcomes,
      beneficiaries: project.beneficiaries,
      coordinates: project.geolocation,
      startDate: project.startDate,
      endDate: project.endDate,
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
  updateImpacts(token, orgId, projectId, impacts) {
    const data = {
      orgId: orgId,
      projectImpacts: impacts,
    };
    return axios.patch(API_URL + "impact/update/" + projectId, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  deleteImpacts(token, orgId, projectId, deleteIds) {
    const data = {
      orgId: orgId,
      deleteImpactIds: deleteIds,
    };
    console.log(data);
    return axios.delete(API_URL + "impact/delete/" + projectId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    });
  }

  updateOutcomes(token, orgId, projectId, outcomes) {
    const data = {
      orgId: orgId,
      outcomesDesired: outcomes,
    };
    return axios.patch(API_URL + "outcome/update/" + projectId, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  deleteOutcomes(token, orgId, projectId, deleteIds) {
    const data = {
      orgId: orgId,
      deleteOutcomeIds: deleteIds,
    };

    return axios.delete(API_URL + "outcome/delete/" + projectId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    });
  }
  updateProjectInfo(token, projectId, projectInfo) {
    const data = {
      name: projectInfo.projectName,
      orgId: projectInfo.orgId,
      description: projectInfo.description,
      coordinates: projectInfo.geoLocation,
      startDate: projectInfo.startDate,
      endDate: projectInfo.endDate,
    };
    return axios.patch(API_URL + "project/" + projectId, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
export default new ProjectService();
