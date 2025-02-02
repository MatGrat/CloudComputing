import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { GetUsers } from '../../hooks/user-hook';

function Login() {
  const {data: users, loading, error } = GetUsers();
  const navigate = useNavigate();

  if (loading) {
    console.log('Lädt user...');
    return;
  }

  if (error) {
    console.error('Error:', error);
    return;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
   
    const userName = formData.get('userName');
    const userPassword = formData.get('userPassword');

    const foundUser = users.find((user) => user.UserName === userName && user.UserPassword === userPassword);

    if (foundUser) {
      document.cookie = `loggedUser=${foundUser.UserID}; path=/;`;
      navigate(`/account/${foundUser.UserID}`);
    } else {
      console.error('Ungültiger Benutzername oder Passwort.');
    }
  }

  return (
    <div style={{backgroundColor: '#97c0ff'}}>
      <Form onSubmit={handleSubmit} style={{backgroundColor: '#ffffff'}}>
    <h1>Anmeldung</h1>
      <Form.Group className="mb-3" controlId="userName">
        <Form.Label>Benutzername</Form.Label>
        <Form.Control name="userName" placeholder="MaxMustermann" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="userPassword">
        <Form.Label>Passwort</Form.Label>
        <Form.Control name="userPassword" type="password" placeholder="Passwort" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
      <Button variant="link" href="/register">Neu hier?</Button>
    </Form>
    </div>
  );
}

export default Login;