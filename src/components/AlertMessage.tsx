import Alert from 'react-bootstrap/Alert';
import { CategoryType } from '../types';

// Props for the AlertMessage component.
type AlertMessageProps = {
    message: string | undefined, // The message to be displayed in the alert.
    category: CategoryType | undefined, // The category of the alert (e.g., 'success', 'warning', 'danger').
    flashMessage: (newMessage: string | undefined, newCategory: CategoryType | undefined) => void // A function to update the message and category of the alert.
}


export default function AlertMessage({ message, category, flashMessage }: AlertMessageProps) {
    return (
        <Alert className='mt-3' variant={category} dismissible onClose={() => flashMessage(undefined, undefined)}>
            {message}
        </Alert>
    )
}