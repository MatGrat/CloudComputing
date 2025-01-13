import { useParams } from "react-router-dom";
import { GetUser } from '../../hooks/user-hook';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Account() {
  const { id } = useParams();
  const {data: user, loading, error } = GetUser(id);
  
  if(loading) return <p>Loading...</p>;
  if(error) return <p>Error: {error}</p>;
  

  return (
      <CardGroup>
      <Card>
          <Card.Header>{user.UserName}</Card.Header>
          <Card.Body>
            <br/>
            {user.UserFirstName}
            <br/>
            {user.UserLastName}
            <br/>
            {user.UserMail}
            <br/>
            {user.UserStreet}
            <br/>
            {user.UserZIP} {user.UserCity}
            <br/>
          </Card.Body>
          <Card.Footer>
            <Button variant="primary">
                  Daten Ändern
            </Button>
          </Card.Footer>
      </Card>
      <Card>
        <Card.Header>Bestell-Historie:</Card.Header>
        <Card.Body>
          <Card.Text>
            
          </Card.Text>
        </Card.Body>
        <Card.Footer>
            <Button variant="primary">
              Logout
            </Button>
          </Card.Footer>
      </Card>
    </CardGroup>
  );
  }
  
  export default Account;