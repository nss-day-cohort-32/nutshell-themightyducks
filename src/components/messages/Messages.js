import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire from '../../config/Fire';
import TitleBar from "../nav/TitleBar"

class Messages extends Component {


    render() {
        return (
            <>
                <TitleBar title="Messages" />
                <h1>Working Messages page</h1>
            </>
        );
    }
}
export default Messages;
