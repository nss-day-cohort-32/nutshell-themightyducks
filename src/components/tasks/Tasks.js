import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire from '../../config/Fire';
import TitleBar from "../nav/TitleBar"

class Tasks extends Component {


    render() {
        return (
            <>
                <TitleBar title="Tasks" />
                <h1>Tasks Page</h1>
            </>
        );
    }
}
export default Tasks;
