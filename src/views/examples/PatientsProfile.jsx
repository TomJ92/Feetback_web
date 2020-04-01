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
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useHistory } from 'react-router-dom';
import { useState } from "react";
import sendMail from "../../components/Mail.js"


// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.jsx";
import DeletePatientsModal from "components/Modals/DeletePatientsModal.js";
import Anomaly from "components/Anomaly/Anomaly.js";
//QUERY TO UPDATE A PATIENT USER WITH IS ID AND THE FIELD TO CHANGE
const UPDATE_PATIENT = gql`
mutation($patient: ID!, $change: UserUpdateInput!) {
  updateUser(user: $patient, change: $change) {
    status
    message
  }
}
`;

export default function PatientsProfile (props){
  var info = JSON.parse(localStorage.getItem("CURRENT_PATIENT"));
  console.log(info);
  const [exampleModal, setExampleModal] = useState(false);
  const [updatePatient] = useMutation(UPDATE_PATIENT);
  var anomaly_threshold = parseInt(info.anomaly_threshold);
  console.log(info);
  var sensor_1_toggle,sensor_2_toggle,sensor_3_toggle,sensor_4_toggle,sensor_5_toggle = false;
  console.log(info);
  if(info.sensor_1_top_position && info.sensor_1_left_position)
  {
    var sensor_1_top_position_save = info.sensor_1_top_position;
    var sensor_1_left_position_save = info.sensor_1_left_position;
  }
  else
  {
    var sensor_1_left_position_save = 412;
    var sensor_1_top_position_save = 454;
  }
  if(info.sensor_2_top_position && info.sensor_2_left_position)
  {
    var sensor_2_top_position_save = info.sensor_2_top_position;
    var sensor_2_left_position_save = info.sensor_2_left_position;
  }
  else
  {
    var sensor_2_left_position_save = 452;
    var sensor_2_top_position_save = 454;
  }
  if(info.sensor_3_top_position && info.sensor_3_left_position)
  {
    var sensor_3_top_position_save = info.sensor_3_top_position;
    var sensor_3_left_position_save = info.sensor_3_left_position;
  }
  else
  {
    var sensor_3_left_position_save = 492;
    var sensor_3_top_position_save = 454;
  }
  if(info.sensor_4_top_position && info.sensor_4_left_position)
  {
    var sensor_4_top_position_save = info.sensor_4_top_position;
    var sensor_4_left_position_save = info.sensor_4_left_position;
  }
  else
  {
    var sensor_4_left_position_save = 532;
    var sensor_4_top_position_save = 454;
  }
  if(info.sensor_5_top_position && info.sensor_5_left_position)
  {
    var sensor_5_top_position_save = info.sensor_5_top_position;
    var sensor_5_left_position_save = info.sensor_5_left_position;
  }
  else
  {
    var sensor_5_left_position_save = 572;
    var sensor_5_top_position_save = 454;
  }


  sensor_1_top_position_save += 43.11114501953;
  sensor_1_left_position_save += 15;
  sensor_2_top_position_save += 43.11114501953;
  sensor_2_left_position_save += 15;
  sensor_3_top_position_save += 43.11114501953;
  sensor_3_left_position_save += 15;
  sensor_4_top_position_save += 43.11114501953;
  sensor_4_left_position_save += 15;
  sensor_5_top_position_save += 43.11114501953;
  sensor_5_left_position_save += 15;






  function toggleModal() {
    setExampleModal(!exampleModal);
  }

  //RETURN DATE IN THE DESIRED FORMAT
  function getCurrentDateTime(dateSeparateSymbol: string = '-') {
    const dateTime = new Date();
    let dateDay: string = formatWithTwoDigits(String(dateTime.getDate()));
    let month: string = formatWithTwoDigits(String(dateTime.getMonth() + 1));

    let hour : string = formatWithTwoDigits(String(dateTime.getHours()));
    let minutes : string = formatWithTwoDigits(String(dateTime.getMinutes()));
    let seconds : string = formatWithTwoDigits(String(dateTime.getSeconds()));

    return `${dateTime.getFullYear()}${dateSeparateSymbol}${month}${dateSeparateSymbol}${dateDay} ${hour}:${minutes}:${seconds}`;
  }

  function formatWithTwoDigits(value: number | string) {
    if (+value < 10) {
      return `0${value}`;
    }
    return String(value);
  }

  function resetPosition()
  {
    if (info.id !==null){
        toggleModal()
      }
      try {
        updatePatient({
          variables: {
            patient: info.id,
            change: {sensor_1_top_position: 454,
              sensor_2_top_position : 454,
              sensor_3_top_position : 454,
              sensor_4_top_position : 454,
              sensor_5_top_position : 454,
              sensor_1_left_position : 412,
              sensor_2_left_position : 452,
              sensor_3_left_position : 492,
              sensor_4_left_position : 532,
              sensor_5_left_position : 572}
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
            console.log("donde");
            console.log(anomaly_threshold);
            info.sensor_1_top_position = null;
            info.sensor_2_top_position = null;
            info.sensor_3_top_position = null;
            info.sensor_4_top_position = null;
            info.sensor_5_top_position = null;
            info.sensor_1_left_position = null;
            info.sensor_2_left_position = null;
            info.sensor_3_left_position = null;
            info.sensor_4_left_position = null;
            info.sensor_5_left_position = null;
            localStorage.removeItem("CURRENT_PATIENT");
            localStorage.setItem("CURRENT_PATIENT", JSON.stringify(info));
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
      };

    //UPDATE SENSORS POSITION ON THE FOOT
    function updateSensors(event)
    {

      let sensor_1_img = document.getElementById("sensor_1_img");
      let sensor_2_img = document.getElementById("sensor_2_img");
      let sensor_3_img = document.getElementById("sensor_3_img");
      let sensor_4_img = document.getElementById("sensor_4_img");
      let sensor_5_img = document.getElementById("sensor_5_img");
      let foot_img = document.getElementById("foot_img");

      console.log(foot_img.getBoundingClientRect().x);
      console.log(foot_img.getBoundingClientRect().y);
      console.log(sensor_1_img.getBoundingClientRect().x);
      console.log(sensor_1_img.getBoundingClientRect().y);
      console.log(sensor_2_img.getBoundingClientRect().x);
      console.log(sensor_2_img.getBoundingClientRect().y);
      console.log(sensor_3_img.getBoundingClientRect().x);
      console.log(sensor_3_img.getBoundingClientRect().y);
      console.log(sensor_4_img.getBoundingClientRect().x);
      console.log(sensor_4_img.getBoundingClientRect().y);
      console.log(sensor_5_img.getBoundingClientRect().x);
      console.log(sensor_5_img.getBoundingClientRect().y);

      let sensor_1_top_position = sensor_1_img.getBoundingClientRect().y-foot_img.getBoundingClientRect().y;
      let sensor_2_top_position = sensor_2_img.getBoundingClientRect().y-foot_img.getBoundingClientRect().y;
      let sensor_3_top_position = sensor_3_img.getBoundingClientRect().y-foot_img.getBoundingClientRect().y;
      let sensor_4_top_position = sensor_4_img.getBoundingClientRect().y-foot_img.getBoundingClientRect().y;
      let sensor_5_top_position = sensor_5_img.getBoundingClientRect().y-foot_img.getBoundingClientRect().y;
      let sensor_1_left_position = sensor_1_img.getBoundingClientRect().x-foot_img.getBoundingClientRect().x;
      let sensor_2_left_position = sensor_2_img.getBoundingClientRect().x-foot_img.getBoundingClientRect().x;
      let sensor_3_left_position = sensor_3_img.getBoundingClientRect().x-foot_img.getBoundingClientRect().x;
      let sensor_4_left_position = sensor_4_img.getBoundingClientRect().x-foot_img.getBoundingClientRect().x;
      let sensor_5_left_position = sensor_5_img.getBoundingClientRect().x-foot_img.getBoundingClientRect().x;

      if (info.id !==null){
        toggleModal()
      }
      try {
        updatePatient({
          variables: {
            patient: info.id,
            change: {sensor_1_top_position: sensor_1_top_position,
              sensor_2_top_position : sensor_2_top_position,
              sensor_3_top_position : sensor_3_top_position,
              sensor_4_top_position : sensor_4_top_position,
              sensor_5_top_position : sensor_5_top_position,
              sensor_1_left_position : sensor_1_left_position,
              sensor_2_left_position : sensor_2_left_position,
              sensor_3_left_position : sensor_3_left_position,
              sensor_4_left_position : sensor_4_left_position,
              sensor_5_left_position : sensor_5_left_position}
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
            console.log("donde");
            console.log(anomaly_threshold);
            info.sensor_1_top_position = sensor_1_top_position;
            info.sensor_2_top_position = sensor_2_top_position;
            info.sensor_3_top_position = sensor_3_top_position;
            info.sensor_4_top_position = sensor_4_top_position;
            info.sensor_5_top_position = sensor_5_top_position;
            info.sensor_1_left_position = sensor_1_left_position;
            info.sensor_2_left_position = sensor_2_left_position;
            info.sensor_3_left_position = sensor_3_left_position;
            info.sensor_4_left_position = sensor_4_left_position;
            info.sensor_5_left_position = sensor_5_left_position;
            localStorage.removeItem("CURRENT_PATIENT");
            localStorage.setItem("CURRENT_PATIENT", JSON.stringify(info));
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
      };


      const date_today = getCurrentDateTime();


      function changeAnomalyThreshold(patientId){
        if (info.id !==null || patientId==null){
          toggleModal()
        }
        if(anomaly_threshold > 0 && Number.isInteger(anomaly_threshold)){
          try {
            updatePatient({
              variables: {
                patient: patientId,
                change: {anomaly_threshold: anomaly_threshold}
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
              console.log("donde");
              console.log(anomaly_threshold);
              info.anomaly_threshold = anomaly_threshold.toString();
              localStorage.removeItem("CURRENT_PATIENT");
              localStorage.setItem("CURRENT_PATIENT", JSON.stringify(info));
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
      };


      function handleChangeAnomalyThreshold(evt){
        anomaly_threshold = parseInt(evt.target.value);
        console.log("anomaly_threshold  change");
        console.log(anomaly_threshold);
      };


      function updateToday(patientId){
        if (info.id !==null || patientId==null){
          toggleModal()
        }
        try {
          updatePatient({
            variables: {
              patient: patientId,
              change: {lastMeetingDate: date_today}
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
            console.log("donde");
            console.log(date_today);
            info.lastMeetingDate = date_today;
            localStorage.removeItem("CURRENT_PATIENT");
            localStorage.setItem("CURRENT_PATIENT", JSON.stringify(info));
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
      };
      console.log(info);
//let ball = document.getElementById("sensor_1_img");
//ball.onmousedown = move_sensor_1(window.event);

function move_sensor_1(event) { // (1) start the process

  sensor_1_toggle = !sensor_1_toggle;
  if(sensor_1_toggle){
    let ball = document.getElementById("sensor_1_img");
  // (2) prepare to moving: make absolute and on top by z-index

  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;
  document.body.append(ball);

  moveAt(event.pageX, event.pageY);
  console.log("OK MOVE");

  // moves the ball at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
    ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
    console.log("OKKKK");
  }

  // move the ball on mousemove
  ball.addEventListener('mousemove', onMouseMove);

  // drop the ball, remove unneeded handlers
  ball.onmouseup = function() {
    ball.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };
}
};

/*function move_sensor_1(event)
{
  var e = window.event;

    var posX = e.clientX;
    var posY = e.clientY;

  let ball = document.getElementById("sensor_1_img");
  // (2) prepare to moving: make absolute and on top by z-index
  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;
  // move it out of any current parents directly into body
  // to make it positioned relative to the body
  document.body.append(ball);
  // ...and put that absolutely positioned ball under the pointer

  moveAt(posX, posY);
  console.log("MOUSEEE");
  console.log(MouseEvent);

  // centers the ball at (pageX, pageY) coordinates
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
    ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
  }

  ball.onmousemove = function(event) {
    moveAt(posX, posY);
  }

  // (3) move the ball on mousemove
  //document.addEventListener('mousemove', onMouseMove);

  // (4) drop the ball, remove unneeded handlers
  ball.onmouseup = function() {
    ball.onmousemove=null;
    //document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };
  console.log(ball);
  /*sensor_1_toggle = !sensor_1_toggle;
  let e = document.getElementById("sensor_1_img");
  //while(sensor_1_toggle)
  //{
  console.log(e.style.left);
  e.style.left= 10;
  e.style.top = 10;
  //if(MouseEvent.click)
  //{
    sensor_1_toggle = false;
  //}
  //}
  //let radius = e.height() /2;

};
*/
function stop_move_sensor_1()
{

  sensor_1_toggle = !sensor_1_toggle;
};
function move_sensor_2(event)
{
  sensor_2_toggle = !sensor_2_toggle;
  if(sensor_2_toggle){
    let ball = document.getElementById("sensor_2_img");
  // (2) prepare to moving: make absolute and on top by z-index

  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;
  document.body.append(ball);

  moveAt(event.pageX, event.pageY);
  console.log("OK MOVE");

  // moves the ball at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
    ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
    console.log("OKKKK");
  }

  // move the ball on mousemove
  ball.addEventListener('mousemove', onMouseMove);

  // drop the ball, remove unneeded handlers
  ball.onmouseup = function() {
    ball.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };
}
};
function move_sensor_3(event)
{
  sensor_3_toggle = !sensor_3_toggle;
  if(sensor_3_toggle){
    let ball = document.getElementById("sensor_3_img");
  // (2) prepare to moving: make absolute and on top by z-index

  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;
  document.body.append(ball);

  moveAt(event.pageX, event.pageY);
  console.log("OK MOVE");

  // moves the ball at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
    ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
    console.log("OKKKK");
  }

  // move the ball on mousemove
  ball.addEventListener('mousemove', onMouseMove);

  // drop the ball, remove unneeded handlers
  ball.onmouseup = function() {
    ball.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };
}
};
function move_sensor_4(event)
{
  sensor_4_toggle = !sensor_4_toggle;
  if(sensor_4_toggle){
    let ball = document.getElementById("sensor_4_img");
  // (2) prepare to moving: make absolute and on top by z-index

  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;
  document.body.append(ball);

  moveAt(event.pageX, event.pageY);
  console.log("OK MOVE");

  // moves the ball at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
    ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
    console.log("OKKKK");
  }

  // move the ball on mousemove
  ball.addEventListener('mousemove', onMouseMove);

  // drop the ball, remove unneeded handlers
  ball.onmouseup = function() {
    ball.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };
}
};
function move_sensor_5(event)
{
  sensor_5_toggle = !sensor_5_toggle;
  if(sensor_5_toggle){
    let ball = document.getElementById("sensor_5_img");
  // (2) prepare to moving: make absolute and on top by z-index

  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;
  document.body.append(ball);

  moveAt(event.pageX, event.pageY);
  console.log("OK MOVE");

  // moves the ball at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
    ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
    console.log("OKKKK");
  }

  // move the ball on mousemove
  ball.addEventListener('mousemove', onMouseMove);

  // drop the ball, remove unneeded handlers
  ball.onmouseup = function() {
    ball.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };
}
};





if(info == undefined || info.currentPodiatrist == undefined || info.id == undefined)
  return (<>

    <UserHeader title={"Error while loading info, go back to dashboard"} />
  {/* Page content */}
  <Container className="mt--7" fluid>
  <Row>
  <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
  </Col>
  </Row>
  </Container>
  </>);
  let infoPodiatrist= JSON.parse(localStorage.getItem("CURRENT_USER"));
  let emailMessage = `Hello ${info.name} ${info.lastname}, your podiatrist ${infoPodiatrist.name} ${infoPodiatrist.lastname} that you last saw on ${info.lastMeetingDate? info.lastMeetingDate: "None"} think that you need to schedule a appointment with him. \n Have a good day, \n\n Feetback application.`;
  return (
  <>
  <UserHeader title={`Welcome to ${info.name} ${info.lastname}  profile`} body={"Here you can register the last meeting for your patient and change the sensors' position on his foot.  "} />
{/* Page content */}
<Container className="mt--7" fluid>
<Row>
<Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
<Card className="card-profile shadow">
<Row className="justify-content-center">
<Col className="order-lg-2" lg="3">
<div className="card-profile-image">
<a href="#pablo" onClick={e => e.preventDefault()}>
<img
alt="patient_logo"
className="rounded-circle"
src={require("assets/img/theme/patient.png")}
/>
</a>
</div>
</Col>
</Row>
<CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4 mb-5">
</CardHeader>
<CardBody className="pt-0 pt-md-4">
<div className="text-center">
<h3>
{info.name} {info.lastname}
<span className="font-weight-light"></span>
</h3>
<hr className="my-4" />
<h3>
Anomaly
</h3>
<Anomaly val={info.anomaly}></Anomaly>
<hr className="my-4" />
<p>
<b>Email :</b> <a href="">{info.email}</a>
</p>
<Button
color="default"
onClick={() => sendMail(info.email, infoPodiatrist.email, "Schedule a meeting soon!", emailMessage)}
size="sm"
>
Schedule a meeting
</Button>
</div>
</CardBody>
</Card>
</Col>
<Col className="order-xl-1" xl="8">
<Card className="bg-secondary shadow">
<CardHeader className="bg-white border-0">
<Row className="align-items-center">
<Col xs="8">
<h3 className="mb-0">Informations</h3>
</Col>
</Row>
</CardHeader>
<CardBody>
<Form>
<div className="pl-lg-4">
<Row>
<Col lg="6">
<FormGroup>
<label
className="form-control-label"
htmlFor="input-datetime"
>
Last meeting took place on:
</label>
<Input
type="datetime"
name="input-datetime"
disabled
value={info.lastMeetingDate? info.lastMeetingDate: "None"}
id="exampleDatetime"
placeholder="datetime placeholder"
/>
</FormGroup>
</Col>
<Col lg="6">
<FormGroup>
<Button
className="mt-4"
color="primary"
onClick={() => updateToday(info.id)}
>
Update to today
</Button>
</FormGroup>
</Col>
</Row>
<Row>
<Col lg="6">
<FormGroup>
<label
className="form-control-label"
htmlFor="input-datetime"
>
Anomaly threshold in %
</label>
<Input
type="number"
name="input-anomaly_threshold"
defaultValue={info.anomaly_threshold}
onChange={handleChangeAnomalyThreshold}
/>
</FormGroup>
</Col>
<Col lg="6">
<FormGroup>
<Button
className="mt-4"
color="primary"
onClick={() => changeAnomalyThreshold(info.id)}
>
Change anomaly threshold
</Button>
</FormGroup>
</Col>
</Row>
<Row>
<Col lg="10">
<p>Put on the foot mapping the sensors position</p>
<div>
<img
id="foot_img"
alt="foot_mapping"
src={require("assets/img/theme/foot.png")}
class="position-sticky w-50 p-3"
/>
<img
id ="sensor_1_img"
alt="foot_mapping"
src={require("assets/img/theme/circle-1.png")}
draggable="true"
onClick = {move_sensor_1}
style = {{position : "absolute", top: (sensor_1_top_position_save).toString()+"px" , left: (sensor_1_left_position_save).toString()+"px"}}
//onClick =  {()=>stop_move_sensor_1()}
width="40em"
height="40em"
//onClick = {move_sensor_1()}
/>
<img
id ="sensor_2_img"
alt="foot_mapping"
src={require("assets/img/theme/circle-2.png")}
class="inner-image"
style = {{position : "absolute", top: (sensor_2_top_position_save).toString()+"px" , left: (sensor_2_left_position_save).toString()+"px"}}
width="40em"
height="40em"
onClick = {move_sensor_2}
/>
<img
id ="sensor_3_img"
alt="foot_mapping"
src={require("assets/img/theme/circle-3.png")}
class="inner-image"
width="40em"
height="40em"
onClick = {move_sensor_3}
style = {{position : "absolute", top: (sensor_3_top_position_save).toString()+"px" , left: (sensor_3_left_position_save).toString()+"px"}}

/>
<img
id ="sensor_4_img"
alt="foot_mapping"
src={require("assets/img/theme/circle-4.png")}
class="inner-image"
width="40em"
height="40em"
onClick = {move_sensor_4}
style = {{position : "absolute", top: (sensor_4_top_position_save).toString()+"px" , left: (sensor_4_left_position_save).toString()+"px"}}

/>
<img
id ="sensor_5_img"
alt="foot_mapping"
src={require("assets/img/theme/circle-5.png")}
class="inner-image"
width="40em"
height="40em"
onClick = {move_sensor_5}
style = {{position : "absolute", top: (sensor_5_top_position_save).toString()+"px" , left: (sensor_5_left_position_save).toString()+"px"}}

/>
</div>
<table cellPadding="10em">
<tbody>
<tr>
<td><Button
className="mt-4"
color="primary"
onClick={() => updateSensors(info.patientId)}
>
Save sensors location
</Button></td>
<td><Button
className="mt-4"
color="primary"
onClick = {() => resetPosition()}
>
Reset position
</Button></td>
</tr>
</tbody>
</table>
</Col>
</Row>
</div>
{/* Address */}

</Form>
</CardBody>
</Card>
</Col>
</Row>
</Container>
</>
);
  //document.getElementById("sensor_1_img").style.top
  //var sensor_1_position_element =

}
