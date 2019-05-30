import React, { Component } from "react"

class TitleBar extends Component {

    render() {
        return (
            <div id="titleBar">
                <h4 align="center">{this.props.title}</h4>
            </div>
        );
    }
}


export default TitleBar