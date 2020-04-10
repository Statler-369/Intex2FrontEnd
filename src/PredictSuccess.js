import React, { Component } from 'react';
import axios from 'axios'
import {
    Container,
    Row,
    Col,
    Card
  } from "react-bootstrap";

class PredictSuccess extends Component {
    constructor() {
        super();
        this.state = {
            goal: 10000,
            title: 'Make Me a Millionaire',
            description: 'I want to be one of the youngest white male millionaires. Help me achieve my goal.',
            has_beneficiary: 0,
            visible_in_search: 0,
            location_country: 'US',
            charity_valid: 0,
            quartile: '',
        };
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit.bind = this.onSubmit.bind(this)
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        let self = this
        axios.post('https://goanalyzeme.herokuapp.com/api/prediction/', {
            input1: this.state
          })
          .then(function (response) {
            
            self.setState({quartile: response.data['Results']['output1'][0]['Scored Labels']})
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col md='7'>
                            <Card style={{padding: '1rem', margin: '1rem'}}>
                                <h3>Input your campaign info here:</h3>
                                <form onSubmit={this.onSubmit} >
                                    <label htmlFor="goal">Goal:&nbsp;$ </label>
                                    <input
                                        id="goal"
                                        name="goal"
                                        value={this.state.goal}
                                        onChange={this.handleChange}
                                        placeholder="Goal"
                                    /><br />


                                    <label htmlFor="title">Title:&nbsp; </label>
                                    <input
                                        id="title"
                                        name="title"
                                        value={this.state.title}
                                        onChange={this.handleChange}
                                        placeholder="Title"
                                    /><br />


                                    <label htmlFor="description">Description:&nbsp; </label><br />
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.handleChange}
                                        placeholder="Text here"
                                    /><br />


                                    <h6>Does your campaign have a beneficiary?</h6>
                                    <label htmlFor="has_bene">Yes</label>
                                    <input type="radio" id="has_bene" name="has_beneficiary" value="1" defaultChecked />
                                    <label htmlFor="no_bene"> &nbsp; No </label>
                                    <input type="radio" id="no_bene" name="has_beneficiary" value="0" />
                                    <br />


                                    <h6>Will your campaign be visible to searchers?</h6>
                                    <label htmlFor="visible">Yes</label>
                                    <input type="radio" id="visible" name="visible_in_search" value="1" defaultChecked />
                                    <label htmlFor="invisible"> &nbsp; No</label>
                                    <input type="radio" id="invisible" name="visible_in_search" value="0" />
                                    <br />


                                    <label htmlFor="country">Select your country:&nbsp; </label>
                                    <CountryList
                                        id="country"
                                        name="location_country"
                                        value={this.state.location_country}
                                        onChange={this.handleChange}
                                        placeholder="Country"
                                    /><br />


                                    <h6>Is this campaign hosted by a registered charity?</h6>
                                    <label htmlFor="hosted">Yes</label>
                                    <input type="radio" id="hosted" name="charity_valid" value="1" defaultChecked />
                                    <label htmlFor="not_hosted"> &nbsp; No</label>
                                    <input type="radio" id="not_hosted" name="charity_valid" value="0" /><br />
                                    <br />

                                    <button>Submit</button>
                                </form>
                            </Card>
                        </Col>
                        <Col className='App'>
                            <Card style={{padding: '1rem', margin: '1rem'}}>
                                <h3>Your campaign will be:</h3>
                                <h2>{this.state.quartile}</h2>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

        )
    }
}
export default PredictSuccess;

const CountryList = props => {
    return(
        <select id="country" name={props.name} value={props.value} onChange={props.onChange} placeholder={props.placeholder}>
            <option value="US">United States of America</option>
            <option value="IT">Italy</option>
            <option value="GB">United Kingdom</option>
            <option value="CA">Canada</option>
            <option value="DE">Germany</option>
            <option value="NL">Netherlands</option>
            <option value="ES">Spain</option>
            <option value="AU">Australia</option>
            <option value="IE">Ireland</option>
            <option value="FR">France</option>
            <option value="BE">Belgium</option>
            <option value="CH">Switzerland</option>
            <option value="SE">Sweden</option>
            <option value="PT">Portugal</option>
            <option value="NO">Norway</option>
        </select>
    )
}