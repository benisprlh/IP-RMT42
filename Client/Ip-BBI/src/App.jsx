import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import { Login } from './views/login';
import { Navbar } from './components/navbar';
import { Home } from './views/home';
import { TeamDetail } from './views/teamDetail';

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
    element: <Navbar button={'LOGIN'} />,
    children: [
      {
        path: '/login',
        element: <Login />,
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
    element: <Navbar button={'LOGOUT'} />,
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

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
