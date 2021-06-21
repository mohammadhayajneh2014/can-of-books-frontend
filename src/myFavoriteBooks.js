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
      email: '',
      server: process.env.REACT_APP_SERVER_URL

    }

  }

   componentDidMount = async () => {
    
    try {
      const paramsObj = {
        email: this.props.auth0.user.email
      }

       const books = await axios.get(`${this.state.server}/books`, { params: paramsObj });
        //  const books = await axios.get(`${this.state.server}/books?email=mohammadhayagneh96@gmail.com`);
      this.setState({
        bookData: books.data
        
      });
      console.log(`this is books${this.bookData}`);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
//  const{isAuthenticated}=this.props.auth0;
    return (
      <>
      {/* { {isAuthenticated && this.componentDidMount() }  */}
      <Jumbotron>
       
        
      </Jumbotron>
      <Carousel>
        {this.bookData.map((item)=>(
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
