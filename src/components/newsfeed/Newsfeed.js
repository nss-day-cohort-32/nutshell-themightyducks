import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire from '../../config/Fire';
import NewsFeedCard from "./NewsFeedCard";
import "./Newsfeed.css"


class Newsfeed extends Component {

    state = {
        color: ""
    }

    render() {

        if (this.props.newsfeed.type === "article") {
            this.setState({color: "lightblue"})
        } else if (this.props.newsfeed.type === "event") {
            this.setState({color: "lightgray"})
        }

        console.log("user", localStorage.getItem("user"))
        return (
            <div className="newsfeed--container">
            <h1>NewsFeed</h1>
            <section className="newsfeed--list">
                {
                    this.props.newsfeed.map((item) => {
                        console.log(item)
                        return <NewsFeedCard key={item.id} newsItem={item} {...this.props} color={this.state.color} />
                    })
                }
            </section>
            </div>
        );
    }
}
export default Newsfeed;
