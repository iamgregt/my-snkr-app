import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/esm/Button';

function Navi({handleLogOut, user}) {

  function renderButton(){

    const buttonVariant = user ? "outline-danger" : "outline-success"
    const clickAction = user ? handleLogOut : null

    return(
      <Button onClick={clickAction} variant={buttonVariant}>{user ? <>Logout</> : <>Login</>}</Button>
    )
  }


  return (
    <Navbar style={{paddingBottom: '5rem'}} bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/shoepage">Shoes</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="/">Logout</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          <Navbar.Text style={{textAlign: 'right'}}>
            Signed in as: <a href="/login">{user ? user.username : <>Please Sign In</>}</a>
          </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
        {renderButton()}
      </Container>
      
    </Navbar>
  );
}

export default Navi;