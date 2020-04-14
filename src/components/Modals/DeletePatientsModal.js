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

//gql query to get patients not assigned to a podiatrist
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
//gql query to update a patient with its id and the change field 
const UPDATE_PATIENT = gql`
mutation($patient: ID!, $change: UserUpdateInput!) {
  updateUser(user: $patient, change: $change) {
    status
    message
  }
}
`;

//Class component
export default function DeletePatientsModal(props) {
  //get the current user podiatrist
  const history = useHistory();
  let info = JSON.parse(localStorage.getItem("CURRENT_USER"));
  //assigned modal and query
  const [exampleModal, setExampleModal] = useState(false);
  const [updatePatient] = useMutation(UPDATE_PATIENT);

  function toggleModal() {
    setExampleModal(!exampleModal);
  }
  //function to release a patient
  function releasePatient(patientId){
    //if the patient id exists
    if (info.id !==null || patientId==null){
      toggleModal()
    }
    try {
      //update a patient by changing its current podiatrist to null to free him
      updatePatient({
        variables: {
          patient: patientId,
          change: {currentPodiatrist: null}
        }
      }).then(
      data => {
        if (
          data == undefined ||
          data.data == undefined ||
          data.data.updateUser == undefined ||
          !data.data.updateUser.status
          ) {

          
          console.log(data.data.updateUser.message);


      } else {
            //if the commands work reload the page
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
    //Display
  {/* Button trigger modal */}
  <Button color="danger" type="button" onClick={() => toggleModal()}>
  X
  </Button>
{/* Modal */}
<Modal
className="modal-dialog-centered"
isOpen={exampleModal}
toggle={() => toggleModal()}
>
<div className="modal-header">
<h5 className="modal-title" id="exampleModalLabel">
Action Required
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
Are you sure that you want to release this patient?
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
<Button color="danger" type="button" onClick={()=> releasePatient(props.patientId)}>
Release
</Button>
</div>
</Modal>
</>
);
}
