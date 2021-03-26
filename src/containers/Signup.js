import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Grid, Row, Col, FormGroup, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import AuthService from "../services/auth";
import "./Signup.css";


//Validation code
const validateForm = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  } else if (values.firstName.length > 15) {
    errors.firstName = 'Must be 15 characters or less';
  }

  if (!values.lastName) {
    errors.lastName = 'Required';
  } else if (values.lastName.length > 20) {
    errors.lastName = 'Must be 20 characters or less';
  }

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

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Password does not match';
  }

  return errors;
};



export default function Signup() {

  const [serverMessage, setServerMessage] = useState();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validateForm,
    onSubmit: values => {
      AuthService.register(
        values.firstName,
        values.lastName,
        values.email,
        values.password
      ).then(
        () => {
          history.push("/login");
          window.location.reload();
        },
        // response => {
        //   console.log(response.data);
        //   // const resMessage = response.data;
          
        //   // setMessage(resMessage);
        // },
        error => {
          //console.log(error.response.data);
          const errMessage = error.response.data['error'];
          setServerMessage(errMessage);
        }
      );
      //alert(JSON.stringify(values, null, 2));
    },
  });

  
  return (
    <div className="Signup">
       { serverMessage ? 
        <div className="alert alert-danger container-fluid errorMessage" role="alert">
          {serverMessage}
        </div>
          : null }
      <fieldset className="signupContainer container-fluid border p-3 rounded">
        <legend
            className="signupLegend border rounded p-1 text-center"
          >
            Sign Up
          </legend>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Row>
              <Form.Group as={Col} controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control 
                    autoFocus
                    placeholder="First Name"
                    name="firstName"
                    type="text"
                    onClick={() => setServerMessage(null)}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                  />
                  {formik.touched.firstName && formik.errors.firstName ? <div className="valError">{formik.errors.firstName}</div> : null}
              </Form.Group>

              <Form.Group as={Col} controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control 
                    placeholder="Last Name"
                    name="lastName"
                    type="text"
                    onClick={() => setServerMessage(null)}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName} 
                  />
                  {formik.touched.lastName && formik.errors.lastName ? <div className="valError">{formik.errors.lastName}</div> : null}
              </Form.Group>
          </Form.Row>
          <Form.Group controlId="email" size="lg">
            <Form.Label>Email</Form.Label>
            <Form.Control
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
          <Form.Group controlId="confirmPassword" size="lg">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              name="confirmPassword"
              type="password"
              onClick={() => setServerMessage(null)}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div className="valError">{formik.errors.confirmPassword}</div> : null}
          </Form.Group>
          <Button block size="lg" type="submit">Signup</Button>
          <Form.Group controlId="login-link" size="lg" style={{margin: "15px"}}>
              <Form.Label>Have an account?<Link to="/login"> Login</Link></Form.Label>
          </Form.Group>
          
        </Form>
      </fieldset>
    </div>
      
  );
}