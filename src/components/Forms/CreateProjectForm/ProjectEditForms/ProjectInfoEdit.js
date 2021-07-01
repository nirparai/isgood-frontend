import React, { useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import * as Yup from "yup";

import { Button, Form, Col } from "react-bootstrap";
import { Formik } from "formik";
import ProjectService from "services/projectService";
import FormErrorMessage from "components/Forms/FormErrorMessage";
import UserContext from "context/UserContext";

export default function ProjectInfoEdit({ project }) {
  const [serverMessage, setServerMessage] = useState();
  const { getAccessTokenSilently } = useAuth0();
  const { user, setUser } = useContext(UserContext);

  const validationSchema = Yup.object().shape({
    orgId: Yup.string().required("Required"),
    projectName: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    // geolocation: Yup.string(),
    startDate: Yup.string(),
    endDate: Yup.string(),
  });

  const onSubmit = async (values, methods) => {
    try {
      const token = await getAccessTokenSilently();
      const res = await ProjectService.updateProjectInfo(
        token,
        project.id,
        values
      );
      setUser((state) => {
        const newCurrentProject = state.currentProject;
        newCurrentProject.name = res.data.name;
        newCurrentProject.description = res.data.description;
        newCurrentProject.geolocation = res.data.geolocation;
        newCurrentProject.start_date = res.data.start_date;
        newCurrentProject.end = res.data.end;
        return { ...state, currentProject: newCurrentProject };
      });
      window.location.reload();
    } catch (err) {
      console.log(err.response);
      if (err.response.data.message) {
        const errMessage = err.response.data.message;
        setServerMessage(errMessage);
      } else {
        setServerMessage("There was a problem please try again later");
      }
    }
  };
  console.log(project);
  return (
    <div className="d-flex flex-column align-items-center">
      {serverMessage ? (
        <div
          className="alert alert-danger d-flex justify-content-center w-25"
          role="alert"
        >
          {serverMessage}
        </div>
      ) : null}
      <fieldset className="container-fluid border p-3 rounded w-100">
        <Formik
          initialValues={{
            orgId: project.org_id,
            projectName: project.name,
            description: project.description,
            geolocation: project.geolocation || [],
            startDate: project.start_date
              ? project.start_date.split("T")[0]
              : "",
            endDate: project.end_date ? project.end_date.split("T")[0] : "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {(formik) => {
            // console.log(formik);
            return (
              <Form onSubmit={formik.handleSubmit} className="mx-auto">
                <Form.Group controlId="projectName">
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    autoFocus
                    placeholder="Project Name"
                    name="projectName"
                    type="text"
                    onClick={() => setServerMessage(null)}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.projectName}
                  />
                  <FormErrorMessage name="projectName" formik={formik} />
                </Form.Group>

                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Project Description"
                    name="description"
                    onClick={() => setServerMessage(null)}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                  />
                  <FormErrorMessage name="description" formik={formik} />
                </Form.Group>

                <Form.Row>
                  <Form.Group controlId="geolocation" size="lg">
                    <div>GeolocationFormField</div>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="startDate" size="lg">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      name="startDate"
                      type="date"
                      onClick={() => setServerMessage(null)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.startDate}
                    />
                    <FormErrorMessage name="startDate" formik={formik} />
                  </Form.Group>

                  <Form.Group as={Col} controlId="endDate" size="lg">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      name="endDate"
                      type="date"
                      onClick={() => setServerMessage(null)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.endDate}
                    />
                    <FormErrorMessage name="endDate" formik={formik} />
                  </Form.Group>
                </Form.Row>

                <Button block size="lg" type="submit">
                  Save
                </Button>
              </Form>
            );
          }}
        </Formik>
      </fieldset>
    </div>
  );
}
