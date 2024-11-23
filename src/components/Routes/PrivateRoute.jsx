import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// Заглушка для селектора
const selectIsLoggedIn = () => false; // Завжди повертає false для тестування

export default function PrivateRoute({ component: Component, redirectTo }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? Component : <Navigate to={redirectTo} />;
}
