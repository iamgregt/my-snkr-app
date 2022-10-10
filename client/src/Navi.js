import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/esm/Button';
import './Navi.css'

function Navi({handleLogOut, user}) {

  function renderButton(){

    const buttonVariant = user ? "outline-danger" : "outline-success"
    const clickAction = user ? handleLogOut : null

    return(
      <Button onClick={(clickAction)} variant={buttonVariant}>{user ? <>Logout</> : <>Login</>}</Button>
    )
  }


  return (<div className='navi'>
    <Navbar className='navi' style={{paddingBottom: '5rem'}} bg="light" expand="lg">
      <Container>
        <Navbar.Brand className='brand' href="/">MySneakers</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className='navlinks' href="/">Home</Nav.Link>
            <Nav.Link className='navlinks' href="/shoepage">Shoes</Nav.Link>
          <Nav.Link className='navlinks' href="/shop">Shop</Nav.Link>
          <Nav.Link className='navlinks' href='/userpage'>Users</Nav.Link>
          <Navbar.Text className='navlinks' style={{textAlign: 'right'}}>
            Signed in as: <a href="/login">{user ? user.username : <>Please Sign In</>}</a>
          </Navbar.Text>
          </Nav>
        </Navbar.Collapse>
        {renderButton()}
      </Container>
      
    </Navbar>
    </div>
  );
}

export default Navi;