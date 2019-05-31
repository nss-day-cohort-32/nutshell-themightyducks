import React, { Component } from 'react';


export default class ButtonDelete extends Component {



    render(){
        return <button className={`${this.props.className} delete-completed`} onClick={() => this.props.deleteCompleted()}>{this.props.text}</button>
    }

}