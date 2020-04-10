import React, { useContext } from 'react';
import './App.css';
import AppContext from './context'
import {
  Row,
  Col,
  Container
} from "react-bootstrap";
import { useRouteMatch } from 'react-router-dom'
import axios from 'axios'


export default function Details(props) {
  const context = useContext(AppContext)
  const match = useRouteMatch()
  const pageDetails = Object.values(context.campaigns).find(c => c.campaign_id === match.params.id.toString())
  let [quartile, setQuartile] = React.useState('')
  let [fraud, setFraud] = React.useState('')
  

  axios.post('https://goanalyzeme.herokuapp.com/api/prediction/', {
    input1: {
      goal: pageDetails.goal,
      title: pageDetails.title,
      description: pageDetails.description,
      has_beneficiary: pageDetails.has_beneficiary,
      visible_in_search: (pageDetails.has_beneficiary === "TRUE" ? '1' : '0'), // change this later
      location_country: pageDetails.location_country,
      charity_valid: (pageDetails.charity_valid === "TRUE" ? '1' : '0'), // Change later
      quartile: ''
    }
  })
    .then(function (response) {
      setQuartile(response.data['Results']['output1'][0]['Scored Labels'])
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.post('https://goanalyzeme.herokuapp.com/api/fraud/', {
      input1: {
        auto_fb_post_mode: (pageDetails.auto_fb_post_mode === "TRUE" ? '1' : '0'),
        current_amount: pageDetails.current_amount,
        goal: pageDetails.goal,
        donators: pageDetails.donators,
        days_active: pageDetails.days_active,
        title: pageDetails.title,
        description: pageDetails.donators,
        has_beneficiary: pageDetails.has_beneficiary,
        deactivated: pageDetails.deactivated,// change this later
        campaign_hearts: pageDetails.campaign_hearts,
        social_share_total: pageDetails.social_share_total,
        location_country: pageDetails.location_country,
        is_charity: pageDetails.is_charity,
        charity_valid: (pageDetails.charity_valid === "TRUE" ? '1' : '0') //change this later
      }
    })
      .then(function (response) {
        setFraud(response.data['Results']['output1'][0]["Scored Labels"])
      })
      .catch(function (error) {
        console.log(error);
      });
  //If the product is not found, display that on the page.
  if (pageDetails == null) {
    return (
      <h4>
        Product Not Found
      </h4>
    )
  }
  else {
    let message = ''
    if(quartile === "awful")
      {message='Needs work'}
    else if(quartile === "decent")
      {message='Good work'}
    else{message='Excellent work'}
    return (
      <div>
        <Container style={{ margin: '2rem' }}>
          <h2>Title: {pageDetails['title']}</h2>
          <h4>Posted by {pageDetails['user_first_name']} {pageDetails['user_last_name']}</h4>
          <Row>
            <Col md='11'>
              <img src={pageDetails['campaign_image_url']} style={{ height: '15rem' }} alt='Campaign' />
              <h5>Description:</h5>
              {pageDetails['description']}
            </Col>
          </Row>
          <Row className='p-3'>
            <Col md='5'>
              <h5>Analysis</h5>
              <ul>
                <li>Goal: ${pageDetails['goal']}</li>
                <li>Total donors: {pageDetails['donators']}</li>
                <li>Raised: ${pageDetails['current_amount']}</li>
                <li>Average Raised per donor: ${(pageDetails['current_amount'] / pageDetails['donators']).toFixed(2)}</li>
                <li>Grade:
                  {message}
                </li>
                <li>{(fraud === true) ? 'Needs approval': 'Secure fund'}</li>
              </ul>
            </Col>
            <Col md=''>
              <h5>Other Details</h5>
              <ul>
                <li>Campaign URL: <a href={pageDetails['url']}>{pageDetails['url']}</a></li>
                <li>Location: {pageDetails['location_city']} {pageDetails['location_country']}</li>
                <li>Date Collected: {pageDetails['collected_date']}</li>
                <li>Days active: {pageDetails['days_active']}</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}