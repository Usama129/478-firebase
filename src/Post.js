import React, {Component} from 'react';
import './css/Post.css'

class Post extends Component {

    constructor(props){
        super(props)
    }

    render() {
        return (
            <div className="post">
                <div className="pane">
                    <img className="icon"
                        src="https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/256x256/plain/user.png"/>
                    <h5 className="username">{this.props.user}</h5>
                    <p className="timestamp">{this.props.timestamp}</p>
                </div>
                <p className="text">{this.props.text}</p>
            </div>
        )
    }
}

export default Post;