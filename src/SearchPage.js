import React, { useContext } from 'react';
import './App.css';
import AppContext from './context'
import { Formik } from 'formik'
import CampaignListItem from './CampaignListItem'
import {
    Row,
    Container,
    Col,
    Card,
    Button
} from "react-bootstrap";
import FieldForm from './SearchForm'



function SearchPage(props) {
    const context = useContext(AppContext)
    let [searchResults, setSearchResults] = React.useState([])
    return (
        <div>
            <Container>
                <Row>
                    <Col md='6'>
                        <Card style={{padding: '1rem', margin: '1rem'}}>
                            <h3>Search for Funds</h3>
                            <Formik
                                initialValues={{
                                    keyword: '',
                                    location: ''
                                }}
                                validateOnChange={false}
                                validateOnBlur={false}
                                validate={values => {
                                    console.log('validating', values)
                                    return {}
                                }}
                                onSubmit={async (values, actions) => {
                                    console.log('submit', values)
                                    setSearchResults(context.performSearches(values))
                                    console.log('Arrived to page: ', searchResults)
                                    actions.setSubmitting(false)
                                }}
                            >{form => (
                                <>
                                    <FieldForm form={form} />
                                </>
                            )}</Formik>
                        </Card>
                    </Col>
                    <Col md='6'>
                        <Card style={{padding: '1rem', margin: '1rem'}}>
                            <h3>Filter Funds</h3>
                            <Row style={{ padding: "1rem" }} className='App'>
                                <Col md='6'>
                                    <Button variant='primary' onClick={e => {setSearchResults(filterArr(context.campaigns, 'totMoney'))}}>Money Raised</Button>
                                </Col>
                                <Col md='6'>
                                    <Button variant='primary' onClick={e => {setSearchResults(filterArr(context.campaigns, 'donorCount'))}}>Donor Count</Button>
                                </Col>
                            </Row>
                            <Row style={{ padding: "1rem" }} className='App'>
                                <Col md='6'>
                                    <Button variant='primary' onClick={e => {setSearchResults(filterArr(context.campaigns, 'avgDonation'))}}>Money per Donor</Button>
                                </Col>
                                <Col md='6'>
                                    <Button variant='primary' onClick={e => {setSearchResults(filterArr(context.campaigns, 'dayMoney'))}}>Money per Day</Button>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
            {
                searchResults.map(camp => {
                    return <CampaignListItem campaign={camp} key={camp['campaign_id']} />
                })
            }
        </div>
    )
}

export default SearchPage;

function filterArr(baseArr, filterType){
    let returnArr = []
    if(filterType ==='totMoney'){
        returnArr = moneyRaised(baseArr)
    }
    else if(filterType ==='donorCount'){
        returnArr = donorCount(baseArr)
    }
    else if(filterType ==='avgDonation'){
        returnArr = avgDonation(baseArr)
    }
    else if(filterType ==='dayMoney'){
        returnArr = dayMoney(baseArr)
    }

    return returnArr
}

const moneyRaised = (baseArr) => {
    baseArr.map(camp=>{
        return camp['current_amount'] = parseInt(camp['current_amount'])
    })
    
    return baseArr.sort((a, b) => {return b['current_amount'] - a['current_amount']}).slice(0,9)
}

const donorCount = (baseArr) => {
    baseArr.map(camp=>{
        return camp['donators'] = parseInt(camp['donators'])
    })

    return baseArr.sort((a, b) => {return b['donators'] - a['donators']}).slice(0,9)
}

const avgDonation = (baseArr) => {
    baseArr.map(camp=>{
        camp['current_amount'] = parseInt(camp['current_amount'])
        return camp['donators'] = parseInt(camp['donators'])
    })
    
    return baseArr.sort((a, b) => {return (b['current_amount'] / b['donators']) - (a['current_amount'] / a['donators'])}).slice(0,9)
}

const dayMoney = (baseArr) => {
    baseArr.map(camp=>{
        camp['current_amount'] = parseInt(camp['current_amount'])
        return camp['days_active'] = parseInt(camp['days_active'])
    })
    
    return baseArr.sort((a, b) => {return (b['current_amount'] / b['days_active']) - (a['current_amount'] / a['days_active'])}).slice(0,9)
}