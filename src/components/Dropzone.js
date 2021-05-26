import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export default function Dropzone({ formik, name }) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({ accept: "image/*" });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const handleChange = (e) => {
    console.log(e.target.files);
    formik.setFieldValue(name, e.target.files[0]);
  };

  return (
    <div>
      <div {...getRootProps({ style })}>
        <input
          {...getInputProps()}
          name={name}
          id={name}
          onChange={handleChange}
        />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <ul>
        {acceptedFiles.map((file, index) => {
          return (
            <li>{`Name: ${file.name} Size: ${file.size} Type: ${file.type}`}</li>
          );
        })}
      </ul>
    </div>
  );
}
