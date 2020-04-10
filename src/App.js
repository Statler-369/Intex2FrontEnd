import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {Col, Row, Container, Card} from 'react-bootstrap';
import {
        BrowserRouter as Router,
        Switch,
        Route
      } from "react-router-dom";
import Header from './Header';
import LeftBar from './LeftBar';
import HomePage from './HomePage';
import RightBar from './RightBar';
import Footer from './Footer';
import Details from './Details';
import SearchPage from './SearchPage';
import PredictSuccess from './PredictSuccess'


function App() {
  return (
    <div>
      <Router>
        <Container fluid="true" className="p-0 min-vh-100 d-flex flex-column">
          <Row noGutters fluid="true" className="flex-grow-0.5 flex-shrink-1 shadow-sm">
            <Col className="px-3 py-2">
              <Header />
            </Col>
          </Row>
          <Row noGutters className="flex-grow-1">
            <Col className="px-3 py-4" style={{border: "1px solid lightgrey"}}>
              <LeftBar />
            </Col>
            <Col md="8">
              <Card style={{backgroundColor:"lightgrey"}}>
                <Switch>
                  <Route path="/Details/:id">
                    <Details />
                  </Route>
                  <Route path="/SearchForm">
                    <SearchPage />
                  </Route>
                  <Route path="/PredictSuccess">
                    <PredictSuccess />
                  </Route>
                  <Route path="/">
                    <HomePage />
                  </Route>
                </Switch>
              </Card>     
            </Col>
            <Col style={{border: "1px solid lightgrey"}}>
              <RightBar />
            </Col>        
          </Row>
          <Row className="flex-grow-1">
            <Col>
              <Footer />
            </Col>
          </Row>
        </Container>
        
      </Router>
    </div>
    
  );
}

export default App;