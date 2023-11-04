import { Form, Button } from 'react-bootstrap';
import { useUser } from '../userContext/UserContext';


const ReviewForm = ({ handleSubmit, revText, labelText, defaultValue }) => {
    const { user } = useUser();
    const isUserLoggedIn = !!user; // Check if the user is logged in

    return (
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>{labelText}</Form.Label>
                <Form.Control ref={revText} as="textarea" rows={3} defaultValue={defaultValue} />
            </Form.Group>
            <Button variant="outline-info" onClick={handleSubmit} disabled={!isUserLoggedIn}>
                Submit
            </Button>
        </Form>
    )
}

export default ReviewForm