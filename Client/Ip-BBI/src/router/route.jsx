import { createBrowserRouter, redirect } from 'react-router-dom';
import { Login } from '../views/login';
import { Navbar } from '../components/navbar';
import { Home } from '../views/home';
import { TeamDetail } from '../views/teamDetail';
import { Register } from '../views/register';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    loader: () => {
      return redirect('/login');
    },
    path: '/',
  },
  {
    loader: () => {
      const access_token = localStorage.getItem('access_token');
      if (access_token) {
        return redirect('/home');
      }
      return null;
    },
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
  {
    loader: () => {
      const access_token = localStorage.getItem('access_token');
      if (!access_token) {
        return redirect('/login');
      }
      return null;
    },
    element: <Navbar button="LOGOUT" />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/teamDetail/:teamId',
        element: <TeamDetail />,
      },
    ],
  },
]);

export default router;
