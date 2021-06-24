import React from "react";

import ArrayInput from "../../FieldArrays/ArrayInput";
import ArrayField from "../../FieldArrays/ArrayField";

export default function BeneficiaryGroupChangeEdit({
  beneficiaryIndex,
  changeArrayHelpers,
  setDeleteLifeChangeIds,
}) {
  const { form, insert, remove } = changeArrayHelpers;
  return (
    <>
      <ArrayInput
        arrayHelpers={changeArrayHelpers}
        label="How does the life of this beneficiary group change?"
        placeholder="Ex Support & Resources"
      />

      {form.values.beneficiaries[beneficiaryIndex].lifeChange.map(
        (change, changeIndex) => (
          <ArrayField
            name={`beneficiaries[${beneficiaryIndex}].lifeChange`}
            key={changeIndex}
            formik={form}
            arrayHelpers={changeArrayHelpers}
            index={changeIndex}
            value={change}
            placeholder="Input change here ..."
            setdeleteIds={setDeleteLifeChangeIds}
          />
        )
      )}
    </>
  );
}
