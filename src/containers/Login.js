import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Grid, Row, Col, FormGroup, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import { useHistory } from "react-router-dom";
import AuthService from "../services/auth";
import "./Login.css";



//Validation code
const validateForm = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length > 8) {
    errors.password = 'Must be 8 characters or less';
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/.test(values.password)) {
    errors.password =  'Password must include at least one Uppercase, Lowercase, Numeric and Special character';
  }
  return errors;
};

export default function Login() {
  
  const [serverMessage, setServerMessage] = useState();
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validateForm,
    onSubmit: values => {
      AuthService.login(values.email, values.password).then(
        () => {
          history.push("/dashboard");
          window.location.reload();
        },
        
        error => {
          //console.log(error.response.data['error']);
          const resMessage = error.response.data['error'];
          // const resMessage =
          //   (error.response &&
          //     error.response.data &&
          //     error.response.data.message) ||
          //   error.message ||
          //   error.toString();
          //   //console.log(resMessage);
          setServerMessage(resMessage);
        }
        
      );
      //alert(JSON.stringify(values, null, 2));
      
    },
  });

  return (
    <div className="Login">
      
      { serverMessage ? 
        <div className="alert alert-danger container-fluid errorMessage" role="alert">
          {serverMessage}
        </div>
          : null }
       
      <fieldset className="loginContainer container-fluid border p-3 rounded">
        <legend
            className="loginLegend border rounded p-1 text-center"
            >
              Login
        </legend>
        <Form onSubmit={formik.handleSubmit} >
          <Form.Group controlId="email" size="lg">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                name="email"
                type="email"
                onClick={() => setServerMessage(null)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? <div className="valError">{formik.errors.email}</div> : null}
          </Form.Group>
          <Form.Group controlId="password" size="lg">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                onClick={() => setServerMessage(null)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? <div className="valError">{formik.errors.password}</div> : null}
          </Form.Group>
          <Button block size="lg" type="submit">Login</Button>
          <Form.Group controlId="signup-link" size="lg" style={{margin: "15px"}}>
              <Form.Label>Need an account?<Link to="/signup"> Sign Up</Link></Form.Label>
          </Form.Group>
        </Form>
      </fieldset>
    </div>
  );
}