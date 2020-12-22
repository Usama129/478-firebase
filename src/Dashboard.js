import React, {Component} from 'react'
import Home from "./Home";
import firebase from "firebase";
import {connect} from 'react-redux'
import {Button, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: [],
            current: "home"
        }
    }

    componentWillMount() {
        let context = this
        firebase.firestore().collection("groups")
            .onSnapshot(function(querySnapshot) {
                let groups = [];
                querySnapshot.forEach(function(doc) {
                    groups.push(doc.id);
                });
                context.setState({groups: groups})
            })
    }

    signOut = () => {
        firebase.auth().signOut()
        this.props.logout()
    }

    goToGroup = (group) => {
        this.setState({current: group})
    }

    post = () => {
        let text = document.getElementById('writeBox').value
        if (text === "")
            return
        if (this.state.current === "home"){
            firebase.firestore().collection("posts").doc().set({
                text: text,
                user: firebase.auth().currentUser.displayName,
                timestamp: (new Date()).toLocaleTimeString()
            })
                .then(function() {
                    document.getElementById('writeBox').value = ""
                    console.log("Document successfully written!");
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });

        } else {
            firebase.firestore().collection("groups").doc(this.state.current)
                .collection("posts").doc().set({
                text: text,
                user: firebase.auth().currentUser.displayName,
                timestamp: (new Date()).toLocaleTimeString()
            })
                .then(function() {
                    console.log("Document successfully written!");
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });

        }
    }

    render() {
        return(<div>
                <div className="App">
                    <Navbar bg="dark" variant="dark" expand="lg">
                        <Navbar.Brand>{"Hi, " +firebase.auth().currentUser.displayName}</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto uhs-nav">
                                <Nav.Link onClick={()=>this.goToGroup("home")} >
                                    Home
                                </Nav.Link>
                                <NavDropdown title={this.state.current === "home" ? "Groups" : this.state.current} id="collasible-nav-dropdown">
                                    {this.state.groups.map((name) => (
                                        <NavDropdown.Item onClick={() => this.goToGroup(name)}>{name}</NavDropdown.Item>
                                    ))}
                                </NavDropdown>
                            </Nav>
                            <Button variant="outline-success" onClick={this.signOut}>Sign Out</Button>
                        </Navbar.Collapse>
                    </Navbar>
                    <div  className="post" style={{height: '200px'}}>
                        <textarea id="writeBox" type="textarea" className="write-post"/>
                       <div className="postButtonContainer">
                           <Button className="post-button" variant="outline-success" onClick={this.post}>Post</Button>
                       </div>
                    </div>

                    <Home group={this.state.current}/>
                </div>
        </div>)
    }
}
const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    login: () => dispatch({type: 'signIn'}),
    logout: () => dispatch({type: 'signOut'})
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);