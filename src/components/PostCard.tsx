import { Link } from 'react-router-dom';
import { PostType, UserType } from '../types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// Define the type for the props that the PostCard component accepts
type PostCardProps = {
    post: PostType, // The post object containing information about the post
    currentUser: UserType|null, // The currently logged-in user or null if no user is logged in
}

export default function PostCard({ post, currentUser }: PostCardProps) {
    // This is a functional component named PostCard that accepts two props: post and currentUser
    
    return (
        <Card className='my-3 bg-custom'  >
            {/* This is the header section of the card */}
            <Card.Header id="timestamp">{ post.dateCreated }</Card.Header>
            
            <Card.Body>
                {/* This is the title section of the card */}
                <Card.Title id="cardTitle">{ post.title }</Card.Title>
                
                {/* This is the subtitle section of the card */}
                <Card.Subtitle id="cardUsername">{ post.author.username }</Card.Subtitle>
                
                {/* This is the body section of the card */}
                <Card.Text id="cardBody">{ post.body }</Card.Text>
                
                
            </Card.Body>

            {/* This is the footer section of the card*/}
            <Card.Footer>
                {/* This is a Link component that renders a button to view the comments of the post */}
                <Link to={`/post/${post.id}`}><Button variant='primary'>View Comments</Button></Link>
                {/* This is a conditional rendering of a button */}
                {/* It checks if the author's id matches the current user's id */}
                {/* If they match, it renders a Link component with a button to edit the post */}
                {post.author.id === currentUser?.id && <Link to={`/edit/${post.id}`}><Button variant='primary'>Edit Post</Button></Link>}
                </Card.Footer>
        </Card>
    )
}