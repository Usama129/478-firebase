import './css/App.css';
import Post from "./Post";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, Form, FormControl, Button, NavDropdown} from 'react-bootstrap'
import {BrowserRouter, Link, Route, Redirect} from 'react-router-dom'
import Home from "./Home";
import React from "react";
import firebase from "firebase";
import {connect} from 'react-redux'

import SignIn from "./firebase/SignIn";
import Dashboard from "./Dashboard";

class App extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            authenticated: false
        }
    }

    componentWillMount() {
        let context = this
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                context.props.login()
            } else {
                context.props.logout()
            }
        });
    }

    render() {
      return (<div>
          {this.props.authenticated ? <Dashboard/> : <SignIn/>}
          </div>
      );
  }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    login: () => dispatch({type: 'signIn'}),
    logout: () => dispatch({type: 'signOut'})
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
