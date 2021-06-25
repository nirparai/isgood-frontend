import React from "react";

import ArrayInput from "../components/Forms/CreateProjectForm/FieldArrays/ArrayInput";
import ArrayField from "../components/Forms/CreateProjectForm/FieldArrays/ArrayField";

export default function BenerficiaryGroupChange({
  beneficiaryIndex,
  changeArrayHelpers,
}) {
  const { form: formik } = changeArrayHelpers;
  return (
    <>
      <ArrayInput
        arrayHelpers={changeArrayHelpers}
        label="How does the life of this beneficiary group change?"
        placeholder="Ex Support & Resources"
      />

      {formik.values.beneficiaries[beneficiaryIndex].lifeChange.map(
        (change, changeIndex) => (
          <ArrayField
            name={`beneficiaries[${beneficiaryIndex}].lifeChange`}
            key={changeIndex}
            formik={formik}
            arrayHelpers={changeArrayHelpers}
            index={changeIndex}
            value={change}
            placeholder="Input change here ..."
          />
        )
      )}
    </>
  );
}
