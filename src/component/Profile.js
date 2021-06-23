
import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';

class Profile extends Component {
  render() {
    const { user,isAuthenticated } = this.props.auth0;
    console.log(user);
    return (
        <>
        <Jumbotron>
        {isAuthenticated && <div><img src={user.picture} alt="profile"></img> </div>}
        {isAuthenticated && <h3> Hello  {user.name}</h3>}
        {isAuthenticated && <h3>Email: {user.email}</h3>}
        </Jumbotron>
        </>
    )
    ;
  }
}

export default withAuth0(Profile);

