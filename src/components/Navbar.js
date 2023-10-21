import React from 'react';
import {Navbar, Nav, Container, NavDropdown} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import logo from '../assets/images/logo.webp';
import {faUsersRectangle, faHandHoldingDollar, faHouseChimney, faBookOpen} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import { useLocation } from 'react-router-dom';
import {handleLink} from "../utils/navigationUtils";

export default function MyNavbar() {
    const { user, logout } = useAuth();
    const location  = useLocation()
    const externalRedirect = (url) => {
        window.location.href = url;
    }

    return (
        <Navbar collapseOnSelect sticky="top" variant={"dark"}  expand="md" className="transitioning-background-primary w-100 py-3">
            <Container className="px-0 mx-3" fluid>
                <LinkContainer to={"/"}>
                    <Navbar.Brand onClick={handleLink}>
                        <img src={logo} alt="Logo" width="60" height="60"/>
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav" >
                    <Nav className="w-100 me-auto">
                        <LinkContainer to="/">
                            <Nav.Link className="nav-link" onClick={handleLink} to={"/"}><FontAwesomeIcon icon={faHouseChimney}/> Home</Nav.Link>
                        </LinkContainer>
                        <NavDropdown onClick={handleLink} title="Get Involved" id="nav-dropdown" renderMenuOnMount={true} className={"my-0"}>
                            <NavDropdown.Item as={Link} to={"/activity/volunteer"} eventKey="4.1" >
                                    Volunteer
                            </NavDropdown.Item>
                            <NavDropdown.Item eventKey="4.2" as={Link} to={"/activity"}>
                                Our Activities
                            </NavDropdown.Item>
                        </NavDropdown>
                        <LinkContainer  onClick={handleLink} to="/about">
                            <Nav.Link onClick={handleLink} className="nav-link"><FontAwesomeIcon icon={faUsersRectangle}/> About Us</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/press">
                            <Nav.Link onClick={handleLink} className="nav-link "><FontAwesomeIcon icon={faBookOpen} /> Press</Nav.Link>
                        </LinkContainer>
                        <LinkContainer  to="" onClick={(e) => { e.preventDefault(); externalRedirect("https://donorbox.org/welfare-avenue"); }}  className={"bg-secondary"}>
                            <Nav.Link onClick={handleLink} className="nav-link rounded-5 text-light" ><FontAwesomeIcon icon={faHandHoldingDollar} className={"text-light"} /> Donate</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    {user ? (
                        <Nav className={"profile-dropdown"}>
                            <NavDropdown title={user?.firstName}  className={"my-0"}>
                                <NavDropdown.Item as={Link} to={"/user-profile"} eventKey="5.1"  className={"text-right"}>
                                    Profile
                                </NavDropdown.Item>
                                <NavDropdown.Item eventKey="5.2" as={Link} onClick={e => {
                                    logout();
                                    handleLink();
                                }} to={`${location.pathname}`} className={"text-right"}>
                                    Log Out
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    ) : (
                        <Nav>
                            <Link to="/signup" state={{from: `${location.pathname}`}} className={"navbar-links single-line-link"} onClick={handleLink}>Sign Up</Link>
                            <Link to="/signin" state={{from: `${location.pathname}`}} className={"navbar-links single-line-link"} onClick={handleLink}>Sign In</Link>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
        );
    }
