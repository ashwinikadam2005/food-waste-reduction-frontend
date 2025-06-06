import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Assuming you use cookies for storing user info

const PrivateRoute = ({ element, allowedRoles }) => {
  const userRole = Cookies.get('userRole');  // Assuming the user role is stored in cookies

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />;  // Redirect to login page if user is not authorized
  }

  return element;  // Render the protected component if authorized
};

export default PrivateRoute;
