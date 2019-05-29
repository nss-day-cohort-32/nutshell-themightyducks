import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import App from "../../App"
import TitleBar from "../nav/TitleBar"
import dbCalls from "../dbCalls/dbCalls"

import {
    Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText
} from 'reactstrap';


class Friends extends Component {



    render() {
        console.log("friends", this.props.friends)
        return (
            <>
                <TitleBar title="Friends" />
                {
                    (this.props.friends) ?
                        (this.props.friends.map(friend =>
                            <div key={friend.id}>
                                <h4>{friend.userName}</h4>
                            </div>)
                        ) : null

                }
            </>
        );
    }
}
export default Friends;
