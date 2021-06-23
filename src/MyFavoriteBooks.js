import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import {Card,Button} from 'react-bootstrap';
import "./myFavoriteBooks.css";
import axios from "axios";
// import { useAuth0 } from "@auth0/auth0-react";
import { withAuth0 } from "@auth0/auth0-react";
// import Carousel from "react-bootstrap/Carousel";
import BookFormModal from "./component/BookFormModal";

require("dotenv").config();

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      showModal: false,
      newBook:{}
    };
  }
  
  updateModal=()=>{
    this.setState({
      showModal:!this.state.showModal,
    });
  }
  getBookDataFromForm=(event)=>{
    event.preventDefault();
    
    const bookInfo2 = {
      name: event.target.name.value,
      description: event.target.description.value,
      status:event.target.status.value,
      email:this.props.auth0.user.email
    }
    let url=`http://localhost:3020/addbook`;
    
    axios.post(url,bookInfo2).then((result)=>{
      this.setState({
        data:result.data,
        
      })

    });
console.log(bookInfo2);
  }

  deleteBook = async(index)=>{
    const userName = {
      email:this.props.auth0.user.email
        }
    let result = await axios.delete(`http://localhost:3020/deletebook/${index}`,{ params: userName })
    this.setState({
      data:result.data
    })

  }
  componentDidMount = () => {
    let server = process.env.REACT_APP_SERVER_URL;
    let reqBookUrl = `http://localhost:3020/book?email=${this.props.auth0.user.email}`;
    console.log(server);
    console.log(this.props.auth0.user.email);
    console.log(reqBookUrl);
    axios.get(reqBookUrl).then((bookResult) => {
      let dataBook = bookResult.data;
      
      this.setState({
     data: dataBook
      })
      console.log('dataBook');
 
    });
    console.log(this.state.data);
    // console.log(this.state.data);
    // console.log(this.state.dataBook);
  };
  render() {
    // const { isAuthenticated } = this.props.auth0;
    return (
      <>
        {/* <Carousel fade> */}
          {/* {isAuthenticated && this.componentDidMount()} */}
          <Jumbotron>
            <h1>My Favorite Books</h1>
            <p>This is a collection of my favorite books</p>
          </Jumbotron>
           <BookFormModal updatBook={this.updateModal}  flag={this.state.showModal}
            bookInfo={this.getBookDataFromForm}/>
          {
            this.state.data.length !==0 &&
            this.state.data.map((item, indx) => {
              return (
                // <Carousel.Item key={indx} interval={1000}>
                //   <img
                //     className="d-block w-100"
                //     src={item.image}
                //     alt="slide"
                //   />
                //   <Carousel.Caption>
                //     <h3>{item.name}</h3>
                //     <p>{item.description}</p>
                //   </Carousel.Caption>
                // </Carousel.Item>
                <Card className="text-center" key={indx}>
  
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                  {item.description}
                  </Card.Text>
                  {/* <Card.Text>
                  {item.image}
                  </Card.Text> */}
                  <Button variant="primary"  onClick={()=>this.deleteBook(indx)}>Delete</Button>
                </Card.Body>
                <Card.Footer className="text-muted">{item.status}</Card.Footer>
              </Card>
              );
            })}
        {/* </Carousel> */}
      </>
    );
  }
}

export default withAuth0(MyFavoriteBooks);