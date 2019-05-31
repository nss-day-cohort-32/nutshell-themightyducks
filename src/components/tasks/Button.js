import React, { Component } from 'react';


export default class Button extends Component {

    //const Button = ({className, text, setActiveFilter}) => {



    render() {

        return <button className={this.props.className(this.props.text)} onClick={() => this.props.setActiveFilter(this.props.text)}>{this.props.text}</button>

    }
}