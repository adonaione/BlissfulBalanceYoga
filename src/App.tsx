import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AlertMessage from './components/AlertMessage';
import Navigation from './components/Navigation';
import { Container } from 'react-bootstrap';
import EditPost from './views/EditPost';
import Home from './views/Home';
import Login from './views/Login';
import SignUp from './views/SignUp';
import EditUser from './views/EditUser';
import { CategoryType, UserType } from './types';
import { getMe } from './lib/apiWrapper';

/**
 * The main component of the application.
 * Renders the navigation bar, displays flash messages, and handles user authentication.
 */
export default function App() {
    // State variables
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem('token') &&
            new Date(localStorage.getItem('tokenExp') || 0) > new Date()
            ? true
            : false
    );
    const [loggedInUser, setLoggedInUser] = useState<UserType | null>(null);
    const [message, setMessage] = useState<string | undefined>(undefined);
    const [category, setCategory] = useState<CategoryType | undefined>(undefined);

    /**
     * Fetches the logged-in user's data from the server.
     * Sets the logged-in user in the state if the user is authenticated.
     * Otherwise, sets the `isLoggedIn` state to false and logs the error.
     */
    useEffect(() => {
        async function getLoggedInUser() {
            if (isLoggedIn) {
                const token = localStorage.getItem('token') || '';
                const response = await getMe(token);
                if (response.data) {
                    setLoggedInUser(response.data);
                    localStorage.setItem('currentUser', JSON.stringify(response.data));
                } else {
                    setIsLoggedIn(false);
                    console.error(response.data);
                }
            }
        }
        getLoggedInUser();
    }, [isLoggedIn]);

    /**
     * Displays a flash message with the specified message and category.
     * @param newMessage - The message to be displayed.
     * @param newCategory - The category of the flash message.
     */
    const flashMessage = (newMessage: string | undefined, newCategory: CategoryType | undefined) => {
        setMessage(newMessage);
        setCategory(newCategory);
        // setTimeout(() => {
        //     if (newMessage && newCategory){
        //         flashMessage(undefined, undefined)
        //     }
        // }, 10000)
    };

    /**
     * Sets the `isLoggedIn` state to true, indicating that the user is logged in.
     */
    const logUserIn = () => {
        setIsLoggedIn(true);
    };

    /**
     * Logs the user out by setting the `isLoggedIn` state to false,
     * clearing the logged-in user data, and displaying a flash message.
     */
    const logUserOut = () => {
        setIsLoggedIn(false);
        setLoggedInUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExp');
        localStorage.removeItem('currentUser');
        flashMessage('You have been logged out', 'dark');
    };

    return (
        <>
            {/* Renders the navigation bar */}
            <Navigation isLoggedIn={isLoggedIn} logUserOut={logUserOut} />
            <Container>
                {/* Displays the flash message if there is one */}
                {message && <AlertMessage message={message} category={category} flashMessage={flashMessage} />}
                <Routes>
                    {/* Renders the home page */}
                    <Route path="/" element={<Home isLoggedIn={isLoggedIn} currentUser={loggedInUser} flashMessage={flashMessage} />} />
                    {/* Renders the sign up page */}
                    <Route path="/signup" element={<SignUp flashMessage={flashMessage} />} />
                    {/* Renders the login page */}
                    <Route path="/login" element={<Login flashMessage={flashMessage} logUserIn={logUserIn} />} />
                    {/* Renders the edit post page */}
                    <Route path="/edit/:postId" element={<EditPost flashMessage={flashMessage} currentUser={loggedInUser} />} />
                    {/* renders the edit user page */}
                    <Route path='/user/:userId' element={<EditUser flashMessage={flashMessage} currentUser={loggedInUser} />} />
                </Routes>
            </Container>
        </>
    );
}