import React from 'react'
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import NavDropdown from 'react-bootstrap/NavDropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './NavBar.css'
import { useDispatch, useSelector } from "react-redux";
import { userData, clearRedux } from '../../layout/userSlice';
import { useNavigate } from "react-router-dom";

export const NavBar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataCredentialsRdx = useSelector(userData);

  const logOut = () => {
    // dispatch(logout(dataCredentialsRdx = ""));
    dispatch(clearRedux());
    setTimeout(() => {
      navigate("/");
    }, 500);
  }

  return (
    <Navbar className='navBarDesign' expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to='/'>Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            {dataCredentialsRdx.credentials.token ? (
              dataCredentialsRdx.credentials.userRole?.includes('Admin') ? (
                <>
                <NavDropdown title="Admin Area" id="navbarScrollingDropdown2">
                  <NavDropdown.Item eventKey="7"><Link as={Link} to='/usersList'>
                    Users List</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="9"><Link as={Link} to='/appointments'>
                    Appointments</Link>
                  </NavDropdown.Item>
                </NavDropdown>
                </>
              ):('')
            ) : ("")}
          </Nav>
          <Nav>
            {dataCredentialsRdx.credentials.token ? (
                <DropdownButton
                  align="end"
                  title="User"
                  id="dropdown-menu-align-end"
                >
                  {/* <Dropdown.Item eventKey="4"><Link as={Link} to='/profile'>Profile</Link></Dropdown.Item>
                  <Dropdown.Item eventKey="5"><Link as={Link} to='/appointmentsUser'>Appointments</Link></Dropdown.Item> */}
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="6" onClick={() => {logOut()}}>Log Out</Dropdown.Item>
                </DropdownButton>
                
              ) : (
                <>
              <Nav.Link as={Link} to='/register'>Register</Nav.Link>
              <Nav.Link as={Link} to='/login'>Login</Nav.Link>
              </>
              )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
