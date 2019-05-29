import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire from '../../config/Fire';
import NewsFeedCard from "./NewsFeedCard";
import "./Newsfeed.css"


class Newsfeed extends Component {

    render() {
        return (
            <div className="newsfeed--container">
            <h1>NewsFeed</h1>
            <section className="newsfeed--list">
                {
                    this.props.newsfeed.map((item) => {
                        console.log(item.type)
                        let color;
                        if (item.type === "article") {
                            color = "lightblue"
                        } else if (item.type === "event") {
                            color = "lightgray"
                        }
                        return <NewsFeedCard key={item.id} newsItem={item} {...this.props} color={color} />
                    })
                }
            </section>
            </div>
        );
    }
}
export default Newsfeed;
