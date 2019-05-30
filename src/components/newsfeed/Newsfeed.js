// Authors: Carly and Jake

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire from '../../config/Fire';
import NewsFeedCard from "./NewsFeedCard";
import "./Newsfeed.css"
import TitleBar from "../nav/TitleBar"


class Newsfeed extends Component {

    render() {
        return (
            <>
                <TitleBar title="News Feed" />
                <div className="newsfeed--container">
                    <section className="newsfeed--list">
                        {
                            (this.props.newsfeed) ? (
                                this.props.newsfeed.map((item) => {
                                    console.log(item.type)
                                    let color;
                                    if (item.type === "article") {
                                        color = "lightblue"
                                    } else if (item.type === "event") {
                                        color = "lightgray"
                                    }
                                    return <NewsFeedCard key={item.id} newsItem={item} {...this.props} color={color} deleteNewsItem={this.props.deleteNewsItem} />
                                })
                            )
                                : null
                        }
                    </section>
                </div>
            </>
        );
    }
}
export default Newsfeed;
