import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire from '../../config/Fire';
import TitleBar from "../nav/TitleBar"

class Newsfeed extends Component {


    render() {
        //console.log("user", localStorage.getItem("user"))
        // console.log("Newsfeed")
        return (
            <>
                <TitleBar title="News Feed" />
                <h1>Working Newsfeed Page</h1>
            </>
        );
    }
}
export default Newsfeed;
