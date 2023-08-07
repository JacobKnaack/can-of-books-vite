import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';

class Welcome extends React.Component {
  render() {
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Log In</Card.Title>
          <Card.Text>
            Click the button in the header to login and start cataloguing your books!
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default Welcome;
