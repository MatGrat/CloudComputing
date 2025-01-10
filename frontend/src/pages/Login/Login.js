import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

  }

  return (
    <Form onSubmit={handleSubmit}>
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
  );
}

export default Login;