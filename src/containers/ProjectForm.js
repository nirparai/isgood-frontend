import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import AuthService from "../services/auth";

//geocode
import Autosuggest from "react-autosuggest";
import axios from "axios";

export default function ProjectForm() {
  const [country, setCountry] = React.useState("");
  const [suggestions, setSuggestions] = React.useState([]);
  const [serverMessage, setServerMessage] = useState();
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      country: "",
    },
    //validateForm,
    onSubmit: (values) => {
      AuthService.login(values.email, values.password).then(
        () => {
          history.push("/dashboard");
          window.location.reload();
        },

        (error) => {
          const resMessage = error.response.data["error"];
          setServerMessage(resMessage);
        }
      );
      //alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="Login">
      {serverMessage ? (
        <div
          className="alert alert-danger container-fluid errorMessage"
          role="alert"
        >
          {serverMessage}
        </div>
      ) : null}

      <fieldset className="loginContainer container-fluid border p-3 rounded">
        <legend className="loginLegend border rounded p-1 text-center">
          Project
        </legend>
        <Form onSubmit={formik.handleSubmit}>
          <div className="input-row">
            <label>Project Place</label>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={async ({ value }) => {
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
              }}
              onSuggestionsClearRequested={() => {
                setSuggestions([]);
              }}
              getSuggestionValue={(suggestion) => suggestion.name}
              renderSuggestion={(suggestion) => <div>{suggestion.name}</div>}
              onSuggestionSelected={(event, { suggestion, method }) => {
                if (method === "enter") {
                  event.preventDefault();
                }
                setCountry(suggestion.name);
                alert(
                  `Coordinates: Latitude ${suggestion.latitude},Longitude ${suggestion.longitude}`
                );
              }}
              inputProps={{
                placeholder: "Search for project place",
                autoComplete: "off",
                value: country,
                name: "country",
                onChange: (_event, { newValue }) => {
                  setCountry(newValue);
                },
              }}
            />
          </div>
        </Form>
      </fieldset>
    </div>
  );
}
