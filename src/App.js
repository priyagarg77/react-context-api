import React, { useContext, useState } from 'react';
import './style.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('John Doe');
  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export default function App() {
  const username = 'John Doe';
  return (
    <UserProvider>
      <Container fluid>
        <Row>
          <Col sm={2} style={{ backgroundColor: '#212529', height: '100vh' }}>
            <Sidebar />
          </Col>

          <Col sm={10} style={{ paddingLeft: '0' }}>
            <Menubar />
            <Page />
          </Col>
        </Row>
      </Container>
    </UserProvider>
  );
}

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <Logo />
      <SideMenus />
    </aside>
  );
};

const SideMenus = () => {
  return (
    <Nav className="flex-column">
      <Nav.Link>Dashboard</Nav.Link>
      <Nav.Link>Profile</Nav.Link>
      <Nav.Link>Feedback</Nav.Link>
    </Nav>
  );
};

const Logo = () => {
  return (
    <h3
      style={{
        padding: '20px 10px',
        borderBottom: '1px solid #c4c4c4',
      }}
    >
      REACT JS
    </h3>
  );
};

const Menubar = () => {
  return (
    <Navbar className="d-flex justify-content-end" bg="dark" variant="dark">
      <Nav>
        <NotificationDropdown />
        <UserText />
      </Nav>
    </Navbar>
  );
};

const NotificationDropdown = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="dark" bg="dark" id="dropdown-basic">
        Notifications
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item>first notification</Dropdown.Item>
        <Dropdown.Item>second notification</Dropdown.Item>
        <Dropdown.Item>third notification</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const UserText = () => {
  const { username } = useContext(UserContext);
  return <Nav.Link>{username}</Nav.Link>;
};

const Page = () => {
  return (
    <main style={{ padding: '20px' }}>
      <UserForm />
    </main>
  );
};

const UserForm = () => {
  const { username, setUsername } = useContext(UserContext);
  return (
    <Form>
      <UsernameInput username={username} setUsername={setUsername} />
      <ChangeUsernameButton username={username} setUsername={setUsername} />
    </Form>
  );
};

const UsernameInput = ({ username, setUsername }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Username</Form.Label>
      <Form.Control
        type="text"
        placeholder="enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </Form.Group>
  );
};

const ChangeUsernameButton = ({ username, setUsername }) => {
  const changeUsername = () => {
    setUsername(username);
  };

  return <Button onClick={changeUsername}>Change Username</Button>;
};
