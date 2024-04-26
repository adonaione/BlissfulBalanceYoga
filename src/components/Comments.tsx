// import React, { useState, useEffect } from "react";
// import { CommentType, UserType } from "../types";
// import { createComment, deleteCommentById } from "../lib/apiWrapper";

// type CommentProps = {
//     comment: CommentType; // The comment object containing the comment data
//     currentUser: UserType | null; // The currently logged-in user or null if no user is logged in
// }

// export default function Comment({ comment, currentUser }: CommentProps) {
//     // This is a functional component named Comment that accepts two props: comment and currentUser

//     // The useState hook is used to create a state variable called showForm and a function called setShowForm to update the state variable
//     const [showForm, setShowForm] = useState(false);

//     // The useState hook is used to create a state variable called newComment and a function called setNewComment to update the state variable
//     const [newComment, setNewComment] = useState('');

//     // The handleInputChange function is called when the input field value changes
//     const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//         setNewComment(event.target.value);
//     }

//     // The handleCommentSubmit function is called when the comment form is submitted
//     const handleCommentSubmit = (event: React.FormEvent) => {
//         event.preventDefault();
//         // The createComment function is called with the new comment
//         createComment(newComment);
//         // The newComment state variable is set to an empty string
//         setNewComment('');
//     }

//     // The handleCommentDelete function is called when the delete button is clicked
//     const handleCommentDelete = () => {
//         // The deleteComment function is called with the comment id
//         deleteCommentById(comment.id);
//     }

//     return (
//         <div>
//             {/* This is a conditional rendering of a button */}
//             {/* It checks if the author's id matches the current user's id */}
//             {/* If they match, it renders a button to delete the comment */}
//             {comment.author.id === currentUser?.id && <button onClick={handleCommentDelete}>Delete</button>}
//         </div>
//     )




  

//   return (
//     <div>
//       {/* Only show the comment section if the user is logged in */}
//       {isLoggedIn && (
//         <div>
//           <h3>Comments</h3>
//           <form onSubmit={handleCommentSubmit}>
//             <textarea
//               value={newComment}
//               onChange={handleInputChange}
//               placeholder="Enter your comment"
//             ></textarea>
//             <button type="submit">Submit</button>
//           </form>
//           <ul>
//             {comments.map((comment) => (
//               <li key={comment.id}>
//                 {comment.content}
//                 <button onClick={() => handleCommentDelete(comment.id)}>
//                   Delete
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };
