import React, { Component } from 'react';
import Button from "./Button"
import ButtonDelete from "./ButtonDelete"


export default class Footer extends Component {



    isActive = (text) => {
        let filter = this.props.filter === text ? "active" : "";
        return `footer__button ${filter}`
    }

    render() {
        console.log("FOOTER")
        return (
            <footer className="footer">
                <Button className={this.isActive}  text="All" setActiveFilter={this.props.setActiveFilter} />
                <Button className={this.isActive} text="Active" setActiveFilter={this.props.setActiveFilter}/>
                <Button className={this.isActive}  text="Completed" setActiveFilter={this.props.setActiveFilter}/>
                <ButtonDelete className={"footer__button"} deleteCompleted={this.props.deleteCompleted} text="Delete completed"  />
            </footer>
        )
    }
}