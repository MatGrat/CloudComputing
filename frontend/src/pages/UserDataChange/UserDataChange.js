import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { UpdateUser, GetUser, DeleteUser } from '../../hooks/user-hook';
import { useNavigate } from 'react-router-dom';

function UserDataChange() {
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
        const [name, value] = cookie.split('=');
        acc[name] = value;
        return acc;
    }, {});
    const {data: user, loading, error } = GetUser(cookies.loggedUser);
    const navigate = useNavigate();

    const handleChange = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        await UpdateUser(
          cookies.loggedUser,
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

      navigate(`/account/${cookies.loggedUser}`);
    }

    const handleDelete = async (event) => {
        event.preventDefault();
        await DeleteUser(cookies.loggedUser);
        document.cookie = `loggedUser=${cookies.loggedUser}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        navigate("/");
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
    <Form onSubmit={handleChange}>
    <h1>Benutzerdaten ändern</h1>
    <Form.Group className="mb-3" controlId="userName">
        <Form.Label>Benutzername</Form.Label>
        <Form.Control name="userName" defaultValue={user?.UserName} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="userMail">
        <Form.Label>E-Mail</Form.Label>
        <Form.Control name="userMail" type="mail" defaultValue={user?.UserMail} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="userFirstName">
        <Form.Label>Vorname</Form.Label>
        <Form.Control name="userFirstName" defaultValue={user?.UserFirstName} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="userLastName">
        <Form.Label>Nachname</Form.Label>
        <Form.Control name="userLastName" defaultValue={user?.UserLastName} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="userPassword">
        <Form.Label>Passwort</Form.Label>
        <Form.Control name="userPassword" type="password" defaultValue={user?.UserPassword} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="userStreet">
        <Form.Label>Straße</Form.Label>
        <Form.Control name="userStreet" defaultValue={user?.UserStreet} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="userCity">
        <Form.Label>Wohnort</Form.Label>
        <Form.Control name="userCity" defaultValue={user?.UserCity} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="userZIP">
        <Form.Label>Postleitzahl</Form.Label>
        <Form.Control name="userZIP" defaultValue={user?.UserZIP} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="userIBAN">
        <Form.Label>IBAN</Form.Label>
        <Form.Control name="userIBAN" defaultValue={user?.UserIBAN} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Speichern
      </Button>
      <Button variant="danger" onClick={handleDelete}>Account Löschen</Button>
    </Form>
  );
}

export default UserDataChange;