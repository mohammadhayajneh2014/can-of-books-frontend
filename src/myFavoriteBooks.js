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
import UpdateBookForm from "./component/UpdateBookForm";

require("dotenv").config();

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      showModal: false,
      showUpdateModal:false,
      newBook:{},
      name:"",
      description:"",
      status:"",
      index:0,
      item:'',
    };
  }
  
  updateModal=()=>{
    this.setState({
      showModal:!this.state.showModal,
    });
  }
  
show=()=>{
  this.setState({
    showUpdateModal:!this.state.showUpdateModal,
  })
}


  setName = (e) => {
    this.setState({
     name: e.target.value
    })
  }

  setDescription = (e) => {
    this.setState({
      description: e.target.value
    })
  }
  setStatus = (e) => {
    this.setState({
      status: e.target.value
    })
  }
  getdataupdate=(idx,item)=>{
    console.log(idx,item);
    }
      updateONBook=async (idx,item)=>{
        console.log(idx);
        this.show();
       this.setState({
         name:item.name,
         description:item.description,
         item:item,
         index:idx
       })
      }
  updateBook = async(e) => {
    e.preventDefault();
  
    const bookData = {
      name: e.target.name.value,
      description: e.target.description.value,
      status:e.target.status.value,
      email:this.props.auth0.user.email
    }
console.log(bookData);
console.log('Im inside update and inex = ',this.state.index);
    let updatedBook = await axios.put(`http://localhost:3010/updateBook/${this.state.index}`,bookData)
   this.setState({
  data:updatedBook.data,
 })
 console.log(this.state.data);
  }
  getBookDataFromForm=(event)=>{
    event.preventDefault();
    
    const bookInfo2 = {
      name: event.target.name.value,
      description: event.target.description.value,
      status:event.target.status.value,
      email:this.props.auth0.user.email
    }

    let url=`http://localhost:3010/addbook`;
    
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
    let result = await axios.delete(`http://localhost:3010/deletebook/${index}`,{ params: userName })
    this.setState({
      data:result.data
    })

  }
  componentDidMount = () => {
    let server = process.env.REACT_APP_SERVER_URL;
    let bookReqUrl = `${server}/books?email=${this.props.auth0.user.email}`;
    console.log(server);
    console.log(this.props.auth0.user.email);
    axios.get(bookReqUrl).then((bookResult) => {
      let dataBook = bookResult.data;
      this.setState({
     data: dataBook
      })
 
    });
    
    // console.log(this.state.data);
    // console.log(this.state.dataBook);
  };
  render() {
    // const { isAuthenticated } = this.props.auth0;
    return (
      <>
          {/* {isAuthenticated && this.componentDidMount()} */}
          <Jumbotron>
            <h1>My Favorite Books</h1>
            <p>This is a collection of my favorite books</p>
          </Jumbotron>
           <BookFormModal updateBook={this.updateModal}  flag={this.state.showModal}
            bookInfo={this.getBookDataFromForm}/>
            {this.updateONBook &&
            <UpdateBookForm 
            item={this.state.item}
            show={this.show}
                     showUpdateModal={this.state.showUpdateModal}
            bookInfo={this.getBookDataFromForm}
            updateBook={this.updateBook}
            handleName={this.setName}
            handleDesc={this.setDescription}
            handleStatus={this.setStatus}
             />
            }
          {
            this.state.data.length !==0 &&
            this.state.data.map((item, indx) => {
              return (
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
                  <Button variant="primary"   onClick={()=>this.updateONBook(indx,item)}>Update</Button>
                </Card.Body>
                <Card.Footer className="text-muted">{item.status}</Card.Footer>
              </Card>
              );
            })}
      </>
    );
  }
}

export default withAuth0(MyFavoriteBooks);