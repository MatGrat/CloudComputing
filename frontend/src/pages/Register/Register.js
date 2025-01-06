import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { CreateUser } from '../../hooks/user-hook';

function Register() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    CreateUser(
      formData.get('userName'),
      formData.get('userMail'),
      formData.get('userFirstName'),
      formData.get('userLastName'),
      formData.get('userPassword'),
      formData.get('userStreet'),
      formData.get('userCity'),
      formData.get('userZIP'),
      formData.get('userIBAN')
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
    <h1>Registrieren</h1>
      <Form.Group className="mb-3" controlId="userName">
        <Form.Label>Benutzername</Form.Label>
        <Form.Control name="userName" placeholder="MaxMustermann" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="userMail">
        <Form.Label>E-Mail</Form.Label>
        <Form.Control name="userMail" type="mail" placeholder="Max.Mustermann@Mail.de" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="userFirstName">
        <Form.Label>Vorname</Form.Label>
        <Form.Control name="userFirstName" placeholder="Max" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="userLastName">
        <Form.Label>Nachname</Form.Label>
        <Form.Control name="userLastName" placeholder="Mustermann" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="userPassword">
        <Form.Label>Passwort</Form.Label>
        <Form.Control name="userPassword" type="password" placeholder="Passwort" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="userStreet">
        <Form.Label>Straße</Form.Label>
        <Form.Control name="userStreet" placeholder="Musterstraße 123" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="userCity">
        <Form.Label>Wohnort</Form.Label>
        <Form.Control name="userCity" placeholder="Musterstadt" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="userZIP">
        <Form.Label>Postleitzahl</Form.Label>
        <Form.Control name="userZIP" placeholder="12345" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="userIBAN">
        <Form.Label>IBAN</Form.Label>
        <Form.Control name="userIBAN" placeholder="DE12345678901234567890" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Registrieren
      </Button>
      <Button variant="link" href="/login">Anmeldung?</Button>
    </Form>
  );
}

export default Register;