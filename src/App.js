import { Counter } from './features/counter/Counter';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom';
import Cart from './features/cart/Cart';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectLoggedInUser } from './features/auth/authSlice';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';

// Create the router configuration for different routes.
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    ),
  },
  {
    path: '/login',
    element: <LoginPage></LoginPage>,
  },
  {
    path: '/signup',
    element: <SignupPage></SignupPage>,
  },
  {
    path: '/cart',
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: '/checkout',
    element: (
      <Protected>
        <Checkout></Checkout>
      </Protected>
    ),
  },
  {
    path: '/product-detail/:id',
    element: (
      <Protected>
        <ProductDetailPage></ProductDetailPage>
      </Protected>
    ),
  },
]);

function App() {
  // Get the logged-in user from the Redux store.
  const user = useSelector(selectLoggedInUser);

  // Get the dispatch function from Redux.
  const dispatch = useDispatch();

  // Use useEffect to fetch cart items if the user is logged in.
  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
    }
  }, [dispatch, user]);

  return (
    <div className="App">
      {/* Provide the router configuration to the app */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
