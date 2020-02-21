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
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.jsx";
import AuthLayout from "layouts/Auth.jsx";

import ApolloClient from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { render } from 'react-dom';

import { ApolloProvider } from '@apollo/react-hooks';


const graphQLServerURL = 'http://localhost:4000'

const getToken = () => {
  const token = localStorage.getItem('token');
  return token ? `Bearer ${token}` : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVlNGQ3ZWYzMjVhMjBkNzcxNzFjMmE1YyIsIm5hbWUiOiJNYW51ZWwiLCJsYXN0bmFtZSI6IkdhcmNpYSIsImVtYWlsIjoibWFudWVsQGVkdS5mciIsInBvZGlhdHJpc3QiOnRydWUsImlkIjoxLCJyZWdpc3RlckRhdGUiOiIyMDIwLTAyLTE5IDE5OjMxOjE1In0sImlhdCI6MTU4MjI3OTAyNCwiZXhwIjoxNTgyMzY1NDI0fQ.XkCTTt9UTUZd9FiDCtpZR-C3YTszEPAj0asv1k5JrjQ';
};

const client = new ApolloClient({
  uri: graphQLServerURL + "/graphql",
  request: (operation) => {
    operation.setContext({
      headers: {
        Authorization: getToken(),
      },
    });
  },
});


const App = () => (
  <ApolloProvider client={client}>
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Route path="/auth" render={props => <AuthLayout {...props} />} />
      <Redirect from="/" to="/admin/index" />
    </Switch>
  </BrowserRouter>
  </ApolloProvider>
);

render(<App />, document.getElementById('root'));
