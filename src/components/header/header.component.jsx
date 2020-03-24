import React from 'react';
import './header.style.scss';
import {Container ,  Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Route, Link } from 'react-router-dom';
import {auth} from './../../firebase/firebase.utils';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt , faSignOutAlt  } from '@fortawesome/free-solid-svg-icons';


const Header = ({currentUser , id}) => (

    <React.Fragment>

        <Navbar className="navbar" expand="lg">
            <Container>
              
                
            <Navbar.Brand className="logo-txt"   href="/">صنعتنا</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link className="mr-2" href="/">الرئيسية</Nav.Link>
                    <Nav.Link className="mr-2" href="/crafts">الحرفيين</Nav.Link>
                    <Nav.Link href="/signin">
                        المنشورات
                    </Nav.Link>
                    <Nav.Link className="mr-2" href="/signin">
                        تواصل معنا
                    </Nav.Link>
                    <Nav.Link className="mr-2" href="/signin">
                        الخدمات
                    </Nav.Link>
                    <Nav.Link className="mr-2" href="/about">
                        عن التطبيق
                    </Nav.Link>
                    {currentUser ? 
                    <Nav.Link className="mr-2" onClick={() => auth.signOut()} >
                        تسجيل الخروج
                        <FontAwesomeIcon icon={faSignOutAlt} size="lg" transform="left-4" />
                    </Nav.Link>
                    :
                    <Nav.Link className="mr-2" href="/signin"> 
                        تسجيل الدخول 
                        <FontAwesomeIcon icon={faSignInAlt} size="lg" transform="left-4" />
                    </Nav.Link> 
                }
                </Nav>
            </Navbar.Collapse>
            
            </Container>
        </Navbar>
    </React.Fragment>

)



const mapStateToProps = state => {
    return {
        currentUser:state.user.currentUser
    }
}


export default connect(mapStateToProps)(Header);