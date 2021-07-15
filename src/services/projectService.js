import axios from "axios";

const API_URL = "http://localhost:8000/api/";

class ProjectService {
  createProject(project, token) {
    const data = {
      bannerId: project.projectBanner,
      logoId: project.projectLogo,
      orgId: project.orgId,
      name: project.projectName,
      description: project.description,
      projectImpacts: project.impacts,
      outcomesDesired: project.outcomes,
      beneficiaries: project.beneficiaries,
      coordinates: project.geolocation.coordinates,
      location: project.geolocation.location,
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

  getProjectById(token, projectId, orgId) {
    return axios.get(API_URL + "project/" + projectId + "", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { orgId: orgId },
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
      coordinates: projectInfo.geolocation.coordinates,
      location: projectInfo.geolocation.location,
      startDate: projectInfo.startDate,
      endDate: projectInfo.endDate,
    };
    return axios.patch(API_URL + "project/" + projectId, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateBeneficiaryGroup(token, projectId, orgId, beneficiaryGroup) {
    const data = {
      beneficiary: {
        name: beneficiaryGroup.name,
        lifeChange: beneficiaryGroup.lifeChange,
        demographics: beneficiaryGroup.demographics,
        id: beneficiaryGroup.id,
      },
      orgId: orgId,
    };
    return axios.patch(API_URL + "beneficiary/update/" + projectId, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  addBeneficiaryGroups(token, projectId, orgId, beneficiaries) {
    const data = {
      beneficiaries: beneficiaries,
      orgId: orgId,
    };
    return axios.patch(API_URL + "beneficiary/add/" + projectId, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { orgId: orgId },
    });
  }

  deleteBeneficiarys(token, orgId, projectId, deleteIds) {
    const data = {
      orgId: orgId,
      deleteBeneficiaryIds: deleteIds,
    };

    return axios.delete(API_URL + "beneficiary/delete/" + projectId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    });
  }

  deleteBeneficiaryFields(
    token,
    orgId,
    projectId,
    deleteLifeChangeIds,
    deleteDemographicIds
  ) {
    const data = {
      orgId: orgId,
      deleteLifeChangeIds: deleteLifeChangeIds,
      deleteDemographicIds: deleteDemographicIds,
    };

    return axios.delete(API_URL + "beneficiary/deletefields/" + projectId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    });
  }
}
export default new ProjectService();
