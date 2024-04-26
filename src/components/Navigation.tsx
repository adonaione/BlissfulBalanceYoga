import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { UserType } from '../types';


/**
 * Props for the Navigation component.
 */
type NavigationProps = {
    isLoggedIn: boolean; // Indicates whether the user is logged in or not
    logUserOut: () => void; // Function to log the user out
    user: UserType | null; // The currently logged-in user or null if no user is logged in

}

/**
 * Navigation component that displays a navigation bar with different links and buttons.
 * @param {NavigationProps} props - The props for the Navigation component.
 * @returns {JSX.Element} The rendered Navigation component.
 */
export default function Navigation({ isLoggedIn, logUserOut, user }: NavigationProps): JSX.Element {

    
    
    return (
        <Navbar expand='lg' className="navbar">
            <Container fluid>
            <Navbar.Brand as={Link} to='/'>
                <img src={logo} alt="Bliss" height="50" width="100"/>
            </Navbar.Brand> {/* Brand link to the home page */}
                <Navbar.Toggle aria-controls='nav-collapse' />
                <Navbar.Collapse id='nav-collapse'>
                    <Nav className='me-auto'>
                        {isLoggedIn ? ( // If the user is logged in
                            <>
                                <Nav.Link as={Link} to={`/user/${ user?.id }`}>Edit User</Nav.Link> {/* Link to edit the user */}
                                <Nav.Link as={Link} to='/' onClick={()=> logUserOut()} href='/'>Log Out</Nav.Link> {/* Link to log out the user */}
                            </>
                        ) : ( // If the user is not logged in
                            <>
                                <Nav.Link as={Link} to='/signup'>Sign Up</Nav.Link> {/* Link to sign up page */}
                                <Nav.Link as={Link} to='/login'>Log In</Nav.Link> {/* Link to log in page */}
                            </>
                        )}
                    </Nav>
                    
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
