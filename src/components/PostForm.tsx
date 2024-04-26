
 // Represents a form component for creating a new post.
 // @component
 // @param {Object} props - The component props.
 // @param {Function} props.addNewPost - The function to add a new post.
 // @returns {JSX.Element} The JSX element representing the post form.
 import { useState } from 'react';
 import Button from 'react-bootstrap/Button';
 import Card from 'react-bootstrap/Card';
 import Form from 'react-bootstrap/Form';
 import { PostFormDataType } from '../types';
 
 type PostFormProps = {
     addNewPost: (data: PostFormDataType) => void
 }
 
 export default function PostForm({ addNewPost}: PostFormProps) {
     const [newPost, setNewPost] = useState<PostFormDataType>({
         title: '',
         body: ''
     });
 
    
      // Handles the input change event.
      // @param {React.ChangeEvent<HTMLInputElement>} event - The input change event
     const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
         setNewPost({
             ...newPost,
             [event.target.name]: event.target.value
         });
     }
 
 
      // Handles the form submit event.
      // @param {React.FormEvent} event - The form submit event.
      
     const handleFormSubmit = (event: React.FormEvent) => {
         event.preventDefault();
         addNewPost(newPost)
     }
 
     return (
         <Card className='my-3'>
             <Card.Body>
                 <h3 className="text-center">Create New Post</h3>
                 <Form onSubmit={handleFormSubmit}>
                     <Form.Label>Post Title</Form.Label>
                     <Form.Control name='title' placeholder='Enter New Post Title' value={newPost.title} onChange={handleInputChange} />
                     <Form.Label>Post Body</Form.Label>
                     <Form.Control name='body' placeholder='Enter New Post Body' value={newPost.body} onChange={handleInputChange} />
                     <Button className='mt-3 w-100' variant='success' type='submit'>Create Post</Button>
                 </Form>
             </Card.Body>
         </Card>
     )
 }