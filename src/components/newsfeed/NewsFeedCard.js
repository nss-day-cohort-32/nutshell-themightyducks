import React from 'react';
import {
  Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

const NewsFeedCard = (props) => {

  return (
    <Card style={{ backgroundColor: props.color }}>
      <CardBody className="newsfeed-card">
        <CardTitle>{props.newsItem.title}</CardTitle>
        <CardText>{props.newsItem.description}</CardText>
        <CardSubtitle>{props.newsItem.location}</CardSubtitle>
        <CardSubtitle>{props.newsItem.eventDate}</CardSubtitle>
        <CardLink href={props.newsItem.url} target="_blank">{props.newsItem.type} Link</CardLink>
        <section className="newsItem--buttons">
          <Button className="newsItem--edit-btn">Edit</Button>
          <Button className="newsItem--delete-btn">Delete</Button>
        </section>
      </CardBody>
    </Card>
  );
};

export default NewsFeedCard;