import React, {useEffect, useState} from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import {connect} from 'react-redux'

const config = {
    apiKey: "AIzaSyBYluNXV9DlxzRsUqZxcsNNhadsCcvjaYk",
    authDomain: "social-27d63.firebaseapp.com",
    projectId: "social-27d63",
    storageBucket: "social-27d63.appspot.com",
    messagingSenderId: "197279588879",
    appId: "1:197279588879:web:8d98dc115d8ffa274d397a"
};
if (!firebase.apps.length) {
    firebase.initializeApp(config)
}else {
    firebase.app();
}

const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        signInSuccessWithAuthResult: () => false,
    },
};

function SignIn(props) {
    if (props.authenticated === false) {
        return (
            <div>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    login: (user) => dispatch({type: 'signIn', user: user}),
    logout: () => dispatch({type: 'signOut'})
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);