import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "../authSlice";

/**
 * Protected Component
 * 
 * A React component used to protect certain routes by checking if the user is logged in.
 * If the user is not logged in, it will redirect them to the login page using the Navigate component from react-router-dom.
 * 
 * @param {Object} children - The children components to render if the user is logged in.
 * @returns {JSX.Element} The children components if the user is logged in, otherwise redirects to the login page.
 */
function Protected({ children }) {
    // Access the logged-in user from the Redux store.
    const user = useSelector(selectLoggedInUser);

    // If the user is not logged in, redirect to the login page.
    if (!user) {
        return <Navigate to='/login' replace={true} />;
    }

    // If the user is logged in, render the children components.
    return children;
}

export default Protected;
