import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';

import store from 'redux/store';
import setAuthToken from '../../utils/setAuthToken';
import {setCurrentUser, setLoggedin,logoutUser} from 'redux/actions/authActions';
import Cookies from 'js-cookie'

import Routes from 'components/Routes/Routes';
import { DBConfig } from 'DBConfig';
import { initDB } from 'react-indexed-db';
 import {get} from "components/model/app.model";
import {HEADERS} from "redux/actions/_constants";
import axios from 'axios';
import 'react-intl-tel-input/dist/main.css';

initDB(DBConfig);
axios.defaults.headers.common['username'] = `${HEADERS.USERNAME}`;
axios.defaults.headers.common['password'] = `${HEADERS.PASSWORD}`;
axios.defaults.headers.common['myconnection'] = `apps`;
axios.defaults.headers.common['Content-Type'] = `application/x-www-form-urlencoded`;

  const token = Cookies.get('sangqu_datum');
  // Check token in localStorage
  if (token !==undefined) {
    setAuthToken(atob(token));
    store.dispatch(setLoggedin(true))
    const sess = get('sess');
      sess.then(res => {
        if (res.length!==0) {
          store.dispatch(setCurrentUser(res[0]))

          // Decode auth token and get user info
          // let decoded = jwt_decode(localStorage.jwtToken);
          // Dispatch user info
          // Check for expire token
          // const currentTime = Date.now() /1000;
          // if(decoded.exp < currentTime){
          //   // Logout User
          //   store.dispatch(logoutUser());
          //   // TODO: Clear current profile
          //   // Redirect to login
          //   window.location.href = '/login';
          // }
        }else{
          store.dispatch(logoutUser());
          Cookies.remove('sangqu_datum')
          // TODO: Clear current profile
          // Redirect to login
          window.location.href = '/login';
        }
    })
  } 

class App extends Component {
  render() {
    return (
      <Router>
            {Routes}
      </Router>
    );
  }
}

export default App;