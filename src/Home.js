import React, {Component} from 'react'
import Post from "./Post";
import firebase from "firebase";
import {Button, Navbar} from "react-bootstrap";


class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            posts: [],
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({group: nextProps.group})
        let context = this
        if (nextProps.group === "home"){
            firebase.firestore().collection("posts").orderBy("timestamp", "desc")
                .onSnapshot(function(querySnapshot) {
                    var posts = [];
                    querySnapshot.forEach(function(doc) {
                        posts.push(doc.data());
                    });
                    context.setState({posts: posts})
                })
        } else {
            firebase.firestore().collection("groups").doc(nextProps.group).collection("posts")
                .orderBy("timestamp", "desc").onSnapshot(function(querySnapshot) {
                    var posts = [];
                    querySnapshot.forEach(function(doc) {
                        posts.push(doc.data());
                    });
                    context.setState({posts: posts})
                })
        }
    }

    render() {
        return (
            <div>
                <div className="posts">

                    {this.state.posts.map((post) => (
                        <Post text={post.text} user={post.user} timestamp={post.timestamp}/>
                    ))}
                </div>
            </div>
        );
    }
}

export default Home