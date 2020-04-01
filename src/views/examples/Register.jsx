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
import * as validator from "validator";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import ErrorMessage from "../../variables/ErrorMessage.jsx";
import { useHistory } from "react-router-dom";

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

export const validateLoginForm = (
  name: string,
  lastname: string,
  email: string,
  password: string,
  passwordC: string,
  userApproved: boolean,
  setError: (error: string | null) => void
): boolean => {
  // Check for undefined or empty input fields
  if (!name || !lastname) {
    setError("Please enter a valid name and lastname.");
    return false;
  }

  if (!email) {
    setError("Please enter a valid email.");
    return false;
  }
  if (password.length < 8) {
    setError("Password must be greater than 8 characters");
    return false;
  }

  if (passwordC !== password) {
    setError("Passwords must match.");
    return false;
  }
  // Validate email
  if (!validator.isEmail(email)) {
    setError("Please enter a valid email address.");
    return false;
  }
  if(!userApproved){
    setError("Please accept the privacy terms");
    return false;
  }
  return true;
};

const REGISTER_DATA = gql`
mutation($name: String!,$lastname: String!,$email: String!,$password: String!) {
    register(user: {name: $name, lastname: $lastname, email: $email, password: $password, podiatrist: true}) {
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


function Register() {
  const history = useHistory();
  const [userName, setUserName] = React.useState("");
  const [userApproved, setUserApproved] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);
  const [userLastname, setUserLastname] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [userCPassword, setUserCPassword] = React.useState("");
  const [register] = useMutation(REGISTER_DATA);
  const { error, showError } = useErrorHandler(null);
  
  const authHandler = () => {
    try {
      setIsSending(true);
      console.log("Hi");

      register({
        variables: {
          name: "" + `${userName}`,
          lastname: "" + `${userLastname}`,
          email: "" + `${userEmail}`,
          password: "" + `${userPassword}`,
        }
      }).then(
        data => {
          if (
            data == undefined ||
            data.data == undefined ||
            data.data.register == undefined ||
            !data.data.register.status
          ) {
            setIsSending(false);
            showError(data.data.register.message);
          } else {
            localStorage.setItem("TOKEN", data.data.register.token);
            const info = data.data.register.user
            localStorage.setItem("CURRENT_USER", JSON.stringify(info));
            console.log((data.data.register.user))
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
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign up with credentials</small>
            </div>
            <Form role="form"
              onSubmit={e => {
                e.preventDefault();
                if (validateLoginForm(userName, userLastname, userEmail, userPassword, userCPassword, userApproved, showError)) {
                  authHandler();
                }
              }}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input value={userName}
                    onChange={e => setUserName(e.target.value)}
                    placeholder="Name" type="text" name="name"/>
                </InputGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input value={userLastname}
                    onChange={e => setUserLastname(e.target.value)}
                    placeholder="Lastname" type="text" name="lastname"/>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input value={userEmail}
                    placeholder="Email"
                    onChange={e => setUserEmail(e.target.value)} type="email" name="email"/>
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input value={userPassword}
                    placeholder="Password"
                    onChange={e => setUserPassword(e.target.value)} type="password" name="password" />
                </InputGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input value={userCPassword}
                    onChange={e => setUserCPassword(e.target.value)} placeholder="Password Confirmation" type="password" name="passwordConfirmation" />
                </InputGroup>
              </FormGroup>
              <div className="text-muted font-italic">
                <small>
                  password matched:{" "}
                  {(userPassword == userCPassword)? <span className="text-success font-weight-700">True</span>
                  
                :
                
                <span className="text-danger font-weight-700">False</span>
                }
                  
                </small>
              </div>
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                      checked={userApproved}
                      onChange={e => setUserApproved(e.target.value)}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheckRegister"
                    >
                      <span className="text-muted">
                        I agree with the{" "}
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                <Button                   disabled={isSending}
                  block={true}
                  className="mt-4" color="primary" type="submit">
                  {isSending ? "Loading..." : "Create an accounts"}
                </Button>
                <br />
                {error && <ErrorMessage errorMessage={error} />}
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}

export default Register;
