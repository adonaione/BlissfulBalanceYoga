import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Button, Container } from 'react-bootstrap';


/**
 * Props for the Navigation component.
 */
type NavigationProps = {
    isLoggedIn: boolean; // Indicates whether the user is logged in or not
    logUserOut: () => void; // Function to log the user out

}

/**
 * Navigation component that displays a navigation bar with different links and buttons.
 * @param {NavigationProps} props - The props for the Navigation component.
 * @returns {JSX.Element} The rendered Navigation component.
 */
export default function Navigation({ isLoggedIn, logUserOut }: NavigationProps): JSX.Element {

    const [backgroundTheme, setBackgroundTheme] = useState('dark'); // State to track the background theme of the navigation bar
    
    return (
        <Navbar expand='lg' data-bs-theme={backgroundTheme} bg={backgroundTheme}>
            <Container fluid>
                <Navbar.Brand as={Link} to='/'>Blissful Balance</Navbar.Brand> {/* Brand link to the home page */}
                <Navbar.Toggle aria-controls='nav-collapse' />
                <Navbar.Collapse id='nav-collapse'>
                    <Nav className='me-auto'>
                        {isLoggedIn ? ( // If the user is logged in
                            <>
                                <Nav.Link href='/user/${user.id}'>Edit User</Nav.Link> {/* Link to edit the user */}
                                <Nav.Link as={Link} to='/' onClick={()=> logUserOut()} href='/'>Log Out</Nav.Link> {/* Link to log out the user */}
                            </>
                        ) : ( // If the user is not logged in
                            <>
                                <Nav.Link as={Link} to='/signup'>Sign Up</Nav.Link> {/* Link to sign up page */}
                                <Nav.Link as={Link} to='/login'>Log In</Nav.Link> {/* Link to log in page */}
                            </>
                        )}
                    </Nav>
                    <Nav>
                        <Button onClick={() => setBackgroundTheme(backgroundTheme === 'dark' ? 'light' : 'dark')}>Change Background</Button> {/* Button to change the background theme */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
