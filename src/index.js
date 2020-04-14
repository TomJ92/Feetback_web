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

  //connect to the backend server
  const graphQLServerURL = 'https://ppe-feetback.herokuapp.com'
  //get current token for user
  const getToken = () => {
    const token = localStorage.getItem('TOKEN');
    return token ? `${token}` : 'LOL';
  };
  //set up connection to the backend server
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
  //build the app with the backend server connection
  const App = () => (
    <ApolloProvider client={client}>
    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
        <Route path="/auth" render={props => <AuthLayout {...props} />} />
        <Redirect from="/" to="/auth/login" />
      </Switch>
    </BrowserRouter>
    </ApolloProvider>
  );

  render(<App />, document.getElementById('root'));
