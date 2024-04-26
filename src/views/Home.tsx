import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { CategoryType, PostFormDataType, PostType, UserType } from '../types';
import { getAllPosts, createPost } from '../lib/apiWrapper';


// Define a type called Sorting that represents different sorting functions
type Sorting = {
    idAsc: (a: PostType, b: PostType) => number,
    idDesc: (a: PostType, b: PostType) => number,
    titleAsc: (a: PostType, b: PostType) => number,
    titleDesc: (a: PostType, b: PostType) => number,
}

// Define a type called HomeProps that represents the props expected by the Home component
type HomeProps = {
    isLoggedIn: boolean, // Indicates whether a user is logged in or not
    currentUser: UserType | null, // Represents the currently logged in user
    flashMessage: (newMessage: string, newCategory: CategoryType) => void // A function to display flash messages
}


export default function Home({isLoggedIn, currentUser, flashMessage}: HomeProps) {

    const [showForm, setShowForm] = useState(false); // State variable to control the visibility of a form
    const [posts, setPosts] = useState<PostType[]>([]); // State variable to store an array of posts
    const [fetchPostData, setFetchPostData] = useState(true); // State variable to trigger fetching of post data

    useEffect(() => {
        async function fetchData(){
            const response = await getAllPosts(); // Fetch all posts using the getAllPosts function
            if (response.data){
                const posts = response.data; // Store the fetched posts in a variable
                posts.sort( (a, b) => (new Date(a.dateCreated) > new Date(b.dateCreated)) ? -1 : 1 ); // Sort the posts based on the date they were created
                setPosts(posts) // Update the state variable with the sorted posts
            }
        }

        fetchData(); // Call the fetchData function when the component mounts or when fetchPostData changes
    }, [fetchPostData]);

    const [searchTerm, setSearchTerm] = useState(''); // State variable to store the search term

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

        const sortFunctions:Sorting = {
            idAsc: (a:PostType, b:PostType) => a.id - b.id, // Sort function to sort posts by ID in ascending order
            idDesc: (a:PostType, b:PostType) => b.id - a.id, // Sort function to sort posts by ID in descending order
            titleAsc: (a:PostType, b:PostType) => a.title > b.title ? 1 : -1, // Sort function to sort posts by title in ascending order
            titleDesc: (a:PostType, b:PostType) => b.title > a.title ? 1 : -1 // Sort function to sort posts by title in descending order
        }
        const func = sortFunctions[e.target.value as keyof Sorting]; // Get the selected sort function based on the value of the select element
        const newSortedArr = [...posts].sort(func); // Create a new sorted array of posts using the selected sort function
        setPosts(newSortedArr); // Update the state variable with the new sorted array of posts
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }

    const addNewPost = async (newPostData: PostFormDataType) => {
        const token = localStorage.getItem('token') || '';
        const response = await createPost(token, newPostData);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else if (response.data){
            flashMessage(`${response.data.title} has been created`, 'success')
            setShowForm(false);
            setFetchPostData(!fetchPostData)
        }
    }

    

    return (
        <>
            <h1 id="greeting" className="text-center">{isLoggedIn && currentUser ? `Om Shanti, ${currentUser?.firstName}` : 'Namaste, Relative' }</h1>
            <Row>
                <Col xs={12} md={6}>
                    <Form.Control id="searchbox" value={searchTerm} placeholder='Search Posts' onChange={handleInputChange} />
                </Col>
                <Col>
                    <Form.Select id="sorter" onChange={handleSelectChange}>
                        <option>Choose Sorting Option</option>
                        <option value="idAsc">Sort By ID ASC</option>
                        <option value="idDesc">Sort By ID DESC</option>
                        <option value="titleAsc">Sort By Title ASC</option>
                        <option value="titleDesc">Sort By Title DESC</option>
                    </Form.Select>
                </Col>
                {isLoggedIn && (
                    <Col>
                        <Button className='w-100' id="addPost" onClick={() => setShowForm(!showForm)}>{showForm ? 'Hide Form' : 'Add Post+'}</Button>
                    </Col>
                )}
            </Row>
            { showForm && <PostForm addNewPost={addNewPost} /> }
            {posts.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase())).map( p => <PostCard key={p.id} post={p} currentUser={currentUser} /> )}
        </>
    )
}