import { Container, Navbar } from "react-bootstrap"

const Header = () =>{
    return (
<Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            Articles app
          </Navbar.Brand>
        </Container>
      </Navbar>
    )
}
export default Header