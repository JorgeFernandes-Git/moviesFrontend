import { Button, Container, Nav, Navbar, NavLink } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUser } from '../userContext/UserContext';
import { useState, useEffect } from 'react';

const Header = () => {

    const navigate = useNavigate();
    const { user, logout } = useUser();
    const [logoutMessage, setLogoutMessage] = useState('');
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    function register() {
        navigate(`/Register`);
    }

    function login() {
        navigate(`/Login`);
    }

    function handleLogout() {
        // Call the logout function to log the user out
        logout();
        setIsLoggingOut(true);
        setLogoutMessage('Logging out...');
        // Redirect to the Home page or another appropriate destination
        // Simulate a delay for 3 seconds before redirecting
        setTimeout(() => {
            setIsLoggingOut(false);
            setLogoutMessage('');
            navigate(`/Home`);
        }, 3000);
    }

    useEffect(() => {
        if (isLoggingOut) {
            setLogoutMessage('Logging out...');
        }
    }, [isLoggingOut]);

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/Home" style={{ "color": "gold" }}>
                    Home
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: "100px" }}
                        navbarScroll
                    >
                        <NavLink className="nav-link" to="/watchList">Watch List</NavLink>
                    </Nav>
                    {user ? ( // Check if the user is authenticated
                        <>
                            <Button variant="outline-info" className="me-2">
                                {user.nickname}
                            </Button>
                            <Button variant="outline-info" onClick={handleLogout}>
                                Log Out
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant="outline-info" className="me-2" onClick={login}>
                                Login
                            </Button>
                            <Button variant="outline-info" onClick={register}>
                                Register
                            </Button>
                        </>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
};

export default Header