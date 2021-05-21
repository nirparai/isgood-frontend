// import React, { useState } from "react";
// import Autosuggest from "react-autosuggest";
// import axios from "axios";

// import { Col, Button, Form } from "react-bootstrap";
// import UserService from "services/userService";

// //geocode

// export default function GeolocationFormField({ formik }) {
//   const [suggestions, setSuggestions] = React.useState([]);
//   const [geoLocation, setGeoLocation] = React.useState("");

//   const getSuggestions = async ({ value }) => {
//     if (!value) {
//       setSuggestions([]);
//       return;
//     }

//     try {
//       const response = await axios.get(
//         `http://api.positionstack.com/v1/forward?access_key=40497162ace8305f18afcd45cf71aefa&query=${value}`
//       );

//       setSuggestions(
//         response.data.data.map((row) => ({
//           name: row.label,
//           latitude: row.latitude,
//           longitude: row.longitude,
//         }))
//       );
//     } catch (e) {
//       setSuggestions([]);
//     }
//   };

//   return (
//     <Autosuggest
//       suggestions={suggestions}
//       onSuggestionsFetchRequested={getSuggestions()}
//       onSuggestionsClearRequested={() => {
//         setSuggestions([]);
//       }}
//       getSuggestionValue={(suggestion) => suggestion.name}
//       renderSuggestion={(suggestion) => <div>{suggestion.name}</div>}
//       onSuggestionSelected={(event, { suggestion, method }) => {
//         if (method === "enter") {
//           event.preventDefault();
//         }
//         setGeoLocation(suggestion.name);
//         formik.setFieldValue("geolocation", suggestion.name);
//       }}
//       inputProps={{
//         placeholder: "Search for project place",
//         autoComplete: "off",
//         type: "text",
//         value: formik.geolocation,
//         name: "geolocation",
//         onChange: (_event, { newValue }) => {
//           setGeoLocation(newValue);
//         },
//         className:
//           formik.touched.geoLocation && formik.errors.geoLocation
//             ? "text-danger"
//             : null,
//       }}
//     />
//   );
// }
