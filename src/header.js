import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { withAuth0 } from "@auth0/auth0-react";
import "./header.css";
import LoginButton from "./component/LoginButton";
import LogoutButton from "./component/LogoutButton";

class Header extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth0;
    return (
      <>
      
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        {/* TODO: if the user is logged in, render the `LogoutButton` - if the user is logged out, render the `LoginButton` */}
        {!isAuthenticated ? <LoginButton /> : <LogoutButton />}
        
      </Navbar>
      </>
    );
  }
}

export default withAuth0(Header);
