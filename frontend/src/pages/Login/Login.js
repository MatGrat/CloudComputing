import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event);
  }

  return (
    <Form onSubmit={handleSubmit}>
    <h1>Anmeldung</h1>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Benutzername</Form.Label>
        <Form.Control placeholder="MaxMustermann" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
      <Button variant="link" href="/register">Neu hier?</Button>
    </Form>
  );
}

export default Login;