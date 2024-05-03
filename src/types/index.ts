// create a type that represents the shape of a user object.
export type UserType = {
	id: number; // The unique identifier of the user.
	firstName: string; // The first name of the user.
	lastName: string; // The last name of the user.
	username: string; // The username of the user.
	email: string; // The email address of the user.
	dateCreated: string; // The date when the user was created.
};

// create a type that represents the shape of a user creation form object
export type UserFormDataType = {
	firstName: string; // The first name of the user.
	lastName: string; // The last name of the user.
	username: string; // The username of the user.
	email: string; // The email address of the user.
	password: string; // The password of the user.
	confirmPassword: string; // The confirmation password of the user.
};

//create a type that represents the shape of a comment object.
// export type CommentType = {
//     id: number, // The unique identifier of the comment.
//     body: string, // The body content of the comment.
//     dateCreated: string, // The date when the comment was created.
//     author: UserType // The author of the comment.
// }

// create a type that represents the shape of a comment creation form object.
// export type CommentFormDataType = {
//     body: string // The body content of the comment.
// }

// create a type that represents the shape of a post object.
export type PostType = {
	id: number; // The unique identifier of the post.
	title: string; // The title of the post.
	body: string; // The body content of the post.
	dateCreated: string; // The date when the post was created.
	author: UserType; // The author of the post.
};

// create a type that represents the shape of a post creation form object.
export type PostFormDataType = {
	title: string; // The title of the post.
	body: string; // The body content of the post.
};

// Represents the available categories for a post.
export type CategoryType =
	| "primary"
	| "secondary"
	| "success"
	| "danger"
	| "warning"
	| "info"
	| "light"
	| "dark";

// Represents the shape of a token object.
export type TokenType = {
	token: string; // The token value.
	tokenExpiration: string; // The expiration date of the token.
};
