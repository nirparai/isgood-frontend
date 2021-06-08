import React, { useMemo, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ImageService from "services/imageService";
import { Button } from "react-bootstrap";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  margin: "auto",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  height: "20vw",
  width: "20vw",
  maxHeight: 200,
  maxWidth: 200,
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
const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  margin: "auto",
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  height: "20vw",
  width: "20vw",
  maxHeight: 200,
  maxWidth: 200,

  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
  marginLeft: "50%",
  transform: "translateX(-50%)",
};

export default function Dropzone({ formik, name, type }) {
  const [file, setFile] = useState(null);
  const { getAccessTokenSilently } = useAuth0();
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    accept: "image/*",
    maxFiles: 2,
    onDrop: (acceptedFiles) => {
      setFile(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
      // formik.setFieldValue(name, acceptedFiles[0]);
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
    },
    [file]
  );

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(
        Object.assign(e.target.files[0], {
          preview: URL.createObjectURL(e.target.files[0]),
        })
      );
      // formik.setFieldValue(name, e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    // check file is selected and allowed to be uploaded
    if (file) {
      //make request to upload endpoint
      const token = await getAccessTokenSilently();
      const res = await ImageService.uploadImage(file, token, type);
      console.log(res.data);
      //set formik value as file id / file
      formik.setFieldValue(name, res.data);
    }
  };

  return (
    <>
      <div {...getRootProps({ style })}>
        <input
          {...getInputProps()}
          name={name}
          id={name}
          onChange={onSelectFile}
        />
        {file ? (
          <div style={thumbsContainer}>
            <div style={thumb} key={file.name}>
              <div style={thumbInner}>
                <img src={file.preview} style={img} alt="preview" />
              </div>
            </div>
          </div>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>

      <Button onClick={handleUpload}>Upload</Button>
    </>
  );
}
