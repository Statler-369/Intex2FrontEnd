import React/*, {useContext}*/ from 'react';
import './App.css';
import {
  Container,
  Row,
  Col
} from "react-bootstrap";
import { Link } from "react-router-dom";
//import AppContext from './context'

function RightBar() {
  //const context = useContext(AppContext)

  return (
    <div>
      <Container>
        <Row>
          <Col className='App' style={{ padding: '2rem' }}>
            <Link to={"/SearchForm"} className="btn btn-primary App">
              Search funds
              </Link>
          </Col>
        </Row>
        <Row>
        <Col className='App' style={{ padding: '2rem' }}>
          <Link to={"/PredictSuccess"} className="btn btn-primary App">
            Analyze your fund
          </Link>
        </Col>
        </Row>
      </Container>
    </div>
  );
}

export default RightBar;