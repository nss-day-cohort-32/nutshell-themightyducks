import React from 'react';
import { Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Route, Redirect, withRouter } from "react-router-dom"

const NewsFeedCard = (props) => {

  const newsItemId = props.newsItem.id

  return (
      <Card style={{ backgroundColor: props.color }}
      // onDoubleClick={this.props.history.push("/NewsFeed/edit")}
      >
        <CardBody>
          <CardTitle>{props.newsItem.title}</CardTitle>
          <CardText>{props.newsItem.description}</CardText>
          <CardSubtitle>{props.newsItem.location}</CardSubtitle>
          <CardSubtitle>{props.newsItem.eventDate}</CardSubtitle>
          <CardLink href={props.newsItem.url} target="_blank">{props.newsItem.type} Link</CardLink>
          <section className="newsItem--buttons">
            <Button className="newsItem--delete-btn"
                    onClick={() => props.deleteNewsItem("newsfeed", newsItemId)}
                    >Delete</Button>
          </section>
        </CardBody>
      </Card>
  );
};

export default NewsFeedCard;