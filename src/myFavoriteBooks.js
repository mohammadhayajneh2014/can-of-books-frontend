import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './myFavoriteBooks.css';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import { withAuth0 } from '@auth0/auth0-react';

class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bookData: [],
      email: ''


    };

  }

  componentDidMount = () => {


    // const paramsObj = {
    //   email: this.props.auth0.user.email
    // }
    let server = process.env.REACT_APP_SERVER_URL;
    let bookUrl = `${server}/books?email=${this.props.auth0.user.email}`;


    axios.get(bookUrl).then((bookResult) => {
      let dataBook = bookResult.data;
      this.setState({
        bookData: dataBook
      })
    });

  }

  render() {
   
    return (
      <>
        
        <Jumbotron>


        </Jumbotron>
        <Carousel>
          {this.state.bookData.map((item) => (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={item.status}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))


          }
        </Carousel>
      </>

    )
  }
}

export default withAuth0(MyFavoriteBooks);
