import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUser } from '../userContext/UserContext';

const Header = () => {

    const navigate = useNavigate();
    const { user, logout } = useUser();

    function register() {
        navigate(`/Register`);
    }

    function login() {
        navigate(`/Login`);
    }

    function handleLogout() {
        // Call the logout function to log the user out
        logout();
        // Redirect to the Home page or another appropriate destination
        navigate(`/Home`);
    }

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
                        <Nav.Link to="watchList">Watch List</Nav.Link>
                        <Nav.Link href="AddMovie">Add Movie</Nav.Link>
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
    )
}

export default Header