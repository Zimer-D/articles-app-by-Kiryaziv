import { Container, Navbar, NavbarBrand } from "react-bootstrap"
import './Footer.sass'
const Footer = (): JSX.Element => 
<div className="fixed-bottom">  

<Navbar bg="dark" variant="dark" className="footer">
    <Container>
        <NavbarBrand  className="footerInfo" >©{new Date().getFullYear()} Articles App by Kiryazov D. </NavbarBrand>
        <div>
        </div>
    </Container>
</Navbar>
</div>

export default Footer