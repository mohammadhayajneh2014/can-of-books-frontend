import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import { withAuth0 } from '@auth0/auth0-react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

//  import LoginButton from './loging/LoginButton';
//  import LogoutButton from './loging/LogoutButton';
 import  MyFavoriteBooks  from './myFavoriteBooks';
 import  Login  from './login';
 import Profile from './loging/profile';

class App extends React.Component {

  render() {
    console.log('app', this.props)
    return(
      <>
        <Router>
          {/* <IsLoadingAndError> */}
            <Header />
              <Switch>
                <Route exact path="/">
                  {/* TODO: if the user is logged in, render the `MyFavoriteBooks` component, if they are not, render the `Login` component */}
                  {this.props.auth0.isAuthenticated ? <MyFavoriteBooks /> : <Login />}
                  </Route>
                <Route path="/profile">
                {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
                  <Profile />
                  </Route>

              </Switch>
            <Footer />
          {/* </IsLoadingAndError> */}
        </Router>
      </>
    )
  }
}

export default withAuth0(App);
