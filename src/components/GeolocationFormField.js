import React from "react";
import { OpenStreetMapProvider } from "leaflet-geosearch";

import AsyncSelect from "react-select/async";

export default function GeolocationFormField({
  name,
  className,
  placeholder,
  formik,
}) {
  const provider = new OpenStreetMapProvider();
  const loadOptions = async (inputValue, callback) => {
    const results = await provider.search({ query: inputValue });

    console.log(results); // » [{}, {}, {}, ...]

    callback(results);
  };

  const handleInputChange = (newValue) => {
    const newInput = newValue.replace(/\W/g, "");

    return newInput;
  };
  const handleChange = (selectValue) => {
    const fieldValue = {
      coordinates: [selectValue.x, selectValue.y],
      location: selectValue.label,
    };
    console.log(fieldValue);
    formik.setFieldValue(name, fieldValue);
  };

  return (
    <AsyncSelect
      name={name}
      placeholder={placeholder}
      className={className}
      cacheOptions
      loadOptions={loadOptions}
      onInputChange={handleInputChange}
      onChange={handleChange}
      value = {{value:'',label: formik.values.geolocation.location}}
    />
  );
}
