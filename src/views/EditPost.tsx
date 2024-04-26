import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deletePostById, editPostById, getPostById } from '../lib/apiWrapper';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { CategoryType, PostFormDataType, UserType } from '../types';


// This code defines the type for the props of the EditPost component.
// The EditPostProps type is an object that contains two properties:
type EditPostProps = {
    //   This function is used to display flash messages in the application.
    flashMessage: (message:string, category:CategoryType) => void  // - flashMessage: a function that takes a message (string) and a category (CategoryType) as parameters and returns void.
    currentUser: UserType|null // - currentUser: a variable of type UserType|null, which represents the currently logged-in user.
}



// This component is responsible for rendering a form to edit a post.
// It receives the following props: flashMessage (a function to display flash messages), and currentUser (the currently logged-in user).
export default function EditPost({ flashMessage, currentUser }: EditPostProps) {
    // The useParams hook is used to retrieve the postId from the URL parameters.
    const { postId } = useParams();
    // The useNavigate hook is used to programmatically navigate to different routes.
    const navigate = useNavigate();

    // The postToEditData state variable is used to store the data of the post being edited.
    // It is initialized with an empty title and body.
    const [postToEditData, setPostToEditData] = useState<PostFormDataType>({title: '', body: ''});
    // The showModal state variable is used to control the visibility of the delete confirmation modal.
    const [showModal, setShowModal] = useState(false);

    // The openModal function is called to show the delete confirmation modal.
    const openModal = () => setShowModal(true);
    // The closeModal function is called to hide the delete confirmation modal.
    const closeModal = () => setShowModal(false);
    
    // The useEffect hook is used to fetch the post data when the component mounts.
    useEffect(() => {
        // The getPost function is an async function that fetches the post data from the server.
        async function getPost() {
            // The getPostById function is called with the postId to retrieve the post data.
            const response = await getPostById(postId!);
            if (response.data) {
                // If the response contains data, it means the post exists.
                const post = response.data;
                // The currentUser is retrieved from the local storage.
                const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
                // If the current user is not the author of the post, display an error message and navigate to the home page.
                if (currentUser?.id !== post.author.id) {
                    flashMessage('You do not have permission to edit this post', 'danger');
                    navigate('/');
                } else {
                    // If the current user is the author of the post, set the postToEditData state with the post data.
                    setPostToEditData({title: post.title, body: post.body});
                }
            } else if (response.error) {
                // If there is an error in the response, display the error message and navigate to the home page.
                flashMessage(response.error, 'danger');
                navigate('/');
            } else {
                // If the response does not contain data or error, display a generic error message and navigate to the home page.
                flashMessage("Something went wrong", 'warning');
                navigate('/');
            }
        }

        // Call the getPost function when the component mounts or when the postId or currentUser changes.
        getPost();
    }, [postId, currentUser]);

    // The handleInputChange function is called when the input fields in the form are changed.
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Update the postToEditData state with the new input values.
        setPostToEditData({...postToEditData, [event.target.name]: event.target.value});
    }

    // The handleFormSubmit function is called when the form is submitted.
    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // Retrieve the token from the local storage.
        const token = localStorage.getItem('token') || '';
        // Call the editPostById function to update the post with the new data.
        const response = await editPostById(postId!, token, postToEditData);
        if (response.error) {
            // If there is an error in the response, display the error message.
            flashMessage(response.error, 'danger');
        } else {
            // If the post is successfully updated, display a success message and navigate to the home page.
            flashMessage(`${response.data?.title} has been updated`, 'success');
            navigate('/');
        }
    }

    // The handleDeleteClick function is called when the delete button is clicked.
    const handleDeleteClick = async () => {
        // Retrieve the token from the local storage.
        const token = localStorage.getItem('token') || '';
        // Call the deletePostById function to delete the post.
        const response = await deletePostById(postId!, token);
        if (response.error) {
            // If there is an error in the response, display the error message.
            flashMessage(response.error, 'danger');
        } else {
            // If the post is successfully deleted, display a confirmation message and navigate to the home page.
            flashMessage(response.data!, 'primary');
            navigate('/');
        }
    }

    // The component renders a form to edit the post.
    return (
        <>
            <Card className='my-3'>
                <Card.Body>
                    <h3 className="text-center">Edit Post</h3>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Label>Post Title</Form.Label>
                        <Form.Control name='title' placeholder='Edit Post Title' value={postToEditData.title} onChange={handleInputChange} />
                        <Form.Label>Post Body</Form.Label>
                        <Form.Control as='textarea' name='body' placeholder='Edit Post Body' value={postToEditData.body} onChange={handleInputChange} />
                        <Button className='mt-3 w-50' variant='info' type='submit'>Edit Post</Button>
                        <Button className='mt-3 w-50' variant='danger' onClick={openModal}>Delete Post</Button>
                    </Form>
                </Card.Body>
            </Card>
            <Modal show={showModal} onHide={closeModal} className='text-dark'>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {postToEditData.title}?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete {postToEditData.title}? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeModal}>Close</Button>
                    <Button variant='danger' onClick={handleDeleteClick}>Delete Post</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
