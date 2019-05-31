// Authors: Carly and Jake

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire from '../../config/Fire';
import NewsFeedCard from "./NewsFeedCard";
import "./Newsfeed.css"
import TitleBar from "../nav/TitleBar"
import AddFormModal from './addFormModal';


class Newsfeed extends Component {
    state = {
        newsItem: []
    }

    getNewsItem = (event, newsItem) => {
        this.setState({ newsItem: newsItem })
    }

    state = {
        newsItem: []
    }

    getNewsItem = (event, newsItem) => {
        this.setState({ newsItem: newsItem })
    }

    render() {
        const newArray = [];
        return (
            <>
                <TitleBar title="News Feed" />
                <div className="newsfeed--container">
                    <AddFormModal currentUserId={this.props.currentUserId} addNewsfeed={this.props.addNewsfeed} toggle={this.props.toggle} modal={this.props.modal} newsfeed={this.props.newsfeed} handleSelect={this.props.handleSelect} formtype={this.props.formtype} handleDbleClick={this.props.handleDbleClick} newsItem={this.state.newsItem} getSetAndPushNewsfeed={this.props.getSetAndPushNewsfeed} />
                    <section className="newsfeed--list">
                        {
                            (this.props.newsfeed) ? (
                                this.props.newsfeed.sort((a, b) => { return Date.parse(b.eventDate) - Date.parse(a.eventDate) }).map((item) => {
                                    let color;
                                    if (item.type === "article") {
                                        color = "#2CB79C"
                                    } else if (item.type === "event") {
                                        color = "#C0C0C0"
                                    }
                                    return <NewsFeedCard key={item.id} newsItem={item} {...this.props} color={color} deleteNewsItem={this.props.deleteNewsItem} toggle={this.props.toggle} modal={this.props.modal} handleSelect={this.props.handleSelect} formtype={this.props.formtype} handleDbleClick={this.props.handleDbleClick} getNewsItem={this.getNewsItem} />
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
