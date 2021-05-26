import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";

import HomePageNavbar from "components/HomePageNavbar";
//geocode
import Autosuggest from "react-autosuggest";
import axios from "axios";

//Validation code
const validate = (values) => {
  //alert(values.startDate);
  const errors = {};
  if (!values.geoLocation) {
    errors.geoLocation = "Required";
  }
  if (!values.startDate) {
    errors.startDate = "Required";
  }
  if (!values.endDate) {
    errors.endDate = "Required";
  }

  if (Date.parse(values.startDate) >= Date.parse(values.endDate)) {
    errors.endDate = "End date should be greater than Start date";
  }

  console.log(errors);
  return errors;
};

export default function Test() {
  const [serverMessage, setServerMessage] = useState();
  const history = useHistory();
  const [suggestions, setSuggestions] = React.useState([]);
  const [geoLocation, setGeoLocation] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  const formik = useFormik({
    initialValues: {
      geoLocation: "",
      startDate: "",
      endDate: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));

      // move to next project form page

      history.push("/personalise");
      window.location.reload();
    },
  });
  const getSuggestions = async ({ value }) => {
    if (!value) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `http://api.positionstack.com/v1/forward?access_key=40497162ace8305f18afcd45cf71aefa&query=${value}`
      );

      setSuggestions(
        response.data.data.map((row) => ({
          name: row.label,
          latitude: row.latitude,
          longitude: row.longitude,
        }))
      );
    } catch (e) {
      setSuggestions([]);
    }
  };

  return (
    <div className="container">
      <HomePageNavbar />
      <div className="d-flex flex-column align-items-center">
        {serverMessage ? (
          <div
            className="alert alert-danger d-flex justify-content-center w-25"
            role="alert"
          >
            {serverMessage}
          </div>
        ) : null}
        <fieldset className="container-fluid border p-3 rounded w-50">
          <legend className="w-50 bg-light border rounded p-1 text-center">
            Create Project: 3
          </legend>
          <Form onSubmit={formik.handleSubmit} className="mx-auto">
            <Form.Group controlId="geoLocation">
              <Form.Label>Geolocation</Form.Label>
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={getSuggestions}
                onSuggestionsClearRequested={() => {
                  setSuggestions([]);
                }}
                getSuggestionValue={(suggestion) => suggestion.name}
                renderSuggestion={(suggestion) => <div>{suggestion.name}</div>}
                onSuggestionSelected={(event, { suggestion, method }) => {
                  if (method === "enter") {
                    event.preventDefault();
                  }
                  setGeoLocation(suggestion.name);
                  formik.setFieldValue("geoLocation", suggestion.name);
                  alert(
                    `Coordinates: Latitude ${suggestion.latitude},Longitude ${suggestion.longitude}`
                  );
                }}
                inputProps={{
                  placeholder: "Search for project place",
                  type: "text",

                  value: geoLocation,
                  name: "geoLocation",
                  onChange: (_event, { newValue }) => {
                    setGeoLocation(newValue);
                  },
                  className:
                    formik.touched.geoLocation && formik.errors.geoLocation
                      ? "text-danger"
                      : null,
                }}
              />
            </Form.Group>

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
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Button block size="lg" type="submit">
                Create Project
              </Button>
            </Form.Row>
          </Form>
        </fieldset>
      </div>
    </div>
  );
}
