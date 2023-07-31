import React from 'react';
import axios from 'axios';
import { Carousel, Button, Container, Image } from 'react-bootstrap';
import ErrorAlert from './ErrorAlert';
import BookFormModal from './BookFormModal';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [
        {
          title: 'test',
          description: 'test description',
          status: 'life-changing'
        },
        {
          title: 'test',
          description: 'test description',
          status: 'life-changing'
        }
      ],
      errorMessage: '',
      showForm: false,
      bookToBeUpdated: null
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  componentDidMount() {
    fetch(SERVER_URL + '/books')
    .then(res => res.json())
    .then(json => {
      console.log(json);
      this.setState({
        books: json
      });
    })
    .catch(err => {
      console.error(err);
    });
  }
  
  /**
   * Class 12 User story - adds a new book via backend API
   * @param {Book} newBook 
   */
  createBook = async (newBook) => {
    try {
      const config = {
        method: "post",
        baseURL: SERVER_URL,
        url: "/books/",
        // axios sends "data" in the request.body
        data: newBook,
      };

      const bookResults = await axios(config);

      const updatedBooks = [...this.state.books, bookResults.data];
      this.setState({ books: updatedBooks });

    } catch (error) {
      console.error("Error in BestBooks createBook: ", error);
      this.setState({
        errorMessage: `Status Code ${error.response.status}: ${error.response.data}`,
      });
    }
  };

  /**
   * Class 12 User Story - removes a book from state, sends request to backend API.
   * @param {Book} bookToBeDeleted 
   */
  deleteBook = async (bookToBeDeleted) => {
    try {
      const proceed = window.confirm(`Do you want to delete ${bookToBeDeleted.title}?`)

      if (proceed) {
        const config = {
          method: "delete",
          baseURL: SERVER_URL,
          url: `/books/${bookToBeDeleted._id}`,
        };

        await axios(config);

        let newBooks = this.state.books.filter((book) => book._id !== bookToBeDeleted._id);
        this.setState({ books: newBooks });
      }

    } catch (error) {
      console.error("Error in BestBooks deleteBook: ", error);
      this.setState({
        errorMessage: `Status Code ${error.response.status}: ${error.response.data}`,
      });
    }
  };

  /**
   * Class 13 User Story - Updates a book from our list.
   * @param {Book} updatedBook 
   */
  updateBook = async (updatedBook) => {
    console.log('Book to be updated: ', updatedBook);
    const config = {
      method: 'put',
      baseURL: SERVER_URL,
      url: `/books/${updatedBook._id}`,
      data: updatedBook
    };

    const updatedBookResult = await axios(config);

    const updatedBooks = this.state.books.map(book => {
      if (book._id === updatedBookResult.data._id) {
        return updatedBookResult.data;
      } else {
        return book;
      }
    });

    this.setState({ books: updatedBooks });
  };

  closeBookFormModal = () => this.setState({ showForm: false });
  selectBookToUpdate = (bookToBeUpdated) => this.setState({ bookToBeUpdated, showForm: true });
  closeError = () => this.setState({ errorMessage: "" });
  addABook = () => this.setState({ showForm: true, bookToBeUpdated: null });

  render() {
    /* TODO: render all the books in a Carousel */
    return (
      <>
        <h2 className="text-center">
          My Essential Lifelong Learning &amp; Formation Shelf
        </h2>

        <Button
          id="addBookButton"
          className="btn-lg"
          onClick={this.addABook}
        >
          Add a Book!
        </Button>

        {this.state.showForm && (
          <BookFormModal
            show={this.state.showForm}
            handleClose={this.closeBookFormModal}
            createBook={this.createBook}
            bookToBeUpdated={this.state.bookToBeUpdated}
            updateBook={this.updateBook}
          />
        )}

        <Container>
          {this.state.books.length ? (
            <Carousel id="carousel">
              {this.state.books.map((book, idx) => (
                <Carousel.Item key={book._id || idx}>
                  <Image
                    className="w-100"
                    id="carousel-image"
                    src="https://placehold.co/600x400"
                    alt={book.title}
                  />
                  <Carousel.Caption id="carousel-text-box">
                    <h2 className="carousel-text">{book.title}</h2>
                    <p className="carousel-text">{book.description}</p>
                    <p className="carousel-text">Status: {book.status}</p>
                    <Button variant="danger" onClick={() => this.deleteBook(book)}>
                      Delete
                    </Button>
                    <Button variant="secondary" onClick={() => this.selectBookToUpdate(book)}>
                      Update
                    </Button>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          ) : this.state.errorMessage.length ? (
            <ErrorAlert
              closeError={this.closeError}
              errorMessage={this.state.errorMessage}
            />
          ) : (
            // only render this if there are no books saved in the DB
            <h3 className="text-center">No Books Found :(</h3>
          )}
        </Container>
      </>
    );
  }
}

export default BestBooks;
