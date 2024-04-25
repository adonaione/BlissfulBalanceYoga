import axios from 'axios';
import { PostFormDataType, PostType, TokenType, UserFormDataType, UserType } from '../types';

// Define the base URL for the API
const baseURL:string = 'https://fakebook-sjrq.onrender.com/'

// Define the endpoints for different API resources
const userEndpoint:string = '/users'
const postEndpoint:string = '/posts'
const tokenEndpoint:string = '/token'

// Create an API client without authentication
const apiClientNoAuth = () => axios.create({
    baseURL: baseURL
})

// Create an API client with basic authentication
const apiClientBasicAuth = (username:string, password:string) => axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: 'Basic ' + btoa(username + ':' + password)
    }
})

// Create an API client with token-based authentication
const apiClientTokenAuth = (token:string) => axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: 'Bearer ' + token
    }
})

// Define a generic API response type that can hold data or error information
type APIResponse<T> = {
    data?: T,
    error?: string
}

// Function to register a new user
async function register(newUserData:UserFormDataType): Promise<APIResponse<UserType>> {
    let data;
    let error;
    try{
        // Make a POST request to the user endpoint using the API client without authentication
        const response = await apiClientNoAuth().post(userEndpoint, newUserData); // send a post request to the register endpoint with the new user data
        data = response.data // store the response data in the 'data' variable
    } catch(err) {
        // Handle any errors that occur during the request
        if (axios.isAxiosError(err)){
            error = err.response?.data.error // If the error is an Axios error, extract the error message from the response
        } else {
            error = 'Something went wrong' // If it's not an Axios error, set a generic error message
        }
    }
    // Return the API response object
    return { data, error }
}

// Function to login with username and password
async function login(username:string, password:string): Promise<APIResponse<TokenType>> {
    let data;
    let error;
    try{
        // Make a GET request to the token endpoint using the API client with basic authentication
        const response = await apiClientBasicAuth(username, password).get(tokenEndpoint)
        data = response.data
    } catch(err){
        // Handle any errors that occur during the request
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    // Return the API response object
    return { data, error }
}





async function getMe(token:string): Promise<APIResponse<UserType>> {
    let data; // Variable to store the response data
    let error; // Variable to store any error message
    try {
        const response = await apiClientTokenAuth(token).get(userEndpoint + '/me'); // Send a GET request to retrieve user data
        data = response.data; // Store the response data in the 'data' variable
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error; // If the error is an Axios error, extract the error message from the response
        } else {
            error = 'Something went wrong'; // If it's not an Axios error, set a generic error message
        }
    }
    return { data, error }; // Return an object containing the data and error variables
}



async function getAllPosts(): Promise<APIResponse<PostType[]>> {
    let data; // Variable to store the response data
    let error; // Variable to store any error message

    try {
        const response = await apiClientNoAuth().get(postEndpoint); // Send a GET request to the API using the apiClientNoAuth function
        data = response.data; // Store the response data in the 'data' variable
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.message; // If the error is an Axios error, store the error message in the 'error' variable
        } else {
            error = 'Something went wrong'; // If the error is not an Axios error, set a generic error message
        }
    }

    return { data, error }; // Return an object containing the data and error variables
}

async function createPost(token: string, postData: PostFormDataType): Promise<APIResponse<PostType>> {
    let data; // Variable to store the response data
    let error; // Variable to store any error message

    try {
        const response = await apiClientTokenAuth(token).post(postEndpoint, postData); // Send a POST request to the API using the apiClientTokenAuth function and the provided token and postData
        data = response.data; // Store the response data in the 'data' variable
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error; // If the error is an Axios error, store the error message from the response data in the 'error' variable
        } else {
            error = 'Something went wrong'; // If the error is not an Axios error, set a generic error message
        }
    }

    return { data, error }; // Return an object containing the data and error variables
}



// async function getAllPosts(): Promise<APIResponse<PostType[]>> {
//     let data;
//     let error;
//     try{
//         const response = await apiClientNoAuth().get(postEndpoint);
//         data = response.data
//     } catch(err) {
//         if (axios.isAxiosError(err)){
//             error = err.message
//         } else {
//             error = 'Something went wrong'
//         }
//     }
//     return { data, error }
// }

// async function createPost(token:string, postData:PostFormDataType): Promise<APIResponse<PostType>> {
//     let data;
//     let error;
//     try{
//         const response = await apiClientTokenAuth(token).post(postEndpoint, postData)
//         data = response.data
//     } catch(err) {
//         if (axios.isAxiosError(err)){
//             error = err.response?.data.error
//         } else {
//             error = 'Something went wrong'
//         }
//     }
//     return { data, error }
// }


async function getPostById(postId:string|number): Promise<APIResponse<PostType>> {
    let data; // Variable to store the response data
    let error; // Variable to store any error message

    try {
        const response = await apiClientNoAuth().get(postEndpoint + '/' + postId);
        data = response.data; // Store the response data in the 'data' variable
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data?.error || `Post with ID ${postId} does not exist`; // If the error is an Axios error, extract the error message from the response data or use a default error message
        } else {
            error = 'Something went wrong'; // If the error is not an Axios error, set a generic error message
        }
    }

    return { data, error }; // Return an object containing the data and error variables
}

async function editPostById(postId:string|number, token:string, editedPostData:PostFormDataType): Promise<APIResponse<PostType>> {
    let data; // Variable to store the response data
    let error; // Variable to store any error message

    try {
        const response = await apiClientTokenAuth(token).put(postEndpoint + '/' + postId, editedPostData);
        data = response.data; // Store the response data in the 'data' variable
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data?.error || `Post with ID ${postId} does not exist`; // If the error is an Axios error, extract the error message from the response data or use a default error message
        } else {
            error = 'Something went wrong'; // If the error is not an Axios error, set a generic error message
        }
    }

    return { data, error }; // Return an object containing the data and error variables
}

async function deletePostById(postId:string|number, token:string): Promise<APIResponse<string>> {
    let data; // Variable to store the response data
    let error; // Variable to store any error message

    try {
        const response = await apiClientTokenAuth(token).delete(postEndpoint + '/' + postId);
        data = response.data.success; // Store the success status in the 'data' variable
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data?.error || `Post with ID ${postId} does not exist`; // If the error is an Axios error, extract the error message from the response data or use a default error message
        } else {
            error = 'Something went wrong'; // If the error is not an Axios error, set a generic error message
        }
    }

    return { data, error }; // Return an object containing the data and error variables
}


export {
    register,
    getAllPosts,
    login,
    getMe,
    createPost,
    getPostById,
    editPostById,
    deletePostById
}