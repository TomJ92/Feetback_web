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
  import Index from "views/Index.jsx";
  import Profile from "views/examples/Profile.jsx";
  import Maps from "views/examples/Maps.jsx";
  import Register from "views/examples/Register.jsx";
  import Login from "views/examples/Login.jsx";
  import Tables from "views/examples/Tables.jsx";
  import Icons from "views/examples/Icons.jsx";
  import Patient from "views/examples/Patient.jsx";
  import PatientProfile from "views/examples/PatientsProfile.jsx"
  //Assigned routes by views
  var routes = [
    {
      path: "/index",
      name: "Dashboard",
      icon: "ni ni-tv-2 text-primary",
      component: Index,
      layout: "/admin"
    },
    {
      path: "/user-profile",
      name: "User Profile",
      icon: "ni ni-single-02 text-yellow",
      component: Profile,
      layout: "/admin"
    },
    {
      path: "/login",
      name: "Login",
      icon: "ni ni-key-25 text-info",
      component: Login,
      layout: "/auth"
    },
    {
      path: "/register",
      name: "Register",
      icon: "ni ni-circle-08 text-pink",
      component: Register,
      layout: "/auth"
    },
    {
      path: "/patient",
      name: "Patient's record",
      icon: "ni ni-tv-2 text-primary",
      component: Patient,
      layout: "/admin"
    },
    {
      path: "/patientProfile",
      name: "Patient's profile",
      icon: "ni ni-tv-2 text-primary",
      component: PatientProfile,
      layout: "/admin"
    }
  ];
  export default routes;
