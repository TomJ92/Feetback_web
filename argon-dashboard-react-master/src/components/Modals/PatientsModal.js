import React from "react";
import { useState } from "react";

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
  Modal,
  Row,
  Col
} from "reactstrap";

import {
  Badge,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  UncontrolledTooltip
} from "reactstrap";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useHistory } from "react-router-dom";


const FREE_PACIENTS = gql`
  query {
    getFreePacients {
      status
      message
      pacients {
        id
        name
        lastname
        email
        registerDate
      }
    }
  }
`;
const UPDATE_PATIENTS = gql`
  mutation($podiatrist: ID!, $patients: [ID!]!) {
    addPatientsArray(podiatrist: $podiatrist, patients: $patients) {
      status
      message
      updatedPatients
    }
  }
`;

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

export default function PatientsModal() {
  const history = useHistory();
  let info = JSON.parse(localStorage.getItem("CURRENT_USER"));

  const [exampleModal, setExampleModal] = useState(false);
  const [addPatients, setAddPatients] = useState([]);
  const [updatePatients] = useMutation(UPDATE_PATIENTS);
  const { loading, err, data } = useQuery(FREE_PACIENTS);
  const { error, showError } = useErrorHandler(null);

  function updateAddPatients(id){
    var position = addPatients.indexOf(id);

    if ( ~position ) addPatients.splice(position, 1);
    else addPatients.push(id);


    console.log(addPatients)
  }
  function toggleModal() {
    setExampleModal(!exampleModal);
  }



  if (loading) return <p>Loading...</p>;
  if (err || data.status == false) return <p>Error :(</p>;

  const { pacients = [] } = { pacients: data.getFreePacients.pacients };
  console.log(pacients)
  function addPatientsOnServer(patients){
    if (info.id !==null || patients.length==0){
      toggleModal()
    }
    var register = []
    patients.forEach(patient =>{
      if(pacients.indexOf(patient))
        register.push(patient);
    });

    if(register.length != patients.length)
      toggleModal()
    try {
      updatePatients({
        variables: {
          podiatrist: "" + `${info.id}`,
          patients: register
        }
      }).then(
        data => {
          if (
            data == undefined ||
            data.data == undefined ||
            data.data.addPatientsArray == undefined ||
            !data.data.addPatientsArray.status
          ) {

            
            console.log(data.data.addPatientsArray.message);


          } else {
            console.log("donde")
            window.location.reload();

          }
        },
        error => {
          console.log("error ", error);
        }
      );
    } catch (error) {
      console.log(error.message);
    }

  }
  return (
    <>
      {/* Button trigger modal */}
      <Button color="primary" type="button" onClick={() => toggleModal()}>
        Add Patients
      </Button>
      {/* Modal */}
      <Modal
        className="modal-dialog-centered"
        isOpen={exampleModal}
        toggle={() => toggleModal()}
      >
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Founded Patients
          </h5>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => toggleModal()}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">Patient</th>
                <th scope="col">Registration date</th>
                <th scope="col">Add</th>
              </tr>
            </thead>
            <tbody>
              {pacients.length ? (
                pacients.map(pacient => (
                  <tr>
                    <th scope="row">
                  <Media className="align-items-center">
                    <Media>
                    <Container fluid>

                      <Row>
                      <span className="mb-0 text-sm">{pacient.name + " " + pacient.lastname}</span>

                      </Row>
                      <Row>
                      <span className="mb-0 text-xs grey">{pacient.email}</span>

                      </Row>
                      </Container>
                    </Media>
                  </Media>
                </th>
                <td>{pacient.lastMeetingDate
                        ? pacient.lastMeetingDate
                        : "None"}</td>
                <td>
                  <div className="custom-control custom-checkbox mb-3">
                  <input
                      className="custom-control-input"
                      id={pacient.id}
                      onChange={()=>updateAddPatients(pacient.id)}
                      type="checkbox"
                    />
                  <label
                      className="custom-control-label"
                      htmlFor={pacient.id}
                    >
                    
                    </label>
                  </div>
                </td>
              </tr>
                
              
                    
                ))
              ) : (
                <tr>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        <div className="modal-footer">
          <Button
            color="secondary"
            data-dismiss="modal"
            type="button"
            onClick={() => toggleModal()}
          >
            Cancel
          </Button>
          <Button color="primary" type="button" onClick={()=> addPatientsOnServer(addPatients)}>
            Save changes
          </Button>
        </div>
      </Modal>
    </>
  );
}
