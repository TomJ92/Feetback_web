/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import * as validator from "validator";
import { useState, useCallback } from "react";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import ErrorMessage from "../../variables/ErrorMessage.jsx";
import { useHistory } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";

function signIn() {
  console.log("Pressed sign in");
}

const useErrorHandler = (initialState: string | null) => {
  const [error, setError] = React.useState(initialState);
  const showError = (errorMessage: string | null) => {
    setError(errorMessage);
    window.setTimeout(() => {
      setError(null);
    }, 3000);
  };
  return { error, showError };
};

/** Handle form validation for the login form
 * @param email - user's auth email
 * @param password - user's auth password
 * @param setError - function that handles updating error state value
 */
export const validateLoginForm = (
  email: string,
  password: string,
  setError: (error: string | null) => void
): boolean => {
  // Check for undefined or empty input fields
  if (!email || !password) {
    setError("Please enter a valid email and password.");
    return false;
  }
  // Validate email
  if (!validator.isEmail(email)) {
    setError("Please enter a valid email address.");
    return false;
  }
  return true;
};

const LOGIN_DATA = gql`
  mutation($email: String!, $password: String!) {
    loginPodiatrist(email: $email, password: $password) {
      status
      message
      token
      user{
        name
        lastname
        email
        registerDate
        lastMeetingDate
        currentPodiatrist
        podiatrist
        id
      }
    }
  }
`;


export default function Login() {
  const history = useHistory();
  const [isSending, setIsSending] = useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const { error, showError } = useErrorHandler(null);
  const [logged, setLogged] = useState(null);

  const [log] = useMutation(LOGIN_DATA);


  const authHandler = () => {
    try {
      setIsSending(true);
      console.log("Hi");

      log({
        variables: {
          email: "" + `${userEmail}`,
          password: "" + `${userPassword}`
        }
      }).then(
        data => {
          if (
            data == undefined ||
            data.data == undefined ||
            data.data.loginPodiatrist == undefined ||
            !data.data.loginPodiatrist.status
          ) {
            setIsSending(false);
            showError(data.data.loginPodiatrist.message);
          } else {
            localStorage.setItem("TOKEN", data.data.loginPodiatrist.token);
            const info = data.data.loginPodiatrist.user
            localStorage.setItem("CURRENT_USER", JSON.stringify(info));
            console.log((data.data.loginPodiatrist.user))
            history.push("/admin/index");
          }
        },
        error => {
          console.log("error ", error);
        }
      );
    } catch (error) {
      setIsSending(false);
      showError(error.message);
    }
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign in with credentials</small>
            </div>
            <Form
              role="form"
              onSubmit={e => {
                e.preventDefault();
                if (validateLoginForm(userEmail, userPassword, showError)) {
                  authHandler();
                }
              }}
            >
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="email"
                    name="email"
                    value={userEmail}
                    placeholder="john@mail.com"
                    onChange={e => setUserEmail(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="password"
                    name="password"
                    value={userPassword}
                    placeholder="Password"
                    onChange={e => setUserPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button
                  className="my-4"
                  color="primary"
                  type="submit"
                  disabled={isSending}
                  block={true}
                >
                  {isSending ? "Loading..." : "Sign In"}
                </Button>
                <br />
                {error && <ErrorMessage errorMessage={error} />}
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={e => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="../auth/register"
              //onClick={e => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
}
