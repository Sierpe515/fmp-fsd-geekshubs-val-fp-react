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
import logo2 from "../../image/logo2.png"

export const NavBar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataCredentialsRdx = useSelector(userData);

  // FUNCTION TO CLEAR REDUX AT LOGOUT
  const logOut = () => {
    dispatch(clearRedux());
    setTimeout(() => {
      navigate("/");
    }, 500);
  }

  return (
    <Navbar className='navBarDesign' expand="lg">
      <Container fluid className='navBarBox'>
        <Navbar.Brand className='nBScroll' href="#">
          <img className='logo2' src={logo2} alt="" />
          Oniria</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" className='nBScroll' />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link className='navWhite' as={Link} to='/'>Home</Nav.Link>
            {/* TERNARY TO DETECT ADMIN AND GIVE ACCESS TO ADMIN AREA */}
            {dataCredentialsRdx.credentials.token ? (
              dataCredentialsRdx.credentials.userRole?.includes('Admin') ? (
                <>
                <NavDropdown title="Admin Area" id="navbarScrollingDropdown2">
                  <NavDropdown.Item eventKey="1"><Link as={Link} to='/usersList'>
                    Users List</Link>
                  </NavDropdown.Item>
                </NavDropdown>
                </>
              ):('')
            ) : ("")}
          </Nav>
          <Nav>
            {/* TERNARY TO DETECT LOGGED USER */}
            {dataCredentialsRdx.credentials.token ? (
                <DropdownButton
                  align="end"
                  title={dataCredentialsRdx.credentials.userName}
                  id="dropdown-menu-align-end"
                >
                  <Dropdown.Item eventKey="2"><Link as={Link} to='/profile'>Profile</Link></Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="3" onClick={() => {logOut()}}>Log Out</Dropdown.Item>
                </DropdownButton>
                
              ) : (
                <>
              <Nav.Link className='navWhite' as={Link} to='/register'>Register</Nav.Link>
              <Nav.Link className='navWhite' as={Link} to='/login'>Login</Nav.Link>
              </>
              )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
