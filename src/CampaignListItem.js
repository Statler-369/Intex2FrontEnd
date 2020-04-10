import React from 'react';
import './App.css';
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";


function CampaignListItem(props) {
  // Pass the campaign in from props.

  return (
    <div>
      <Card style={{margin: '2rem'}}>
        <Card.Header as="h5">{props.campaign['title']}</Card.Header>
        <Card.Body>
          <Card.Title>Posted by {props.campaign['user_first_name']}&nbsp;{props.campaign['user_last_name']}</Card.Title>
          <Card.Text className='CardText'>
            <img src={props.campaign['campaign_image_url']} alt='Campaign'/>
            {props.campaign['description']}
          </Card.Text>
          <Card.Text style={{color: 'lightgrey'}}>
            Click to read more...
          </Card.Text>
          <Link to={"/Details/" + props.campaign['campaign_id']} className="btn btn-primary">
            View Details
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CampaignListItem;