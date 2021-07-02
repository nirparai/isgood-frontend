import React, { useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import * as Yup from "yup";

import { Button, Form, Row, Col } from "react-bootstrap";
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
      <fieldset className="container-fluid p-3 rounded w-100">
        <Formik
          initialValues={{
            orgId: project.org_id,
            projectName: project.name,
            projectLogo: project.logo?project.logo.location:"",
            projectBanner: project.banner?project.banner.location:"",
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
                <Form.Row className="align-items-center">
                  <Form.Group as={Col} controlId="projectLogo" className="col-lg-5 col-sm-12">
                    <Form.Label>Project Logo</Form.Label>
                    <Row className="align-items-center">
                      <Col className="col-lg-6">
                        {/* TODO: LOGO COMPONENT HERE*/}
                        <div className="bg-dark" style={{height: 120, width: 120}}>
                        </div>
                      </Col>
                      <Col className="col-lg-6">
                        <Button variant="outline-info">Upload</Button>
                        <Button variant="link">Remove</Button>
                      </Col>
                    </Row>
                    <FormErrorMessage name="projectLogo" formik={formik} />
                  </Form.Group>

                  <Form.Group as={Col} controlId="projectName" className="col-lg-7 col-sm-12">
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
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="projectBanner" className="col-lg-12 col-sm-12">
                  <Form.Label>Project Banner</Form.Label>
                  <Row>
                    <Col className="col-lg-10">
                      {/* TODO: PROJECT BANNER COMPONENT HERE */}
                      <div className="bg-dark" style={{height: 120}}>

                      </div>
                    </Col>
                    <Col className="col-lg-2">
                      <Button variant="outline-info">Upload</Button>
                      <Button variant="link">Remove</Button>
                    </Col>
                  </Row>
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="description" className="col-lg-12 col-sm-12">
                    <Form.Label>Project Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Project Description"
                      name="description"
                      rows="4"
                      onClick={() => setServerMessage(null)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.description}
                    />
                    <FormErrorMessage name="description" formik={formik} />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="geolocation" size="lg">
                  <Form.Label>Geolocation</Form.Label>
                    <div>GeolocationFormField</div>
                  </Form.Group>

                  <Form.Group as={Col} controlId="startDate" size="lg">
                    <Form.Label>Project Timeframe</Form.Label>
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

                  <Form.Group as={Col} controlId="endDate" size="lg" className="align-self-end">
                    {/* <Form.Label className="d-none"></Form.Label> */}
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

                <Form.Row>
                  <Form.Group as={Col} className="col-lg-6">
                    <Button type="submit" className="float-right">
                      Save
                    </Button>
                  </Form.Group>
                  <Form.Group as={Col} className="col-lg-6">
                    <Button variant="outline-primary"  type="button">
                      Next
                    </Button>
                  </Form.Group>
                </Form.Row>
              </Form>
            );
          }}
        </Formik>
      </fieldset>
    </div>
  );
}
