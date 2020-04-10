import React/*, {useContext}*/ from 'react';
import './App.css';
import {Dropdown, Navbar, Nav, Form} from 'react-bootstrap'
import {Link} from 'react-router-dom'
//import AppContext from './context'

function Header() {
  //const context = useContext(AppContext)
  
  return (
      <div className="col-12 center" style={{backgroundColor:"white"}}>
        <Navbar bg="light" variant="light"  style={{paddingBottom: '5px'}}>          
          <Navbar.Brand href="#home">Analyze your fund</Navbar.Brand>
          <Nav className="mr-auto">
              <Link to="/">Home</Link> &nbsp;
              {/* <Link to="/about">About </Link> &nbsp;
              <Link to="/help">Help </Link> */}
          </Nav>
          

          <Form inline>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Welcome
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Log Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form>
          </Navbar>
      </div>
  );
}

export default Header;